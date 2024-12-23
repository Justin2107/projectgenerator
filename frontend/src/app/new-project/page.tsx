'use client'

import { Header } from "@/components/Header"
import { DynamicForm } from "@/components/Form"
import { goNoGoFields } from "@/fields/gonogo_definitions"

export default function NewProject() {

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <Header title="New Project" />        
            <div className="mt-16 p-6">
                <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold text-gray-800 mb-6">
                        Internal Management System - Go / No Go Form
                    </h2>
                    <DynamicForm 
                        fields={goNoGoFields} 
                    />
                </div>
                
            </div>
        </div>
    )
}