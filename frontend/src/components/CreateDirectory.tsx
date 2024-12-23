'use client'

import React, { useState, useEffect } from "react";
import { addProject, updateCounter } from "@/actions/Projects";
import { deleteDirectory } from "./DeleteDirectory";
import { create_go_no_go, delete_go_no_go } from "../functions/reports/GoNoGo";

interface CreateDirectoryButtonProps {
   project_name: string,
   project_type: string,
   project_address: string  // New prop needed for go-no-go report
}

const CreateDirectoryButton: React.FC<CreateDirectoryButtonProps> = ({ 
    project_name, 
    project_type,
    project_address 
}) => {
   const [loading, setLoading] = useState(false)
   const [status, setStatus] = useState({ type: '', message: '' })
   const [projectNumber, setProjectNumber] = useState<string>('')

   const year = parseInt(new Date().getFullYear().toString().slice(-2));

   useEffect(() => {
       const fetchProjectNumber = async () => {
           const number = await updateCounter()
           setProjectNumber(number.toString())
       }
       fetchProjectNumber()
   }, [])

   const handleCreateDirectories = async() => {
       setLoading(true)
       setStatus({ type: '', message: '' })
       const jobTitle = `${year}-${parseInt(projectNumber)} ${project_name}`

       try {
           // 1. Create SharePoint directories
           const dirResponse = await fetch('http://127.0.0.1:8000/api/sharepoint/create-directories', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json'
               },
               body: JSON.stringify({
                   job_title: jobTitle
               })
           })

           if (!dirResponse.ok) {
               const dirData = await dirResponse.json()
               throw new Error(dirData.detail || 'Failed to create directories')
           }

           try {
               // 2. Create Go No Go Report
               const reportResult = await create_go_no_go({
                   project_name: project_name,
                   project_address,
                   job_type: project_type
               }, jobTitle)

               if (!reportResult.success) {
                   // If report creation fails, delete the directory and throw error
                   await deleteDirectory(jobTitle)
                   throw new Error(reportResult.error || 'Failed to create Go No Go report')
               }

               try {
                   // 3. Add project to database
                   const emptyJsonArray = JSON.parse('[]') as JSON;
                   
                   const projectData = {
                       number: parseInt(projectNumber),
                       name: project_name,
                       type: project_type,
                       stage: "IMS Stage",
                       ims_status: false,
                       swms_status: false,
                       report_ids: emptyJsonArray,
                       year: year
                   }
                   
                   await addProject(projectData);

                   setStatus({
                       type: 'success',
                       message: 'Project created successfully'
                   })
               } catch (dbError) {
                   // If database entry fails, clean up directory and report
                   await deleteDirectory(jobTitle);
                   await delete_go_no_go(jobTitle);
                   throw new Error(`Failed to add project to database: ${dbError}`);
               }
           } catch (reportError) {
               // Clean up directory if report creation fails
               await deleteDirectory(jobTitle);
               throw reportError;
           }
       } catch (error) {
           setStatus({
               type: 'error',
               message: error instanceof Error ? error.message : 'An error occurred'
           })
       } finally {
           setLoading(false)
       }
   }

   return (
       <div>
           <button 
               onClick={handleCreateDirectories}
               disabled={loading}
               className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
           >
               {loading ? 'Loading...' : 'Submit'}
           </button>
           {status.message && (
               <p className={`${status.type === 'error' ? 'text-red-500' : 'text-green-500'}`}>
                   {status.message}
               </p>
           )}
       </div>
   )
}

export default CreateDirectoryButton