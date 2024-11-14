import React, { useState } from 'react';

interface InputFieldProps {
  icon: React.ReactNode;
  type: string;
  id: string;
  label: string;
  value: string;
  required?: boolean;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ icon, type, id, label, value, required = true, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);


  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type={type}
          id={id}
          className={`block w-full pl-10 pr-3 py-2 border rounded-md leading-5 bg-white focus:outline-none focus:ring-2 focus:ring-prim sm:text-sm ${isFocused ? 'border-prim' : 'border-gray-300'
            }`}
          value={value}
          onChange={onChange}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        />
      </div>
    </div>
  );
};

export default InputField;
