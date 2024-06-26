import React from "react";
import "../App.css";

interface CustomSelectProps {
  selectedOption: string;
  onChange: (value: string) => void;
}

const roles = [
  "Frontend Developer",
  "UX Researcher",
  "Backend Developer",
  "Data Scientist",
  "Marketing Manager",
  "Product Designer",
];

const CustomSelect: React.FC<CustomSelectProps> = ({
  selectedOption,
  onChange,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(event.target.value);
  };

  return (
    <div className="flex flex-col space-y-1 w-full relative">
      <div className="text-md font-normal">User Role</div>
      <div className="relative">
        <select
          value={selectedOption}
          onChange={handleChange}
          className="p-2 border border-gray-400 rounded-lg w-full hover:border-purple-500 focus:outline-none appearance-none"
        >
          <option value="">Select role</option>
          {roles.map((role) => (
            <option key={role} value={role}>{role}</option>
          ))}
        </select>
        <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
          <svg
            className="h-5 w-5 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M10 12a1 1 0 0 1-.707-.293l-3-3a1 1 0 1 1 1.414-1.414L10 10.586l2.293-2.293a1 1 0 1 1 1.414 1.414l-3 3A1 1 0 0 1 10 12z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default CustomSelect;
