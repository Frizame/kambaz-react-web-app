import {
  Button,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import {
  FaClipboard,
  FaPlus,
} from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useParams } from "react-router-dom";
import * as db from "../../Database";


export default function Assignments() {
  const { cid } = useParams();
  const assignments = db.assignments;
  return (
    <div>
      <div className="d-flex justify-content-between">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." />
        </InputGroup>

        <div>
          <Button id="wd-add-assignment-group" className="btn-secondary me-2">
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Group
          </Button>
          <Button id="wd-add-assignment" className="btn-red">
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Assignment
          </Button>
        </div>
      </div>
      <br />
      <br />

      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            <div>
              <ModuleControlButtons />
            </div>
          </div>

          
          <ListGroup id="wd-lessons rounded-0" className="list-group rounded-0">
          {assignments
            .filter((assignment: any) => assignment.course === cid)
            .map((assignment: any) => (
              <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaClipboard className="me-2 fs-3" />
              <a
                href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                className="wd-assignment-link ms-2 text-decoration-none"
              >
                <span className="black-text"> {assignment.title} </span>
              </a>
              <LessonControlButtons />
              <br />
              <span className="red-text"> Multiple Modules </span>|{" "}
              <b>Not available until</b> May 6 at 12:00am |
              <br />
              <b>Due</b> May 13 at 11:59pm | 100pts
            </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}