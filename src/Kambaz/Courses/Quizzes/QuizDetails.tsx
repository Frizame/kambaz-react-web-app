import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import { updateQuiz } from "./reducer";
import * as quizzesClient from "./client";

export default function QuizDetails({
  quiz,
  setQuiz,
}: {
  quiz: any;
  setQuiz: (q: any) => void;
}) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isModerator =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  const [editing, setEditing] = useState(false);
  const [localQuiz, setLocalQuiz] = useState({ ...quiz });

  useEffect(() => {
    setLocalQuiz({ ...quiz });
  }, [quiz]);

  if (!quiz) return <div>Quiz not found.</div>;

  const handleUpdate = async () => {
    const updatedQuiz = await quizzesClient.updateQuiz(localQuiz);
    dispatch(updateQuiz(updatedQuiz));
    setQuiz(updatedQuiz);
    setEditing(false);
  };

  const handleCancel = () => {
    setLocalQuiz({ ...quiz });
    setEditing(false);
  };

  const updateField = (key: string, value: any) => {
    setLocalQuiz({ ...localQuiz, [key]: value });
  };

  return (
    <div className="mt-3 ms-3 me-3">
      <h2>
        {editing ? (
          <Form.Control
            type="text"
            value={localQuiz.title}
            onChange={(e) => updateField("title", e.target.value)}
          />
        ) : (
          quiz.title
        )}
      </h2>
      {editing ? (
        <Form.Control
          as="textarea"
          rows={3}
          value={localQuiz.description}
          onChange={(e) => updateField("description", e.target.value)}
        />
      ) : (
        <p>{quiz.description}</p>
      )}

      {isModerator && (
        <>
          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Quiz Type</Form.Label>
                <Form.Select
                  value={localQuiz.quizType}
                  disabled={!editing}
                  onChange={(e) => updateField("quizType", e.target.value)}
                >
                  <option value="graded">Graded Quiz</option>
                  <option value="practice">Practice Quiz</option>
                  <option value="gradedSurvey">Graded Survey</option>
                  <option value="ungradedSurvey">Ungraded Survey</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Assignment Group</Form.Label>
                <Form.Select
                  value={localQuiz.assignmentGroup}
                  disabled={!editing}
                  onChange={(e) => updateField("assignmentGroup", e.target.value)}
                >
                  <option value="Quizzes">Quizzes</option>
                  <option value="Exams">Exams</option>
                  <option value="Assignments">Assignments</option>
                  <option value="Project">Project</option>
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Due Date</Form.Label>
                <Form.Control
                  type="date"
                  value={localQuiz.dueDate?.split("T")[0]}
                  disabled={!editing}
                  onChange={(e) => updateField("dueDate", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Available From</Form.Label>
                <Form.Control
                  type="date"
                  value={localQuiz.availableDate?.split("T")[0]}
                  disabled={!editing}
                  onChange={(e) => updateField("availableDate", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={localQuiz.untilDate?.split("T")[0]}
                  disabled={!editing}
                  onChange={(e) => updateField("untilDate", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Time Limit (min)</Form.Label>
                <Form.Control
                  type="number"
                  value={localQuiz.timeLimit}
                  disabled={!editing}
                  onChange={(e) => updateField("timeLimit", +e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              type="checkbox"
              label="Shuffle Answers"
              checked={localQuiz.shuffleAnswers}
              disabled={!editing}
              onChange={(e) => updateField("shuffleAnswers", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Multiple Attempts"
              checked={localQuiz.multipleAttempts}
              disabled={!editing}
              onChange={(e) => updateField("multipleAttempts", e.target.checked)}
            />
            {localQuiz.multipleAttempts && (
              <Form.Group className="mt-2 mb-2">
                <Form.Label>Max Attempts</Form.Label>
                <Form.Control
                  type="number"
                  value={localQuiz.maxAttempts}
                  disabled={!editing}
                  onChange={(e) => updateField("maxAttempts", +e.target.value)}
                />
              </Form.Group>
            )}
            <Form.Check
              type="checkbox"
              label="Show Correct Answers"
              checked={localQuiz.showCorrectAnswers}
              disabled={!editing}
              onChange={(e) => updateField("showCorrectAnswers", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="One Question at a Time"
              checked={localQuiz.oneQuestionAtATime}
              disabled={!editing}
              onChange={(e) => updateField("oneQuestionAtATime", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Webcam Required"
              checked={localQuiz.webcamRequired}
              disabled={!editing}
              onChange={(e) => updateField("webcamRequired", e.target.checked)}
            />
            <Form.Check
              type="checkbox"
              label="Lock Questions After Answering"
              checked={localQuiz.lockQuestionsAfterAnswering}
              disabled={!editing}
              onChange={(e) =>
                updateField("lockQuestionsAfterAnswering", e.target.checked)
              }
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Access Code</Form.Label>
            <Form.Control
              type="text"
              value={localQuiz.accessCode}
              disabled={!editing}
              onChange={(e) => updateField("accessCode", e.target.value)}
            />
          </Form.Group>
        </>
      )}

      {currentUser.role === "STUDENT" && (
        <div className="text-end">
          <Button variant="danger" onClick={() => navigate("take")}>Start Quiz</Button>
        </div>
      )}

      {isModerator && (
        <div className="text-end">
          {editing ? (
            <>
              <Button variant="danger" onClick={handleUpdate} className="me-2">
                Save
              </Button>
              <Button
                variant="secondary"
                onClick={handleCancel}
                className="me-2"
              >
                Cancel
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="danger"
                onClick={() => setEditing(true)}
                className="me-2"
              >
                Edit
              </Button>
              <Button
                variant="secondary"
                onClick={() => navigate("preview")}
              >
                Preview
              </Button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
