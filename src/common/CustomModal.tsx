
interface ModalProps {
  message: string;
  type: "success" | "error";
}

const CustomModal = ({ message, type }: ModalProps) => {
  return (
    <>
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-lg sm:w-2/3 md:w-1/2 lg:w-1/3">
          <div className="flex flex-col items-start">
            <div
              className={`rounded-full p-2 flex items-center justify-center ${
                type === "success" ? "bg-green-100" : "bg-red-100"
              }`}
            >
              <div
                className={`rounded-full p-2 flex items-center justify-center ${
                  type === "success" ? "bg-green-200" : "bg-red-200"
                }`}
              >
                <i
                  className={`fa-regular ${
                    type === "success"
                      ? "fa-circle-check text-green-600"
                      : "fa-circle-xmark text-red-600"
                  } text-2xl`}
                ></i>
              </div>
            </div>
            <span className="text-lg font-normal mt-4">{message}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default CustomModal;
