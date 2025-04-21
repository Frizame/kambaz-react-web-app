import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Nav } from "react-bootstrap";
import QuestionsListPage from "./Questions/QuestionsListPage";
import QuizDetails from "./QuizDetails";
import * as quizzesClient from "./client";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz } from "./reducer";
import QuizReview from "./Attempts/QuizReview";
import StudentGrades from "./Attempts/StudentGrades";

export default function QuizView({users} : {users: any}) {
  const { qid, cid } = useParams();
  const pathname = useLocation().pathname;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isModerator =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  const [activeTab, setActiveTab] = useState("details");
  const [quiz, setQuiz] = useState<any>(null);
  const [isNew, setIsNew] = useState(false);

  const formatInputDate = (date: Date | number | string) =>
    new Date(date).toISOString().split("T")[0];

  useEffect(() => {
    const foundQuiz = quizzes.find((quiz: any) => quiz._id === qid);
    if (foundQuiz) {
      setQuiz({
        ...foundQuiz,
        dueDate: formatInputDate(foundQuiz.dueDate),
        availableDate: formatInputDate(foundQuiz.availableDate),
        untilDate: formatInputDate(foundQuiz.untilDate),
      });
    } else if (isModerator) {
      setIsNew(true);
      setQuiz({
        _id: qid,
        title: "New Quiz",
        courseId: cid,
        createdBy: currentUser?._id,
        description: "Enter description...",
        points: 100,
        assignmentGroup: "Quizzes",
        quizType: "graded",
        shuffleAnswers: true,
        timeLimit: 20,
        multipleAttempts: false,
        maxAttempts: 1,
        showCorrectAnswers: false,
        accessCode: "",
        oneQuestionAtATime: true,
        webcamRequired: false,
        lockQuestionsAfterAnswering: false,
        dueDate: formatInputDate(Date.now()),
        availableDate: formatInputDate(Date.now()),
        untilDate: formatInputDate(Date.now()),
      });
    } else {
      navigate(-1);
    }
  }, []);

  useEffect(() => {
    if (quiz === null || quiz._id === undefined || !isNew) {
      return;
    }
    add();
  }, [quiz]);

  const add = async () => {
    try {
      const created = await quizzesClient.createQuiz(quiz);
      dispatch(addQuiz(created));
      setIsNew(false);
    } catch (err) {
      console.error("Failed to add quiz:", err);
    }
  };

  return (
    <div className="p-4">
      <Nav
        variant="tabs"
        activeKey={activeTab}
        onSelect={(k) => setActiveTab(k!)}
      >
        <Nav.Item>
          <Nav.Link className="text-danger" eventKey="details">
            Details
          </Nav.Link>
        </Nav.Item>
        {isModerator && (
          <Nav.Item>
            <Nav.Link className="text-danger" eventKey="questions">
              Questions
            </Nav.Link>
          </Nav.Item>
        )}
        {isModerator && (
          <Nav.Item>
            <Nav.Link className="text-danger" eventKey="grades">
              Scores
            </Nav.Link>
          </Nav.Item>
        )}

        {!isModerator && (
          <Nav.Item>
            <Nav.Link className="text-danger" eventKey="lastAttempt">
              Last Attempt
            </Nav.Link>
          </Nav.Item>
        )}
      </Nav>

      {quiz && activeTab === "details" && (
        <QuizDetails
          quiz={quiz}
          setQuiz={setQuiz}
          edit={pathname.includes("edit")}
        />
      )}

      {activeTab === "questions" && isModerator && <QuestionsListPage />}

      {activeTab === "grades" && isModerator && (
        <div className="mt-3 ms-3">
          <StudentGrades users={users} quizId={qid!}/>
        </div>
      )}

      {activeTab === "lastAttempt" && (
        <div className="mt-3 ms-3">
          <QuizReview />
        </div>
      )}
    </div>
  );
}
