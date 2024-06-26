import Checkbox from "../common/CustomCheckbox";
import { TeamMemberRowProps } from "../types/types";
import { teamColors } from "../utils/colors";

const TeamMemberRow: React.FC<TeamMemberRowProps> = ({
  member,
  selected,
  onSelect,
  onDelete,
  onEdit,
}) => {
  const handleSelect = () => {
    onSelect(member.id);
  };

  return (
    <tr className="border-b">
      <td className="py-1 px-4">
        <Checkbox checked={selected} onChange={handleSelect} />
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
          <p className="text-gray-900 whitespace-no-wrap">{member.name}</p>
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
        {member?.teams?.slice(0, 3)?.map((team: any, index: number) => {
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
      <td className="py-2 px-1 pr-5 space-x-5">
        <button
          onClick={() => onDelete()}
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
  );
};

export default TeamMemberRow;
