import { FormField } from "./interface";
export const goNoGoFields: FormField[] = [
  // PROJECT INFORMATION
  {
    name: 'project_name',
    label: 'Project Name',
    type: 'text',
    required: true,
    placeholder: 'Enter project name'
  },
  {
    name: 'project_address',
    label: 'Project Address',
    type: 'text',
    required: true,
    placeholder: 'Enter project address'
  },
  {
    name: 'project_type',
    label: 'Project Type',
    type: 'select',
    required: true,
    options: [
      { label: 'Anchor Testing', value: 'Anchor Testing' },
      { label: 'Structural Investigation', value: 'Structural Investigation' },
      { label: 'Structual Monitoring', value: 'Structual Monitoring' },
      { label: 'Structural Engineering', value: 'Structural Engineering' }
    ]
  },
  {
    name: 'discipline',
    label: 'Discipline',
    type: 'text',
    required: true,
    placeholder: 'Primary Discipline'
  },
  {
    name: 'services_required',
    label: 'Services Required',
    type: 'text',
    required: false,
    placeholder: 'Enter services required (if known)'
  },
  {
    name: 'project_director',
    label: 'Project Director',
    type: 'text',
    required: true,
    placeholder: 'Enter project director'
  },
  {
    name: 'client_status',
    label: 'Client Status',
    type: 'select',
    required: true,
    options: [
      { label: 'Passed Credit Check', value: 'Passed Credit Check' },
      { label: 'Failed Credit Check', value: 'Failed Credit Check' },
    ]
  },
  
  // PROJECT TEAM

  // Risk
  {
    name: 'rates',
    label: 'Rates/ Fee Discount',
    type: 'slider',
    required: false
  },
  {
    name: 'key_advantage',
    label: 'Key Advantage',
    type: 'slider',
    required: false
  },
  {
    name: 'client_profile',
    label: 'Client Profile',
    type: 'slider',
    required: false
  },
  {
    name: 'strategic_alignment',
    label: 'Strategic Alignment',
    type: 'slider',
    required: false
  },
  {
    name: 'location',
    label: 'Location of the project from any office',
    type: 'slider',
    required: false
  },
  {
    name: 'commercial_conditions',
    label: 'Commercial Conditions',
    type: 'slider',
    required: false
  },
  {
    name: 'subs',
    label: 'Sub Contractor/ Sub Consultant',
    type: 'slider',
    required: false
  },
  {
    name: 'resource_capacity',
    label: 'Resource Capacity',
    type: 'slider',
    required: false
  },
  {
    name: 'technical_resource_capacity',
    label: 'Technical Resource Capacity',
    type: 'slider',
    required: false
  },

  // Add more fields as needed
];

// You can group fields by section
export const formSections = [
  {
    title: 'Project Information',
    fields: ['projectName', 'clientType']
  },
  {
    title: 'Financial Details',
    fields: ['estimatedValue']
  }
];