import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, Form, Button } from "react-bootstrap";

export default function QuizDetails() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const quiz = quizzes.find((q: any) => q._id === qid);
  const isModerator =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  if (!quiz) return <div>Quiz not found.</div>;

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="p-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

      {isModerator && (
        <>
          <Form.Group className="mb-3">
            <Form.Label>Quiz Type</Form.Label>
            <Form.Control value={quiz.quizType} disabled readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control value={quiz.points} disabled readOnly />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Control value={quiz.assignmentGroup} disabled readOnly />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={quiz.shuffleAnswers}
              disabled
            />
            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              disabled
            />
            {quiz.multipleAttempts && (
              <Form.Control
                className="mt-2"
                value={`Max Attempts: ${quiz.maxAttempts}`}
                disabled
                readOnly
              />
            )}
            <Form.Check
              type="checkbox"
              label="Show Correct Answers"
              checked={quiz.showCorrectAnswers}
              disabled
            />
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              disabled
            />
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={quiz.webcamRequired}
              disabled
            />
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              disabled
            />
          </Form.Group>

          {quiz.accessCode && (
            <Form.Group className="mb-3">
              <Form.Label>Access Code</Form.Label>
              <Form.Control value={quiz.accessCode} disabled readOnly />
            </Form.Group>
          )}

          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              value={formatDate(quiz.availableDate)}
              disabled
              readOnly
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Until Date</Form.Label>
            <Form.Control
              value={formatDate(quiz.untilDate)}
              disabled
              readOnly
            />
          </Form.Group>
        </>
      )}

      <Form.Group className="mb-3">
        <Form.Label>Due Date</Form.Label>
        <Form.Control
          value={`${formatDate(quiz.dueDate)} at 11:59pm`}
          disabled
          readOnly
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Time Limit</Form.Label>
        <Form.Control value={`${quiz.timeLimit} minutes`} disabled readOnly />
      </Form.Group>

      {currentUser.role === "STUDENT" && (
        <div className="text-end">
          <Button variant="danger" onClick={() => navigate("take")}>
            Start Quiz
          </Button>
        </div>
      )}

      {isModerator && <div className="text-end"></div>}

      {isModerator && (
        <div className="text-end">
          <Button className="me-2" variant="secondary" onClick={() => navigate("edit")}>
            Edit
          </Button>

          <Button variant="danger" onClick={() => navigate("preview")}>
            Preview
          </Button>
        </div>
      )}
    </Card>
  );
}
