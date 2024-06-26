import React, { useEffect, useState } from "react";
import Checkbox from "../common/CustomCheckbox";
import EditUserForm from "./EditUserForm";

interface TeamMember {
  id: number;
  name: string;
  userName: string;
  avatar: string;
  isActive: boolean;
  role: string;
  email: string;
  teams: string[];
}

const teamColors: Record<string, { bg: string; text: string }> = {
  design: {
    bg: "bg-purple-100",
    text: "text-purple-800",
  },
  product: {
    bg: "bg-blue-100",
    text: "text-blue-800",
  },
  marketing: {
    bg: "bg-indigo-100",
    text: "text-indigo-800",
  },
  tech: {
    bg: "bg-green-100",
    text: "text-green-800",
  },
  qa: {
    bg: "bg-yellow-100",
    text: "text-yellow-800",
  },
  rnd: {
    bg: "bg-red-100",
    text: "text-red-800",
  },
};

const Table: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembersList, setTeamMembersList] = useState<TeamMember[]>([]);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          "https://file.notion.so/f/f/c3dc6211-3e3a-424e-87af-0d24a031a77a/3e7e1f55-6279-4838-8e8d-1dbb131be677/dummy-data.json?id=328dd752-aeb0-452d-966f-2d6999d06113&table=block&spaceId=c3dc6211-3e3a-424e-87af-0d24a031a77a&expirationTimestamp=1719482400000&signature=rwDEk0Zw-XuoaJaS_Qydbm7k_MsBDb2TBMOnszWNdis&downloadName=dummy-data.json"
        );
        const data = await response.json();
        setTeamMembersList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleSelectMember = (id: number) => {
    setSelectedMembers((prevSelected) =>
      prevSelected.includes(id)
        ? prevSelected.filter((memberId) => memberId !== id)
        : [...prevSelected, id]
    );
  };

  const handlePagination = (page: number) => {
    setCurrentPage(page);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      handlePagination(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      handlePagination(currentPage + 1);
    }
  };

  const totalPages = Math.ceil(teamMembersList?.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMembers = teamMembersList?.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handleSelectAll = () => {
    setSelectedMembers(
      selectAll ? [] : paginatedMembers?.map((member) => member.id)
    );
    setSelectAll(!selectAll);
  };

  const onEdit = (member: TeamMember) => {
    setSelectedMember(member);
    setShowEditModal(true);
  };

  const onDelete = () => {
    setShowConfirmModal(true);
  };

  const confirmEdit = () => {
    setShowEditModal(false);
    setShowEditSuccessModal(true);
    setTimeout(() => setShowEditSuccessModal(false), 2000);
  };

  const confirmDelete = () => {
    setShowConfirmModal(false);
    setShowSuccessModal(true);
    setTimeout(() => setShowSuccessModal(false), 2000);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      const response = await fetch(`https://edit-api-url/${data?.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Failed to update user details');
      }
      confirmEdit();
    } catch (error) {
      console.error('Error updating user details:', error);
      alert(error)
    }
  };

  const onDeleteSelected = async () => {
    try {
      const response = await fetch(`https://delete-api-url/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedMembers }),
      });
      if (!response.ok) {
        throw new Error('Failed to delete selected members');
      }
      const updatedMembers = teamMembersList?.filter(member =>
        !selectedMembers.includes(member.id)
      );
      setTeamMembersList(updatedMembers);
      setSelectedMembers([]);
      confirmDelete();
    } catch (error) {
      console.error('Error deleting members:', error);
      setSelectedMembers([]);
      setShowConfirmModal(false);
      alert(error)
    }
  };

  return (
    <div className="container mx-auto p-2 max-w-screen-xl">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Team Settings</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">Team Members</h2>
          <button
            className={`bg-purple-600 text-white px-4 py-2 rounded ${
              selectedMembers.length === 0
                ? "opacity-50 cursor-not-allowed"
                : ""
            }`}
            disabled={selectedMembers.length === 0}
            onClick={onDelete}
          >
            Delete Selected
          </button>
        </div>
        <div className="p-4 overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr>
                <th className="py-1 px-4 border-b">
                  <Checkbox checked={selectAll && selectedMembers?.length > 0} onChange={handleSelectAll} />
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
              {loading ? (
                <div className="p-4 flex justify-center items-center">
                  <div className="loader"></div>
                </div>
              ) : (
                paginatedMembers?.map((member) => (
                  <tr key={member.id} className="border-b">
                    <td className="py-1 px-4">
                      <Checkbox
                        checked={selectedMembers?.includes(member.id)}
                        onChange={() => handleSelectMember(member.id)}
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
                          {"@" + member.userName}
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
                    <td className="py-2 px-3 text-gray-500">{member.email}</td>
                    <td className="py-2 px-3 items-center">
                      {member.teams.slice(0, 3)?.map((team, index) => {
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
                      {member.teams.length > 3 && (
                        <span className="bg-gray-200 text-gray-800 py-1 px-3 rounded-full text-xs">
                          +{member.teams.length - 3}
                        </span>
                      )}
                    </td>
                    <td className="py-2 px-1 space-x-5">
                      <button
                        onClick={onDelete}
                        className="text-red-500 hover:text-red-900"
                      >
                        <i className="fas fa-trash-alt"></i>
                      </button>
                      <button
                        onClick={() => onEdit(member)}
                        className="text-indigo-500 hover:text-indigo-900"
                      >
                        <i className="fas fa-edit"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
        <div className="p-4 border-t flex justify-between items-center">
          <button
            onClick={handlePreviousPage}
            className={`bg-gray-300 text-gray-800 px-4 py-2 rounded ${
              currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={handleNextPage}
            className={`bg-gray-300 text-gray-800 px-4 py-2 rounded ${
              currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>

      {/* Modals */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
            <h2 className="text-xl font-normal mb-5">Edit User Details</h2>
            <EditUserForm
              selectedMember={selectedMember}
              onSubmit={(data: any) => {
                setSelectedMember(data);
                handleFormSubmit(data)
              }}
              onCancel={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}

      {showEditSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-left">
              <span className="text-green-600 text-3xl mb-4">
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span className="text-lg font-normal">User Details Changed!</span>
            </div>
          </div>
        </div>
      )}

      {showConfirmModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3 mx-4 sm:mx-0">
            <h2 className="text-xl font-normal mb-10">
              Are you sure you want to delete selected users?
            </h2>
            <div className="flex justify-evenly space-x-4">
              <button
                className="px-4 py-2 w-full rounded bg-gray-200 rounded-lg hover:bg-gray-300"
                onClick={() => setShowConfirmModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 w-full rounded bg-purple-600 rounded-lg text-white hover:bg-purple-700"
                onClick={onDeleteSelected}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-left">
              <span className="text-green-600 text-3xl mb-4">
                <i className="fa-solid fa-circle-check"></i>
              </span>
              <span className="text-lg font-normal">
                Users successfully deleted!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
