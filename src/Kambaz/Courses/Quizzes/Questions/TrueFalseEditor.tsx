import { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";

export default function TrueFalseEditor({ question, onUpdate, onSave, onCancel, editing = true }: any) {
  const [answer, setAnswer] = useState(
    question.correctAnswer.length > 0 ? question.correctAnswer[0] === "true" : true
  );

  useEffect(() => {
    onUpdate({ correctAnswer: [answer ? "true" : "false"] });
  }, [answer]);

  return (
    <div className="mt-4">
      <h5>Select the correct answer</h5>
      {editing ? (
        <>
          <Form.Check
            type="radio"
            name="tf"
            label="True"
            checked={answer === true}
            onChange={() => setAnswer(true)}
            className="mb-2"
          />
          <Form.Check
            type="radio"
            name="tf"
            label="False"
            checked={answer === false}
            onChange={() => setAnswer(false)}
            className="mb-4"
          />

          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={onSave}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <div>
          Correct Answer: <strong>{answer ? "True" : "False"}</strong>
        </div>
      )}
    </div>
  );
}
