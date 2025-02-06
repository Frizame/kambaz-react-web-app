import { FaBars } from "react-icons/fa6";
import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-home">
      <nav className="navbar navbar-light d-xl-none mt-3">
        <div className="container-fluid">
          <button
            className="navbar-toggler ms-auto shadow-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#courseStatusCollapse"
            aria-controls="courseStatusCollapse"
            aria-expanded="false"
          >
            <FaBars />
          </button>
        </div>
      </nav>

      <div className="collapse d-xl-none" id="courseStatusCollapse">
        <div className="card card-body">
          <CourseStatus />
        </div>
        <br />
      </div>

      <div className="d-flex">
        <div className="flex-fill me-3">
          <Modules />
        </div>
        <div className="d-none d-xl-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
