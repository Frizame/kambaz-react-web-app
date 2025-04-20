import { useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";

export default function FillInTheBlankEditor({
  question,
  onUpdate,
  onSave,
  onCancel,
  editing = true,
}: any) {
  const [answers, setAnswers] = useState<string[]>(
    question.correctAnswer || [""]
  );

  const handleAnswerChange = (value: string, index: number) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
    onUpdate({ correctAnswer: updated });
  };

  const handleAddAnswer = () => {
    const updated = [...answers, ""];
    setAnswers(updated);
    onUpdate({ correctAnswer: updated });
  };

  const handleRemoveAnswer = (index: number) => {
    const updated = answers.filter((_, i) => i !== index);
    setAnswers(updated);
    onUpdate({ correctAnswer: updated });
  };

  const handleSave = () => {
    onUpdate({ correctAnswer: answers });
    onSave();
  };

  return (
    <div className="mt-4">
      <h5>Acceptable Answers</h5>
      {editing ? (
        <>
          {answers.map((ans, index) => (
            <Row key={index} className="mb-2">
              <Col>
                <Form.Control
                  value={ans}
                  onChange={(e) => handleAnswerChange(e.target.value, index)}
                  placeholder={`Answer ${index + 1}`}
                />
              </Col>
              <Col xs="auto">
                <Button
                  variant="outline-danger"
                  onClick={() => handleRemoveAnswer(index)}
                >
                  Remove
                </Button>
              </Col>
            </Row>
          ))}

          <Button variant="secondary" onClick={handleAddAnswer} className="mt-2">
            Add Answer
          </Button>

          <hr />
          <div className="text-end">
            <Button variant="secondary" className="me-2" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleSave}>
              Save
            </Button>
          </div>
        </>
      ) : (
        <ul>
          {answers.map((ans, index) => (
            <li key={index}>{ans}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
