import { Form } from "react-bootstrap";

export default function QuestionResponse({ question, response, setResponse }: any) {
  if (!question) return <div className="text-muted">Question not found.</div>;

  return (
    <div className="mb-4 p-3 border rounded">
      <h5>{question.title}</h5>
      <div className="mb-2 text-muted">{question.points} point{question.points !== 1 ? "s" : ""}</div>
      <div className="mb-2" dangerouslySetInnerHTML={{ __html: question.question }} />

      {question.type === "multipleChoice" && (
        <Form>
          {question.choices.map((choice: string, index: number) => (
            <Form.Check
              type="radio"
              name={question._id}
              key={index}
              label={choice}
              value={index.toString()}
              checked={response === index.toString()}
              onChange={(e) => setResponse(e.target.value)}
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
            checked={response === "true"}
            onChange={(e) => setResponse(e.target.value)}
            className="mb-2"
          />
          <Form.Check
            type="radio"
            name={question._id}
            label="False"
            value="false"
            checked={response === "false"}
            onChange={(e) => setResponse(e.target.value)}
            className="mb-2"
          />
        </Form>
      )}

      {question.type === "fillBlank" && (
        <Form>
          <Form.Control
            type="text"
            placeholder="Enter your answer"
            value={response}
            onChange={(e) => setResponse(e.target.value)}
          />
        </Form>
      )}
    </div>
  );
}
