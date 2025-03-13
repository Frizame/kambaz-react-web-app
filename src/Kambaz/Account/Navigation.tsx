import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const links = currentUser ? ["Profile"] : ["Signin", "Signup"];
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((val: string) => (
        <>
          <Link
            to={`/Kambaz/Account/` + val}
            className="list-group-item active border border-0"
          >
            {" "}
            {val}{" "}
          </Link>{" "}
          <br />
        </>
      ))}
    </div>
  );
}
