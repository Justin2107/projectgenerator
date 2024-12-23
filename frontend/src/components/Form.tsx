import { useState, useMemo } from 'react';
import { FormField } from '@/fields/interface';
import { Slider } from './fields/Slider';
import { Text } from './fields/Text';
import { Select } from './fields/Select';
import CreateDirectoryButton from './CreateDirectory';

interface FormData {
  project_name: string;
  project_type: string;
  [key: string]: string | number;
}

interface DynamicFormProps {
  fields: FormField[];
}

export function DynamicForm({ fields }: DynamicFormProps) {
  const [formData, setFormData] = useState<FormData>({
    project_name: '',
    project_type: '',
  });
  
  const handleChange = (name: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const sliderTotal = useMemo(() => {
    return fields
      .filter(field => field.type === 'slider')
      .reduce((total, field) => {
        const value = formData[field.name] as number || 0;
        return total + value;
      }, 0);
  }, [fields, formData]);

  const getTotalColor = (total: number) => {
    if (total <= 20) return 'text-green-500';
    if (total <= 34) return 'text-orange-500';
    return 'text-red-500';
  };

  const renderField = (field: FormField) => {
    const value = formData[field.name];

    switch (field.type) {
      case 'slider':
        return (
          <Slider
            field={field}
            value={value as number}
            onChange={handleChange}
          />
        );
      case 'text':
        return (
          <Text
            field={field}
            value={value as string}
            onChange={handleChange}
          />
        );
      case 'select':
        return (
          <Select
            field={field}
            value={value as string}
            onChange={handleChange}
          />
        );
      default:
        return null;
    }
  };

  const hasSliders = fields.some(field => field.type === 'slider');

  return (
    <form onSubmit={(e) => {
      e.preventDefault();
    }}>
      {fields.map(field => (
        <div key={field.name} className="mb-4">
          <label className="block mb-2 font-medium">
            {field.label}
            {field.required && <span className="text-red-500">*</span>}
          </label>
          {renderField(field)}
        </div>
      ))}
      {hasSliders && (
        <div className="mt-6 p-4 border rounded-lg bg-gray-50">
          <div className="flex items-center justify-between">
            <span className="font-medium">Total Risk:</span>
            <span className={`text-xl font-bold ${getTotalColor(sliderTotal)}`}>
              {sliderTotal}
            </span>
          </div>
          <div className="mt-2 text-sm text-gray-500">
            {sliderTotal <= 20 && '✓ Within optimal range'}
            {sliderTotal > 20 && sliderTotal <= 34 && '⚠️ Approaching upper limit'}
            {sliderTotal > 34 && '🛑 Exceeds recommended range'}
          </div>
        </div>
      )}
      <div className="mt-6">
        <CreateDirectoryButton 
          project_name={formData.project_name} 
          project_type={formData.project_type} 
          project_address='Project Address' 
        />
      </div>
    </form>
  );
}