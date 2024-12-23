import { FormField } from '@/fields/interface';

interface TextFieldProps {
    field: FormField;
    value: string;
    onChange: (name: string, value: string) => void;
  }
  
  export const Text = ({ field, value, onChange }: TextFieldProps) => {
    return (
      <input
        type="text"
        name={field.name}
        value={value}
        placeholder={field.placeholder}
        onChange={(e) => onChange(field.name, e.target.value)}
        className="w-full p-2 border rounded"
        required={field.required}
      />
    );
  };
  