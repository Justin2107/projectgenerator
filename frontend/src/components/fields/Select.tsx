import { FormField } from '@/fields/interface';

interface SelectFieldProps {
    field: FormField;
    value: string;
    onChange: (name: string, value: string) => void;
  }
  
  export const Select = ({ field, value, onChange }: SelectFieldProps) => {
    return (
      <select
        name={field.name}
        value={value}
        onChange={(e) => onChange(field.name, e.target.value)}
        className="w-full p-2 border rounded"
        required={field.required}
      >
        <option value="">Select {field.label}</option>
        {field.options?.map(opt => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    );
  };