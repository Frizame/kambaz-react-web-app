import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import * as quizzesClient from "../client";
import { useSelector } from "react-redux";

export default function QuizReview({ attempt: propAttempt }: { attempt?: any }) {
  const { qid } = useParams();
  const [attempt, setAttempt] = useState<any>(propAttempt || null);
  const [quiz, setQuiz] = useState<any>(null);
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isModerator =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  useEffect(() => {
    const loadData = async () => {
      if (!qid || propAttempt) return;
      try {
        const [quizData, attemptData] = await Promise.all([
          quizzesClient.fetchQuizById(qid),
          quizzesClient.getLastAttempt(qid, currentUser._id)
        ]);
        setQuiz(quizData);
        setAttempt(attemptData);
      } catch (err) {
        console.error("Error loading review data", err);
      }
    };
    loadData();
  }, [qid, propAttempt]);

  useEffect(() => {
    if (propAttempt) {
      quizzesClient.fetchQuizById(propAttempt.quizId).then(setQuiz);
    }
  }, [propAttempt]);

  if (!attempt || !quiz) return <div className="p-4">You must take the quiz to view your last attempt!</div>;

  const isCorrect = (question: any, answer: string) => {
    if (question.type === "multipleChoice" || question.type === "trueFalse") {
      return question.correctAnswer.includes(answer);
    } else if (question.type === "fillBlank") {
      return question.correctAnswer.some((correct: string) =>
        correct.trim().toLowerCase() === answer.trim().toLowerCase()
      );
    }
    return false;
  };

  return (
    <div className="p-4">
      <h2 className="mb-4">{quiz.title}</h2>
      <div className="mb-3">
        <strong>Score:</strong> {attempt.score}
      </div>

      {quiz.questions.map((q: any, index: number) => {
        let userAnswer = attempt.answers[index];
        const correct = isCorrect(q, userAnswer);
        if (q.type === "multipleChoice") {
          userAnswer = q.choices[userAnswer as number];
        }
        return (
          <Card key={q._id} className="mb-3 p-3">
            <h5>{q.title}</h5>
            <div dangerouslySetInnerHTML={{ __html: q.question }} />
            <div>
              <strong>Your Answer:</strong> {userAnswer || "No answer"}
            </div>

            {quiz.showCorrectAnswers && (
              <>
                <div
                  className={`mt-2 ${correct ? "text-success" : "text-danger"}`}
                >
                  {correct ? "Correct" : "Incorrect"}
                </div>
                {!correct && (
                  <div className="mt-2">
                    <strong>Correct Answer:</strong>{" "}
                    {q.type === "multipleChoice"
                      ? q.correctAnswer.map((i: string) => q.choices[i])
                      : q.type === "trueFalse"
                      ? q.correctAnswer[0]
                      : q.correctAnswer.join(", ")}
                  </div>
                )}
              </>
            )}
            
          </Card>
        );
      })}
      {isModerator && <Button variant="secondary" className="float-end" onClick={() => navigate(`../Quizzes/${qid}`)}>Edit</Button>}
    </div>
  );
}
