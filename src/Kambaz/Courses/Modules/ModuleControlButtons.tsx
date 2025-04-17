import { FaTrash } from "react-icons/fa";
import GreenCheckmark from "./GreenCheckmark";
import { BsPlus } from "react-icons/bs";
import { IoEllipsisVertical } from "react-icons/io5";
import { FaPencil } from "react-icons/fa6";
import { useSelector } from "react-redux";
export default function ModuleControlButtons({
  moduleId,
  deleteModule,
  editModule,
}: {
  moduleId: string;
  deleteModule: (moduleId: string) => void;
  editModule: (moduleId: string) => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isModerator = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";
  return (
    <div className="float-end">
      {isModerator && (
        <>
          <FaPencil
            onClick={() => editModule(moduleId)}
            className="text-primary me-3"
          />
          <FaTrash
            className="text-danger me-2 mb-1"
            onClick={() => deleteModule(moduleId)}
          />
          <GreenCheckmark />
          <BsPlus className="fs-1" />
        </>
      )}

      <IoEllipsisVertical className="fs-4" />
    </div>
  );
}
