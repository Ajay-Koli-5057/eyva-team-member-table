import React from "react";
import { useForm } from "react-hook-form";
import CustomSelect from "../common/CustomSelect";
import Spinner from "../common/Spinner";

interface EditUserFormProps {
  selectedMember: TeamMember | null;
  isLoading: boolean;
  onSubmit: (data: any) => void;
  onCancel: () => void;
}

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

const EditUserForm: React.FC<EditUserFormProps> = ({
  selectedMember,
  isLoading,
  onSubmit,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
  } = useForm({
    defaultValues: selectedMember || undefined,
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col space-y-1 w-full mb-5">
        <div className="text-md font-normal">Name</div>
        <input
          type="text"
          className={`p-2 border border-gray-400 rounded-lg w-full hover:border-purple-500 focus:outline-none ${
            errors.name ? "border-red-500" : ""
          }`}
          placeholder="Enter name"
          defaultValue={selectedMember?.name}
          {...register("name", {
            required: "Name is required",
          })}
        />
        {errors.name && typeof errors.name.message === "string" && (
          <span className="text-red-500 text-sm">{errors.name.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-1 w-full mb-5">
        <CustomSelect
          selectedOption={getValues("role") || ""}
          onChange={(value) =>
            setValue("role", value, { shouldValidate: true })
          }
        />
        {errors.role && typeof errors.role.message === "string" && (
          <span className="text-red-500 text-sm">{errors.role.message}</span>
        )}
      </div>
      <div className="flex flex-col space-y-1 w-full mb-5">
        <div className="text-md font-normal">Email Address</div>
        <input
          type="email"
          className={`p-2 border border-gray-400 rounded-lg w-full hover:border-purple-500 focus:outline-none ${
            errors.email ? "border-red-500" : ""
          }`}
          placeholder="Enter email address"
          defaultValue={selectedMember?.email}
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "Invalid email address",
            },
          })}
        />
        {errors.email && typeof errors.email.message === "string" && (
          <span className="text-red-500 text-sm">{errors.email.message}</span>
        )}
      </div>
      <div className="flex justify-evenly space-x-4">
        <button
          type="button"
          className="px-4 py-2 w-full rounded bg-white border border-black rounded-lg hover:bg-gray-300 hover:border-none"
          onClick={onCancel}
        >
          Cancel
        </button>
        <button
          type="submit"
          className={`px-4 py-2 w-full rounded bg-purple-600 rounded-lg text-white hover:bg-purple-700 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? <Spinner height={4} width={4} /> : "Confirm"}
        </button>
      </div>
    </form>
  );
};

export default EditUserForm;
