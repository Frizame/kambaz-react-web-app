import { Routes, Route, Navigate } from "react-router";
import Account from "./Account";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import "./style.css";

// Bootstrap imports for collapsed menus
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import KambazNavigationWithCourses from "./NavigationCourses";

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <Routes>
        <Route path="/Courses/:cid/*" element={<KambazNavigationWithCourses />}></Route>
        <Route path="/*" element={<KambazNavigation />}></Route>
      </Routes>

      <div className="wd-main-content-offset-left wd-main-content-offset-top p-3">
        <Routes>
          <Route path="/" element={<Navigate to="Account" />} />
          <Route path="/Account/*" element={<Account />} />
          <Route path="/Dashboard" element={<Dashboard />} />
          <Route path="/Courses/:cid/*" element={<Courses />} />
          <Route path="/Calendar" element={<h1>Calendar</h1>} />
          <Route path="/Inbox" element={<h1>Inbox</h1>} />
        </Routes>
      </div>
    </div>
  );
}
