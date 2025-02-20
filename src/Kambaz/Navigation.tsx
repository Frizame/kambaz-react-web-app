import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaBars, FaInbox, FaRegCircleUser } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { ListGroup } from "react-bootstrap";
import { FaHome } from "react-icons/fa";
import CourseNavigation from "./Courses/Navigation";
export default function KambazNavigation() {
  const { pathname } = useLocation();
  const links = [
    { label: "Dashboard", path: "/Kambaz/Dashboard", icon: AiOutlineDashboard },
    { label: "Courses", path: "/Kambaz/Dashboard", icon: LiaBookSolid },
    { label: "Calendar", path: "/Kambaz/Calendar", icon: IoCalendarOutline },
    { label: "Inbox", path: "/Kambaz/Inbox", icon: FaInbox },
    { label: "Labs", path: "/Labs", icon: LiaCogSolid },
  ];

  const navigation = (
    <>
      <ListGroup.Item
        id="wd-neu-link"
        target="_blank"
        href="https://www.northeastern.edu/"
        action
        className="bg-black border-0 text-center"
      >
        <img src="/images/NEU.png" width="75px" />
      </ListGroup.Item>
      <ListGroup.Item
        as={Link}
        to="/Kambaz/Account"
        className={`text-center border-0 bg-black
            ${
              pathname.includes("Account")
                ? "bg-white text-danger"
                : "bg-black text-white"
            }`}
      >
        <FaRegCircleUser
          className={`fs-1 ${
            pathname.includes("Account") ? "text-danger" : "text-white"
          }`}
        />
        <br />
        Account
      </ListGroup.Item>

      {links.map((link) => (
        <ListGroup.Item
          key={link.path}
          as={Link}
          to={link.path}
          className={`bg-black text-center border-0
              ${
                pathname.includes(link.label)
                  ? "text-danger bg-white"
                  : "text-white bg-black"
              }`}
        >
          {link.icon({ className: "fs-1 text-danger" })}
          <br />
          {link.label}
        </ListGroup.Item>
      ))}
    </>
  );

  const leftBarNavigation = (
    <div className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      <ListGroup
        id="wd-kambaz-navigation"
        style={{ width: 120 }}
        className="rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2"
      >
        {navigation}
      </ListGroup>
    </div>
  );

  const navBarNavigation = (
    <div className="collapse" id="kambazNavCollapse">
      <div className="card card-body bg-black mt-5">
        <div
          id="wd-kambaz-navigation-collapse"
          className="list-group rounded-0 bg-black"
        >
          {navigation}
        </div>
      </div>
    </div>
  );

  const courseNavigation = (
    <div
      className="collapse d-md-none wd-main-content-offset-top"
      id="courseNavigation"
    >
      <div className="card card-body">
        <CourseNavigation />
      </div>
      <br />
    </div>
  );

  const viewingCourse = pathname.includes('/Courses');

  return (
    <div>
      <nav className="d-md-none navbar navbar-dark bg-black fixed-top">
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

          {viewingCourse && (
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
          )}
        </div>
      </nav>

      {leftBarNavigation}
      {navBarNavigation}
      {viewingCourse && courseNavigation}
    </div>
  );
}
