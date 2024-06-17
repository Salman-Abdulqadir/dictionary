// icons
import { FaHistory } from "react-icons/fa";

const EmptySearchHistory = () => {
  return (
    <div className="flex-1 flex flex-col justify-center items-center gap-4">
      <FaHistory size={80} />
      <h4>No search history!</h4>
    </div>
  );
};
export default EmptySearchHistory;
