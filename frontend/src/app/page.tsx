'use client'

import Link from 'next/link';
import { Header } from '@/components/Header';
import { 
  Briefcase, 
  FileText, 
  Users, 
  Building,
  ClipboardList,
  FileSpreadsheet,
  FileSearch,
  ActivitySquare
} from 'lucide-react';

interface Project {
  id: number;
  name: string;
  status: string;
}

export default function Home() {
  const projects: Project[] = [];

  const reportTypes = [
    { name: 'Anchor Testing Report', icon: ClipboardList, path: '/anchor-testing-report/new-report' },
    { name: 'Structural Investigation Report', icon: FileSearch, path: '/structural-investigation-report' },
    { name: 'Structural Engineering Report', icon: FileSpreadsheet, path: '/structural-engineering-report' },
    { name: 'Structural Monitoring Report', icon: ActivitySquare, path: '/structural-monitoring-report' }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header title="Welcome, User!" />
      
      {/* Add padding-top to account for fixed header */}
      <div className="flex flex-col md:flex-row flex-1 overflow-hidden p-6 gap-6 mt-16">
        {/* Rest of your existing code remains the same */}
        <div className="w-full md:w-1/2 flex flex-col gap-4">
          <h2 className="text-lg text-center font-semibold text-gray-700 mb-2">Projects</h2>
          <Link href="/new-project/">
            <button className="w-full bg-white border-2 border-renovo-orange text-renovo-orange hover:bg-renovo-orange hover:text-white font-bold py-4 rounded transition-colors duration-300 text-lg shadow-md flex items-center justify-center gap-2">
              <FileText className="w-5 h-5" />
              Start a New Project
            </button>
          </Link>

          <h2 className="text-lg text-center font-semibold text-gray-700 mt-4 mb-2">Reports</h2>
          <div className="grid grid-cols-2 gap-4">
            {reportTypes.map(({ name, icon: Icon, path }) => (
              <Link key={name} href={path}>
                <button className="bg-white border-2 border-renovo-orange text-renovo-orange hover:bg-renovo-orange hover:text-white font-bold rounded transition-colors duration-300 aspect-square flex flex-col items-center justify-center text-sm p-2 shadow-md w-full h-full gap-2">
                  <Icon className="w-6 h-6" />
                  {name}
                </button>
              </Link>
            ))}
          </div>

          <div className="mt-auto flex gap-4">
            <Link href="/renovo-users" className="flex-1">
              <button className="w-full bg-white border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white font-bold py-3 rounded transition-colors duration-300 text-sm shadow-md flex items-center justify-center gap-2">
                <Users className="w-4 h-4" />
                View Users
              </button>
            </Link>
            <Link href="/clients" className="flex-1">
              <button className="w-full bg-white border-2 border-gray-600 text-gray-600 hover:bg-gray-600 hover:text-white font-bold py-3 rounded transition-colors duration-300 text-sm shadow-md flex items-center justify-center gap-2">
                <Building className="w-4 h-4" />
                View Clients
              </button>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-1/2 bg-white rounded-lg shadow-md p-6 overflow-auto mt-6 md:mt-0">
          <h2 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
            <Briefcase className="mr-2" /> Ongoing Projects
          </h2>
          {projects.length > 0 ? (
            <ul className="divide-y divide-gray-200">
              {projects.map((project) => (
                <li key={project.id} className="py-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-gray-900">{project.name}</p>
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      project.status === 'Completed' ? 'bg-green-100 text-green-800' :
                      project.status === 'In Progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500">No ongoing projects at the moment.</p>
          )}
        </div>
      </div>
    </div>
  );
}