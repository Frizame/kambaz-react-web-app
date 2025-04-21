import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import Home from "./Home";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as client from "./client";
import Quizzes from "./Quizzes";
import QuizView from "./Quizzes/QuizView";
import TakeQuizPage from "./Quizzes/Attempts/TakeQuizPage";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [users, setUsers] = useState<any>([]);

  const fetchUsers = async () => {
    if (cid === undefined)
    {
      console.error("Missing course ID in params");
      return;
    }
    setUsers(await client.findUsersForCourse(cid));
  };
  useEffect(() => {
    fetchUsers();
  }, [cid]);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>

        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid" element={<QuizView users={users}/>} />
            <Route path="Quizzes/:qid/edit" element={<QuizView users={users}/>} />
            <Route path="Quizzes/:qid/take" element={<TakeQuizPage />} />
            <Route path="People" element={<PeopleTable users={users}/>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
