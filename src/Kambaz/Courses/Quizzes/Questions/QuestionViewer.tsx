import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function QuestionViewer({ response, setResponse }: any) {
  const { questionId } = useParams();
  const navigate = useNavigate();
  const { questions } = useSelector((state: any) => state.questionsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const question = questions.find((q: any) => q._id === questionId);

  const [input, setInput] = useState(response || "");

  useEffect(() => {
    setResponse(input);
  }, [input]);

  if (!question) return <div className="text-muted">Question not found.</div>;

  const isModerator = currentUser?.role === "FACULTY" || currentUser?.role === "ADMIN";

  return (
    <div className="mb-4 p-3 border rounded">
      <h5>{question.title}</h5>
      <div className="mb-2 text-muted">{question.points} point{question.points !== 1 ? "s" : ""}</div>
      <p>{question.question}</p>

      {question.type === "multipleChoice" && (
        <Form>
          {question.choices.map((choice: string, index: number) => (
            <Form.Check
              type="radio"
              name={question._id}
              key={index}
              label={choice}
              value={index.toString()}
              checked={input === index.toString()}
              onChange={(e) => setInput(e.target.value)}
              className="mb-2"
            />
          ))}
        </Form>
      )}

      {question.type === "trueFalse" && (
        <Form>
          <Form.Check
            type="radio"
            name={question._id}
            label="True"
            value="true"
            checked={input === "true"}
            onChange={(e) => setInput(e.target.value)}
            className="mb-2"
          />
          <Form.Check
            type="radio"
            name={question._id}
            label="False"
            value="false"
            checked={input === "false"}
            onChange={(e) => setInput(e.target.value)}
            className="mb-2"
          />
        </Form>
      )}

      {question.type === "fillBlank" && (
        <Form>
          <Form.Control
            type="text"
            placeholder="Enter your answer"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </Form>
      )}

      {isModerator && (
        <div className="text-end mt-3">
          <Button variant="outline-secondary" onClick={() => navigate('edit')}>
            Edit
          </Button>
        </div>
      )}
    </div>
  );
}
