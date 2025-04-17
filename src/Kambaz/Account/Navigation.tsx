import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  const { pathname } = useLocation();
  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((val: string) => (
        <>
          <Link
            to={`/Kambaz/Account/` + val}
            className={`list-group-item ${active(val)} border border-0`}
          >
            {" "}
            {val}{" "}
          </Link>{" "}
          <br />
        </>
      ))}
      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to={`/Kambaz/Account/Users`}
          className={`list-group-item ${active("Users")} border border-0`}
        >
          {" "}
          Users{" "}
        </Link>
      )}
    </div>
  );
}
