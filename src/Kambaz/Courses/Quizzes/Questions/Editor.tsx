import { useEffect, useState } from "react";
import { Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import MultipleChoiceEditor from "./MultipleChoiceEditor.tsx";
import TrueFalseEditor from "./TrueFalseEditor.tsx";
import FillInTheBlankEditor from "./FillInTheBlankEditor.tsx";
import { updateQuestion } from "./reducer";
import * as quizzesClient from "../client";

export default function QuestionEditor({ questionId, editing = true, onCancel, onSave }: { questionId?: string; editing?: boolean; onCancel?: () => void; onSave?: () => void }) {
  const dispatch = useDispatch();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const existing = questions.find((q: any) => q._id === questionId);

  const [question, setQuestion] = useState(existing);

  useEffect(() => {
    if (existing) setQuestion(existing);
  }, [existing]);

  const handleUpdate = (updates: any) => {
    setQuestion({ ...question, ...updates });
  };

  const handleSave = async () => {
    try {
      await quizzesClient.updateQuestion(question);
      dispatch(updateQuestion(question));
      onSave?.();
    } catch (err) {
      console.error("Failed to save question", err);
    }
  };

  const questionTypes = [
    { value: "multipleChoice", label: "Multiple Choice" },
    { value: "trueFalse", label: "True / False" },
    { value: "fillBlank", label: "Fill in the Blank" },
  ];

  return (
    <div className="border p-4 rounded">
      <Form.Group className="mb-3">
        <b>Title</b>
        {editing ? (
          <Form.Control
            type="text"
            value={question.title}
            onChange={(e) => setQuestion({ ...question, title: e.target.value })}
          />
        ) : (
          <div>{question.title}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <b>Body</b>
        {editing ? (
          <Form.Control
            as="textarea"
            rows={4}
            value={question.question}
            onChange={(e) => setQuestion({ ...question, question: e.target.value })}
          />
        ) : (
          <div>{question.question}</div>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <b>Points</b>
        {editing ? (
          <Form.Control
            type="number"
            value={question.points}
            onChange={(e) => setQuestion({ ...question, points: +e.target.value })}
          />
        ) : (
          <div>{question.points}</div>
        )}
      </Form.Group>

      {editing && (
        <Form.Group className="mb-3">
          <b>Question Type</b>
          <Form.Select
            value={question.type}
            onChange={(e) => setQuestion({ ...question, type: e.target.value })}
          >
            {questionTypes.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      )}

      {question.type === "multipleChoice" && (
        <MultipleChoiceEditor
          question={question}
          onUpdate={handleUpdate}
          onCancel={onCancel}
          onSave={handleSave}
          editing={editing}
        />
      )}

      {question.type === "trueFalse" && (
        <TrueFalseEditor
          question={question}
          onUpdate={handleUpdate}
          onCancel={onCancel}
          onSave={handleSave}
          editing={editing}
        />
      )}

      {question.type === "fillBlank" && (
        <FillInTheBlankEditor
          question={question}
          onUpdate={handleUpdate}
          onCancel={onCancel}
          onSave={handleSave}
          editing={editing}
        />
      )}
    </div>
  );
}
