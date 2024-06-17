// icons
import { FaHistory } from "react-icons/fa";

const EmptySearchHistory = ({ text = "No search history!" }) => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <FaHistory size={80} />
      <h4>{text}</h4>
    </div>
  );
};
export default EmptySearchHistory;
