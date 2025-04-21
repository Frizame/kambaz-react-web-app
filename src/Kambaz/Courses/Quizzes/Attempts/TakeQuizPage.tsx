import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Form } from "react-bootstrap";
import QuestionResponse from "./QuestionResponse";
import * as quizzesClient from "../client";
import { v4 as uuidv4 } from "uuid";
import QuizReview from "./QuizReview";

export default function TakeQuizPage() {
  const { qid } = useParams();
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const quiz = quizzes.find((q: any) => q._id === qid);
  const [quizQuestions, setQuizQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [lockedAnswers, setLockedAnswers] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [attempt, setAttempt] = useState<any | null>(null);
  const [accessCodeInput, setAccessCodeInput] = useState("");
  const [accessCodeValid, setAccessCodeValid] = useState(!quiz?.accessCode);
  const navigate = useNavigate();

  const isModerator =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  useEffect(() => {
    const loadQuestions = async () => {
      if (!qid) return;
      try {
        const data = await quizzesClient.fetchQuizById(qid);
        setQuizQuestions(data.questions);
        const initialAnswers = data.questions.map(() => "");
        setAnswers(initialAnswers);
        setLockedAnswers(initialAnswers.map(() => ""));
      } catch (err) {
        console.error("Failed to load quiz questions", err);
      }
    };

    loadQuestions();
  }, [qid]);

  const handleSetResponse = (response: string, index: number) => {
    const updated = [...answers];
    updated[index] = response;
    setAnswers(updated);

    if (quiz?.lockQuestionsAfterAnswering) {
      const newLocked = [...lockedAnswers];
      newLocked[index] = response;
      setLockedAnswers(newLocked);
    }
  };

  const handleNext = () => {
    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleSubmit = async () => {
    const score = quizQuestions.reduce((acc, q, i) => {
      const answer = answers[i];
      const correct = q.correctAnswer || [];
      const isCorrect = q.type === "fillBlank"
        ? correct.map((a: string) => a.toLowerCase().trim()).includes(answer.toLowerCase().trim())
        : correct.includes(answer);
      return acc + (isCorrect ? q.points : 0);
    }, 0);

    const newAttempt = {
      _id: uuidv4(),
      quizId: quiz._id,
      userId: currentUser._id,
      timestamp: new Date().toISOString(),
      answers,
      score,
    };

    if (!isModerator) {
      try {
        await quizzesClient.submitAttempt(quiz._id, newAttempt);
      } catch (err) {
        console.error("Failed to submit quiz attempt", err);
      }
    }

    setAttempt(newAttempt);
    setSubmitted(true);
  };

  if (submitted && attempt) {
    return <QuizReview attempt={attempt} />;
  }

  if (!accessCodeValid) {
    return (
      <div className="p-4">
        <h3>{quiz?.title}</h3>
        <p>This quiz requires an access code.</p>
        <Form.Control
          type="text"
          value={accessCodeInput}
          onChange={(e) => setAccessCodeInput(e.target.value)}
          placeholder="Enter Access Code"
          className="mb-3"
        />
        <Button
          variant="danger"
          onClick={() => {
            if (accessCodeInput === quiz?.accessCode) {
              setAccessCodeValid(true);
            } else {
              alert("Incorrect access code.");
            }
          }}
        >
          Start Quiz
        </Button>
      </div>
    );
  }

  return (
    <div className="p-4">
      <h3 className="mb-3">{quiz?.title}</h3>

      {quiz?.oneQuestionAtATime
        ? quizQuestions.length > 0 && (
            <QuestionResponse
              question={quizQuestions[currentIndex]}
              response={answers[currentIndex]}
              setResponse={(response: string) =>
                handleSetResponse(response, currentIndex)
              }
            />
          )
        : quizQuestions.map((q: any, index: number) => (
            <QuestionResponse
              key={q._id}
              question={q}
              response={answers[index]}
              setResponse={(response: string) =>
                handleSetResponse(response, index)
              }
            />
          ))}

      {quiz?.oneQuestionAtATime ? (
        <div className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={handleBack}
            disabled={currentIndex === 0 || quiz?.lockQuestionsAfterAnswering}
          >
            Back
          </Button>

          {currentIndex < quizQuestions.length - 1 ? (
            <div>
              <Button
                variant="danger"
                className="me-2"
                onClick={handleNext}
                disabled={
                  quiz?.lockQuestionsAfterAnswering &&
                  !lockedAnswers[currentIndex]
                }
              >
                Next
              </Button>
              {isModerator && <Button variant="secondary" onClick={() => navigate(`../Quizzes/${qid}`)}>Edit</Button>}
            </div>
          ) : (
            <div>
              <Button className="me-2" variant="danger" onClick={handleSubmit}>
                Submit Quiz
              </Button>

              {isModerator && <Button variant="secondary" onClick={() => navigate(`../Quizzes/${qid}`)}>Edit</Button>}
            </div>
          )}
        </div>
      ) : (
        <div className="text-end">
          <Button className="me-2" variant="danger" onClick={handleSubmit}>
            Submit Quiz
          </Button>
          {isModerator && <Button variant="secondary">Edit</Button>}
        </div>
      )}
    </div>
  );
}
