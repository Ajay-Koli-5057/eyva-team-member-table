
interface SpinnerProps {
  height: number;
  width: number;
}

const Spinner = ({ height, width }: SpinnerProps) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`animate-spin rounded-full h-${height} w-${width} border-t-2 border-b-2 border-purple-500`}
      ></div>
    </div>
  );
};

export default Spinner;
