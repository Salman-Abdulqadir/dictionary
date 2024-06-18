import { IoClose } from "react-icons/io5";

const Title = ({ setIsModalOpen }) => {
  return (
    <div className="sticky top-0 bg-base-100 pt-4 z-50">
      <div className="flex items-center justify-between gap-2">
        <h4 className="font-bold text-lg">Search History</h4>
        <button
          className="cursor-pointer"
          onClick={() => setIsModalOpen(false)}
        >
          <IoClose size={20} />
        </button>
      </div>
      <div className="divider p-0 m-0"></div>
    </div>
  );
};

export default Title;
