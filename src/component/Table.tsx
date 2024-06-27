import React, { useEffect, useState } from "react";
import Checkbox from "../common/CustomCheckbox";
import TeamMemberRow from "./TeamMemberRow";
import EditUserForm from "./EditUserForm";
import Pagination from "./Pagination";
import { TeamMember } from "../types/types";
import {
  deleteMembers,
  fetchTeamMembers,
  updateMemberDetails,
} from "../services/apiService";

const Table: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [teamMembersList, setTeamMembersList] = useState<TeamMember[]>([]);
  const [totalMemberList, setTotalMemberList] = useState<number>(0);
  const [selectedMembers, setSelectedMembers] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showEditSuccessModal, setShowEditSuccessModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [selectedMember, setSelectedMember] = useState<any | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchKey, setSearchKey] = useState<any | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [sortBy, setSortBy] = useState<"name" | "role" | "email" | "teams">(
    "name"
  );
  const itemsPerPage = 10;

  useEffect(() => {
    fetchData();
  }, [currentPage, searchKey, sortOrder, sortBy]);

  const fetchData = async () => {
    setLoading(true);
    let params: object = {
      page: currentPage,
      limit: 10,
      search: searchKey,
      sortBy: sortBy,
      order: sortOrder,
    };
    try {
      const data: any = await fetchTeamMembers(params);
      setTeamMembersList(data?.items);
      setTotalMemberList(data?.count);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setLoading(false);
  };

  const handleSortChange = (property: "name" | "role" | "email" | "teams") => {
    if (property === sortBy) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(property);
      setSortOrder("asc");
    }
  };

  const totalPages =
    totalMemberList && Math.ceil(totalMemberList / itemsPerPage);
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

  const handlePageSelect = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAll = () => {
    setSelectedMembers(
      selectAll ? [] : teamMembersList?.map((member) => member.id)
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

  const onSingleDelete = (memberId: number | any) => {
    setSelectedMembers([memberId]);
    setShowConfirmModal(true);
  };

  const handleFormSubmit = async (data: any) => {
    try {
      await updateMemberDetails(data.id, data);
      setShowEditModal(false);
      setShowEditSuccessModal(true);
      setTimeout(() => setShowEditSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error updating user details:", error);
      setShowErrorModal(true);
      setShowEditModal(false);
    }
  };

  const onDeleteSelected = async () => {
    try {
      await deleteMembers(selectedMembers);
      const updatedMembers = teamMembersList.filter(
        (member) => !selectedMembers?.includes(member.id)
      );
      setTeamMembersList(updatedMembers);
      setSelectedMembers([]);
      setShowConfirmModal(false);
      setShowSuccessModal(true);
      setTimeout(() => setShowSuccessModal(false), 2000);
    } catch (error) {
      console.error("Error deleting members:", error);
      setSelectedMembers([]);
      setShowConfirmModal(false);
      setShowErrorModal(true);
    }
  };

  return (
    <div className="container mx-auto p-2 max-w-screen-xl">
      <div className="p-4 border-b">
        <h1 className="text-xl font-bold">Team Settings</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-semibold">
            Team Members
            <span
              className={`bg-purple-100 text-purple-800 py-1 px-3 mx-4 rounded-full text-xs mr-1`}
            >
              {`${totalMemberList} users`}
            </span>
          </h2>

          <div className="flex w-half space-x-5">
            <input
              type="text"
              className={`p-2 border border-gray-400 rounded-lg hover:border-purple-500 focus:outline-none`}
              placeholder="Search..."
              onChange={(e) => setSearchKey(e.target.value)}
            />
            <button
              className={`bg-purple-600 rounded-lg text-white px-8 py-2 rounded ${
                selectedMembers.length === 0
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              disabled={selectedMembers.length === 0}
              onClick={() => onDelete()}
            >
              Delete Selected
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-200">
                <th className="py-1 px-4 border-b">
                  <Checkbox
                    checked={selectAll && selectedMembers.length > 0}
                    onChange={handleSelectAll}
                  />
                </th>
                <th
                  className="py-2 px-4 border-b cursor-pointer"
                  onClick={() => handleSortChange("name")}
                >
                  <span className="text-left text-gray-500 font-normal">
                    Name
                  </span>
                  {sortBy === "name" && (
                    <span className="ml-2 text-gray-500">
                      {sortOrder === "asc" ? (
                        <i className="fas fa-arrow-up"></i>
                      ) : (
                        <i className="fas fa-arrow-down"></i>
                      )}
                    </span>
                  )}
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
                <tr>
                  <td colSpan={8} className="text-center py-4 w-full">
                    ...Loading
                  </td>
                </tr>
              ) : teamMembersList.length === 0 ? (
                <tr>
                  <td colSpan={8} className="text-center py-4 w-full">
                    No data available
                  </td>
                </tr>
              ) : (
                teamMembersList.map((member) => (
                  <TeamMemberRow
                    key={member.id}
                    member={member}
                    selected={selectedMembers?.includes(member.id)}
                    onSelect={handleSelectMember}
                    onSingleDelete={() => onSingleDelete(member.id)}
                    onEdit={() => onEdit(member)}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPrevious={handlePreviousPage}
          onNext={handleNextPage}
          onPageSelect={handlePageSelect}
        />
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
                handleFormSubmit(data);
              }}
              onCancel={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}

      {showEditSuccessModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-start">
              <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
                <div className="bg-green-200 rounded-full p-2 flex items-center justify-center">
                  <i className="fa-regular fa-circle-check text-green-600 text-2xl"></i>
                </div>
              </div>
              <span className="text-lg font-normal mt-4">
                User Details Changed!
              </span>
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
            <div className="flex flex-col items-start">
              <div className="bg-green-100 rounded-full p-2 flex items-center justify-center">
                <div className="bg-green-200 rounded-full p-2 flex items-center justify-center">
                  <i className="fa-regular fa-circle-check text-green-600 text-2xl"></i>
                </div>
              </div>
              <span className="text-lg font-normal mt-4">
                Users successfully deleted!
              </span>
            </div>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
            <div className="flex flex-col items-start">
              <div className="bg-red-100 rounded-full p-2 flex items-center justify-center">
                <div className="bg-red-200 rounded-full p-2 flex items-center justify-center">
                  <i className="fa-regular fa-circle-xmark text-red-600 text-2xl"></i>
                </div>
              </div>
              <span className="text-lg font-normal mt-4">
                Something went wrong!
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Table;
