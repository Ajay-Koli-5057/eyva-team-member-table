import React from 'react';

const CustomCheckbox = ({ member, selectedMembers, handleSelectMember }: any) => {
  // Add guard clause to handle undefined or null member
  if (!member) {
    return null; // or handle gracefully in your UI
  }

  const isChecked = selectedMembers.includes(member.id);

  return (
    <td className="py-1 px-4">
      <label className="flex items-center">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => handleSelectMember(member.id)}
          className="hidden"
        />
        <div
          className={`w-5 h-5 flex items-center justify-center rounded-lg transition-colors duration-200 ${
            isChecked
              ? 'bg-purple-500 border-2 border-purple-500'
              : 'bg-white border-2 border-gray-300 hover:border-purple-500'
          }`}
        >
          {isChecked && (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </div>
      </label>
    </td>
  );
};

export default CustomCheckbox;
