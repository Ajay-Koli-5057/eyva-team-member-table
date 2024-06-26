import React, { useState } from "react";
import CustomCheckbox from "../common/CustomCheckbox";

interface TeamMember {
  id: number;
  name: string;
  username: string;
  avatar: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: string[];
}

const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: "Olivia Rhye",
    username: "@olivia",
    avatar: "https://i.pravatar.cc/150?u=sofiawelch",
    isActive: true,
    role: "Product Designer",
    email: "olivia@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
  {
    id: 2,
    name: "Olivia Rhye",
    username: "@olivia",
    avatar: "https://i.pravatar.cc/150?u=taliaschamberger",
    isActive: false,
    role: "Product Designer",
    email: "olivia@untitledui.com",
    teams: ["Design", "Product", "Marketing"],
  },
];

const Table: React.FC = () => {
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const teamColors: any = {
    Design: {
      bg: "bg-purple-100",
      text: "text-purple-800",
    },
    Product: {
      bg: "bg-blue-100",
      text: "text-blue-800",
    },
    Marketing: {
      bg: "bg-indigo-100",
      text: "text-indigo-800",
    },
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedMembers([]);
    } else {
      setSelectedMembers(teamMembers.map((member) => member.id));
    }
    setSelectAll(!selectAll);
  };

  const handleSelectMember = (id: number) => {
    if (selectedMembers.includes(id)) {
      setSelectedMembers(selectedMembers.filter((memberId) => memberId !== id));
    } else {
      setSelectedMembers([...selectedMembers, id]);
    }
  };

  const onEdit = () => {
    // Your edit logic here
  };

  const onDelete = () => {
    // Your delete logic here
  };

  return (
    <div className="container mx-auto p-4">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Team Settings</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <div className="p-4 border-b flex justify-between">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <button
            className={`bg-purple-600 text-white px-4 py-2 rounded ${
              selectedMembers.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={selectedMembers.length === 0}
          >
            Delete Selected
          </button>
        </div>
        <div className="p-4">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="py-1 px-4 border-b">
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="scale-125"
                  />
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-500 font-normal">
                  Name
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-500 font-normal">
                  Status
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-500 font-normal">
                  Role
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-500 font-normal">
                  Email
                </th>
                <th className="py-2 px-4 border-b text-left text-gray-500 font-normal">
                  Teams
                </th>
                <th className="py-2 px-4 border-b text-left"></th>
              </tr>
            </thead>
            <tbody>
              {teamMembers?.map((member, index) => (
                <tr key={index} className="border-b">
                  <td className="py-1 px-4">
                    <input
                      type="checkbox"
                      checked={selectedMembers.includes(member.id)}
                      onChange={() => handleSelectMember(member.id)}
                      className="scale-125"
                    />
                  </td>
                  <td className="py-2 px-4 flex items-center">
                    <div className="h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center">
                      <img
                        src={member.avatar}
                        alt="Profile"
                        className="rounded-full object-cover w-full h-full"
                      />
                    </div>
                    <div className="ml-3">
                      <p className="text-gray-900 whitespace-no-wrap">
                        {member.name}
                      </p>
                      <p className="text-gray-500 whitespace-no-wrap">
                        {member.username}
                      </p>
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <span
                      className={`px-3 rounded-full text-xs font-bold flex items-center ${
                        member.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      <span className="mr-1 text-lg">•</span>
                      {member.isActive ? "Active" : "Inactive"}
                    </span>
                  </td>
                  <td className="py-2 px-4 text-gray-500">{member.role}</td>
                  <td className="py-2 px-4 text-gray-500">{member.email}</td>
                  <td className="py-2 px-4 items-center">
                    {member.teams?.map((team, index) => {
                      const colors = teamColors[team] || {
                        bg: "bg-gray-100",
                        text: "text-gray-800",
                      };

                      return (
                        <span
                          key={index}
                          className={`${colors.bg} ${colors.text} py-1 px-3 rounded-full text-xs mr-1`}
                        >
                          {team}
                        </span>
                      );
                    })}
                    {/* {member.teams.length > 1 && ( */}
                    <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-xs">
                      +{4}
                      {/* +{member.teams.length - 3} */}
                    </span>
                    {/* )} */}
                  </td>
                  <td className="py-2 px-4  space-x-5">
                    <button
                      onClick={onDelete}
                      className="text-red-500 hover:text-red-900"
                    >
                      <i className="fas fa-trash-alt"></i>
                    </button>
                    <button
                      onClick={onEdit}
                      className="text-indigo-500 hover:text-indigo-900"
                    >
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t">
          <button className="bg-red-500 text-white px-4 py-2 rounded">
            Delete Selected
          </button>
        </div>
      </div>
    </div>
  );
};

export default Table;
