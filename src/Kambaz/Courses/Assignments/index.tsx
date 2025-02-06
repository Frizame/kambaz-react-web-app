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

export default function Assignments() {
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

          <ListGroup className="wd-lessons rounded-0">
            {/* A1 - ENV + HTML */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaClipboard className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/123"
                className="wd-assignment-link ms-2 text-decoration-none"
              >
                <span className="black-text"> A1 </span>
              </a>
              <LessonControlButtons />
              <br />
              <span className="red-text"> Multiple Modules </span>|{" "}
              <b>Not available until</b> May 6 at 12:00am |
              <br />
              <b>Due</b> May 13 at 11:59pm | 100pts
            </ListGroup.Item>

            {/* A2 - CSS + BOOTSTRAP */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaClipboard className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/456"
                className="wd-assignment-link ms-2 text-decoration-none"
              >
                <span className="black-text"> A2 </span>
              </a>
              <LessonControlButtons />
              <br />
              <span className="red-text"> Multiple Modules </span>| |{" "}
              <b>Not available until</b> May 13 at 12:00am |
              <br />
              <b>Due</b> May 20 at 11:59pm | 100pts
            </ListGroup.Item>

            {/* A3 - JAVASCRIPT + REACT */}
            <ListGroup.Item className="wd-lesson p-3 ps-1">
              <BsGripVertical className="me-2 fs-3" />
              <FaClipboard className="me-2 fs-3" />
              <a
                href="#/Kambaz/Courses/1234/Assignments/789"
                className="wd-assignment-link ms-2 text-decoration-none"
              >
                <span className="black-text"> A3 </span>
              </a>
              <LessonControlButtons />
              <br />
              <span className="red-text"> Multiple Modules </span>| |{" "}
              <b>Not available until</b> May 20 at 12:00am |
              <br />
              <b>Due</b> May 27 at 11:59pm | 100pts
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
