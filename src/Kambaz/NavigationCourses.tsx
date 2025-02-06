import { Link } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaBars, FaInbox, FaRegCircleUser } from "react-icons/fa6";
import CourseNavigation from "./Courses/Navigation";
import "./style.css";
import { FaHome } from "react-icons/fa";

export default function KambazNavigationWithCourses() {
  return (
    <>
      <div
        id="wd-kambaz-navigation"
        style={{ width: 120 }}
        className="list-group rounded-0 position-fixed top-0 bottom-0 d-none d-md-block bg-black z-2"
      >
        <a
          id="wd-neu-link"
          target="_blank"
          href="https://www.northeastern.edu/"
          className="list-group-item bg-black border-0 text-center"
          rel="noreferrer"
        >
          <img src="/images/NEU.png" width="75px" alt="NEU Logo" />
        </a>
        <br />

        <Link
          to="/Kambaz/Account"
          id="wd-account-link"
          className="list-group-item text-center border-0 bg-black text-white"
        >
          <FaRegCircleUser className="fs-1 text-white" />
          <br />
          Account
        </Link>
        <br />

        <Link
          to="/Kambaz/Dashboard"
          id="wd-dashboard-link"
          className="list-group-item text-center border-0 bg-white text-danger"
        >
          <AiOutlineDashboard className="fs-1 text-danger" />
          <br />
          Dashboard
        </Link>
        <br />

        <Link
          to="/Kambaz/Dashboard"
          id="wd-course-link"
          className="list-group-item text-center border-0 bg-black text-white"
        >
          <LiaBookSolid className="fs-1 text-danger" />
          <br />
          Courses
        </Link>
        <br />

        <Link
          to="/Kambaz/Calendar"
          id="wd-calendar-link"
          className="list-group-item text-center border-0 bg-black text-white"
        >
          <IoCalendarOutline className="fs-1 text-danger" />
          <br />
          Calendar
        </Link>
        <br />

        <Link
          to="/Kambaz/Inbox"
          id="wd-inbox-link"
          className="list-group-item text-center border-0 bg-black text-white"
        >
          <FaInbox className="fs-1 text-danger" />
          <br />
          Inbox
        </Link>
        <br />

        <Link
          to="/Labs"
          id="wd-labs-link"
          className="list-group-item text-center border-0 bg-black text-white"
        >
          <LiaCogSolid className="fs-1 text-danger" />
          <br />
          Labs
        </Link>
      </div>

      <div className="d-md-none">
        <nav className="navbar navbar-dark bg-black fixed-top">
          <div className="container-fluid">
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#kambazNavCollapse"
              aria-controls="kambazNavCollapse"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <FaHome />
            </button>

            <button
              className="navbar-toggler ms-auto shadow-none"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#courseNavigation"
              aria-controls="courseNavigation"
              aria-expanded="false"
            >

              <FaBars />
            </button>
          </div>
        </nav>

        <div className="collapse" id="kambazNavCollapse">
          <div className="card card-body bg-black mt-5">
            <div
              id="wd-kambaz-navigation-collapse"
              className="list-group rounded-0 bg-black"
            >
              <a
                id="wd-neu-link"
                target="_blank"
                href="https://www.northeastern.edu/"
                className="list-group-item bg-black border-0 text-center"
                rel="noreferrer"
              >
                <img src="/images/NEU.png" width="75px" alt="NEU Logo" />
              </a>
              <br />

              <Link
                to="/Kambaz/Account"
                id="wd-account-link"
                className="list-group-item text-center border-0 bg-black text-white"
              >
                <FaRegCircleUser className="fs-1 text-white" /> Account
              </Link>
              <br />

              <Link
                to="/Kambaz/Dashboard"
                id="wd-dashboard-link"
                className="list-group-item text-center border-0 bg-white text-danger"
              >
                <AiOutlineDashboard className="fs-1 text-danger" />
                {" Dashboard"}
              </Link>
              <br />

              <Link
                to="/Kambaz/Dashboard"
                id="wd-course-link"
                className="list-group-item text-center border-0 bg-black text-white"
              >
                <LiaBookSolid className="fs-1 text-danger" /> Courses
              </Link>
              <br />

              <Link
                to="/Kambaz/Calendar"
                id="wd-calendar-link"
                className="list-group-item text-center border-0 bg-black text-white"
              >
                <IoCalendarOutline className="fs-1 text-danger" /> Calendar
              </Link>
              <br />

              <Link
                to="/Kambaz/Inbox"
                id="wd-inbox-link"
                className="list-group-item text-center border-0 bg-black text-white"
              >
                <FaInbox className="fs-1 text-danger" /> Inbox
              </Link>
              <br />

              <Link
                to="/Labs"
                id="wd-labs-link"
                className="list-group-item text-center border-0 bg-black text-white"
              >
                <LiaCogSolid className="fs-1 text-danger" /> Labs
              </Link>
            </div>
          </div>
        </div>
        <div
          className="collapse d-md-none wd-main-content-offset-top"
          id="courseNavigation"
        >
          <div className="card card-body">
            <CourseNavigation />
          </div>
          <br />
        </div>
      </div>
    </>
  );
}
