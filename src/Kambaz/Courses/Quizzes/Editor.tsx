import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addQuiz, updateQuiz } from "./reducer";
import * as quizzesClient from "./client";
import { v4 as uuidv4 } from "uuid";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const [quiz, setQuiz] = useState<any>({});
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    } else {
      setIsNew(true);
      setQuiz({
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
    }
  }, []);

  const goBack = () => {
    navigate(`/Kambaz/Courses/${quiz?.courseId}/Quizzes`);
  };

  const add = async () => {
    try {
      const newQuiz = { ...quiz, _id: uuidv4() };
      const created = await quizzesClient.createQuiz(newQuiz);
      dispatch(addQuiz(created));
      goBack();
    } catch (err) {
      console.error("Failed to add quiz:", err);
    }
  };

  const update = async () => {
    try {
      const updatedQuiz = await quizzesClient.updateQuiz(quiz);
      dispatch(updateQuiz(updatedQuiz));
      navigate(`/Kambaz/Courses/${quiz?.courseId}/Quizzes/${qid}`);
    } catch (err) {
      console.error("Failed to update quiz:", err);
    }
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Quiz Title</Form.Label>
        <Form.Control
          type="text"
          value={quiz.title}
          onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Control
          as="textarea"
          rows={3}
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e.target.value })}
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={quiz.points}
              onChange={(e) => setQuiz({ ...quiz, points: +e.target.value })}
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select
              value={quiz.assignmentGroup}
              onChange={(e) => setQuiz({ ...quiz, assignmentGroup: e.target.value })}
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
              value={quiz.dueDate}
              onChange={(e) => setQuiz({ ...quiz, dueDate: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={quiz.availableDate}
              onChange={(e) => setQuiz({ ...quiz, availableDate: e.target.value })}
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
              value={quiz.untilDate}
              onChange={(e) => setQuiz({ ...quiz, untilDate: e.target.value })}
            />
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3">
            <Form.Label>Time Limit (min)</Form.Label>
            <Form.Control
              type="number"
              value={quiz.timeLimit}
              onChange={(e) => setQuiz({ ...quiz, timeLimit: +e.target.value })}
            />
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Check
          type="checkbox"
          label="Shuffle Answers"
          checked={quiz.shuffleAnswers}
          onChange={(e) => setQuiz({ ...quiz, shuffleAnswers: e.target.checked })}
        />
        <Form.Check
          type="checkbox"
          label="Multiple Attempts"
          checked={quiz.multipleAttempts}
          onChange={(e) => setQuiz({ ...quiz, multipleAttempts: e.target.checked })}
        />
        {quiz.multipleAttempts && (
          <Form.Group className="mt-2">
            <Form.Label>Max Attempts</Form.Label>
            <Form.Control
              type="number"
              value={quiz.maxAttempts}
              onChange={(e) => setQuiz({ ...quiz, maxAttempts: +e.target.value })}
            />
          </Form.Group>
        )}
        <Form.Check
          type="checkbox"
          label="Show Correct Answers"
          checked={quiz.showCorrectAnswers}
          onChange={(e) => setQuiz({ ...quiz, showCorrectAnswers: e.target.checked })}
        />
        <Form.Check
          type="checkbox"
          label="One Question at a Time"
          checked={quiz.oneQuestionAtATime}
          onChange={(e) => setQuiz({ ...quiz, oneQuestionAtATime: e.target.checked })}
        />
        <Form.Check
          type="checkbox"
          label="Webcam Required"
          checked={quiz.webcamRequired}
          onChange={(e) => setQuiz({ ...quiz, webcamRequired: e.target.checked })}
        />
        <Form.Check
          type="checkbox"
          label="Lock Questions After Answering"
          checked={quiz.lockQuestionsAfterAnswering}
          onChange={(e) => setQuiz({ ...quiz, lockQuestionsAfterAnswering: e.target.checked })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Access Code</Form.Label>
        <Form.Control
          type="text"
          value={quiz.accessCode}
          onChange={(e) => setQuiz({ ...quiz, accessCode: e.target.value })}
        />
      </Form.Group>

      <hr />
      <div className="text-end">
        <Button onClick={goBack} className="btn btn-secondary me-2">
          Cancel
        </Button>
        <Button className="btn btn-danger" onClick={isNew ? add : update}>
          Save
        </Button>
      </div>
    </Form>
  );
}