import Button from "@/components/Button";
import { TiEdit } from "react-icons/ti";
import { MdDeleteOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
const GroupAndEventEditAndDelete = ({
  name,
  url,
}: {
  name: string;
  url: string;
}) => {
  const navigation = useNavigate();
  return (
    <div className="flex gap-4 w-fit">
      <Button
        className="bg-green-900 border-green-800"
        onClick={() => name !== "" && navigation(url)}
      >
        <TiEdit className="h-5 w-5" />
        Edit
      </Button>
      <Button className="bg-red-900 border-red-900">
        <MdDeleteOutline className="h-5 w-5" />
        Delete
      </Button>
    </div>
  );
};

export default GroupAndEventEditAndDelete;
