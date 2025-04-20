import { useEffect, useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";

export default function MultipleChoiceEditor({ question, onUpdate, onSave, onCancel, editing = true }: any) {
  const [choices, setChoices] = useState(question.choices || ["", ""]);
  const [correctIndex, setCorrectIndex] = useState(
    question.correctAnswer.length > 0 ? parseInt(question.correctAnswer[0]) : 0
  );

  useEffect(() => {
    onUpdate({ correctAnswer: [correctIndex.toString()] });
  }, [correctIndex]);

  const handleChoiceChange = (value: string, index: number) => {
    const updated = [...choices];
    updated[index] = value;
    setChoices(updated);
    onUpdate({ choices: updated });
  };

  const handleAddChoice = () => {
    const updated = [...choices, ""];
    setChoices(updated);
    onUpdate({ choices: updated });
  };

  const handleRemoveChoice = (index: number) => {
    const updated = choices.filter((_: any, i: any) => i !== index);
    setChoices(updated);
    onUpdate({ choices: updated });
    if (correctIndex === index) {
      setCorrectIndex(0);
    }
  };

  return (
    <div className="mt-4">
      <h5>Choices</h5>
      {editing ? (
        <>
          {choices.map((choice: string, index: number) => (
            <Row key={index} className="align-items-center mb-2">
              <Col xs={1}>
                <Form.Check
                  type="radio"
                  name="correct"
                  checked={correctIndex === index}
                  onChange={() => setCorrectIndex(index)}
                />
              </Col>
              <Col>
                <Form.Control
                  value={choice}
                  onChange={(e) => handleChoiceChange(e.target.value, index)}
                  placeholder={`Choice ${index + 1}`}
                />
              </Col>
              <Col xs="auto">
                <Button variant="outline-danger" onClick={() => handleRemoveChoice(index)}>
                  Remove
                </Button>
              </Col>
            </Row>
          ))}
          <Button variant="secondary" onClick={handleAddChoice} className="mt-2">
            Add Choice
          </Button>

          <hr />
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
        <ul>
          {choices.map((choice: string, index: number) => (
            <li key={index}>
              {index === correctIndex ? <strong>{choice}</strong> : choice}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
