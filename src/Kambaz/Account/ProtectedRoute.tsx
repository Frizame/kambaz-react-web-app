import { useSelector } from "react-redux";
import { Navigate, useLocation, useParams } from "react-router-dom";
export default function ProtectedRoute({ children }: { children: any }) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);
  const pathname = useLocation().pathname;
  const { cid } = useParams();

  if (currentUser) {
    if ((currentUser.role === "STUDENT" || currentUser.role === "FACULTY") && pathname.includes("Course")) {
      if (
        enrollments.some(
          (enrollment: any) =>
            enrollment.user === currentUser._id && enrollment.course === cid
        )
      ) {
        return children;
      } else {
        return <Navigate to="/Kambaz/Dashboard" />;
      }
    }
    return children;
  } else {
    return <Navigate to="/Kambaz/Account/Signin" />;
  }
}
