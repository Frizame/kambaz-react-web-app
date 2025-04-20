import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import QuestionEditor from "./Editor";
import {
  addQuestion,
  deleteQuestion as deleteQuestionAction,
  setQuestions,
} from "./reducer";
import * as quizzesClient from "../client";

export default function QuestionsListPage() {
  const { qid } = useParams();
  const dispatch = useDispatch();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const quizQuestions = questions.filter((q: any) => q.quizId === qid);

  const [editingQuestionId, setEditingQuestionId] = useState<string | null>(
    null
  );
  const [justAddedId, setJustAddedId] = useState<string | null>(null);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!qid) return;
      try {
        const data = await quizzesClient.fetchQuizById(qid);
        dispatch(setQuestions(data.questions));
      } catch (error) {
        console.error("Failed to load questions", error);
      }
    };
    loadQuestions();
  }, [qid, dispatch]);

  const handleNewQuestion = async () => {
    const newId = uuidv4();
    const question = {
      _id: newId,
      quizId: qid,
      title: "New Question",
      type: "multipleChoice",
      question: "Enter question details",
      choices: ["Answer A", "Answer B"],
      correctAnswer: ["0"],
      points: 1,
    };
    const newQuestion = await quizzesClient.addQuestionToQuiz(qid!, question);
    dispatch(addQuestion(newQuestion));
    setJustAddedId(newId);
  };

  const handleCancel = () => {
    if (justAddedId) {
      setEditingQuestionId(null);
      setJustAddedId(null);
    } else {
      setEditingQuestionId(null);
    }
  };

  const handleSave = () => {
    setEditingQuestionId(null);
    setJustAddedId(null);
  };

  const handleDelete = async (questionId: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this question?"
    );
    if (!confirmed) return;
    await quizzesClient.deleteQuestion(questionId);
    dispatch(deleteQuestionAction(questionId));
  };

  const totalPoints = quizQuestions.reduce(
    (sum: any, q: any) => sum + (q.points || 0),
    0
  );

  return (
    <div className="p-4">
      <div className="d-flex justify-content-end">
        <Button onClick={handleNewQuestion} variant="danger">
          + New Question
        </Button>
      </div>

      <div className="mb-3">
        <strong>Total Points:</strong> {totalPoints}
      </div>

      <div>
        {quizQuestions.map((q: any) => (
          <div key={q._id} className="mb-3">
            {editingQuestionId === q._id ? (
              <QuestionEditor
                questionId={q._id}
                editing={true}
                onCancel={handleCancel}
                onSave={handleSave}
              />
            ) : (
              <div>
                <QuestionEditor questionId={q._id} editing={false} />
                <div className="text-end mt-3">
                  <Button
                    variant="outline-secondary"
                    className="me-2"
                    onClick={() => setEditingQuestionId(q._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    onClick={() => handleDelete(q._id)}
                  >
                    Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
