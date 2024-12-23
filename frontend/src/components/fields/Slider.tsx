import { FormField } from '@/fields/interface';

interface SliderFieldProps {
  field: FormField;
  value: number;
  onChange: (name: string, value: number) => void;
}

export const Slider = ({ field, value, onChange }: SliderFieldProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center justify-between">
        <input
          type="range"
          name={field.name}
          min={1}
          max={5}
          step={1}
          value={value || 1}
          onChange={(e) => onChange(field.name, parseInt(e.target.value))}
          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
        />
      </div>
      <div className="flex justify-between px-1">
        {[1, 2, 3, 4, 5].map((num) => (
          <span key={num} className="text-sm text-gray-500">
            {num}
          </span>
        ))}
      </div>
    </div>
  );
};