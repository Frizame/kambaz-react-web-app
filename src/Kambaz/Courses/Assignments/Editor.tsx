import { Button, Form, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import * as db from "../../Database";

export default function AssignmentEditor() {
  const { aid } = useParams();
  const assignments = db.assignments;

  return (
    <Form id="wd-assignments-editor">
      <Form.Group className="mb-3" controlId="wd-name">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          type="text"
          defaultValue={
            assignments.find((assignment) => assignment._id === aid)?.title
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="wd-description">
        <Form.Control
          as="textarea"
          rows={3}
          defaultValue="Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipitratione eaque illo minus cum, saepe totam vel nihil repellat nemo explicabo excepturi consectetur. Modi omnis minus sequi maiores, provident voluptates."
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-points">
            <Form.Label>Points</Form.Label>
            <Form.Control type="number" defaultValue={100} />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-group">
            <Form.Label>Assignment Group</Form.Label>
            <Form.Select defaultValue="ASSIGNMENTS">
              <option value="ASSIGNMENTS">ASSIGNMENTS</option>
              <option value="QUIZZES">QUIZZES</option>
              <option value="EXAMS">EXAMS</option>
              <option value="PROJECT">PROJECT</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-display-grade-as">
            <Form.Label>Display Grade as</Form.Label>
            <Form.Select defaultValue="PERCENTAGE">
              <option value="PERCENTAGE">Percentage</option>
              <option value="POINTS">Total Points</option>
            </Form.Select>
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-submission-type">
            <Form.Label>Submission Type</Form.Label>
            <Form.Select defaultValue="ONLINE">
              <option value="ONLINE">Online</option>
              <option value="INPERSON">In-Person</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Form.Group className="mb-3">
        <Form.Label>Online Entry Options</Form.Label>
        <div>
          <Form.Check type="checkbox" id="wd-text-entry" label="Text Entry" />
          <Form.Check type="checkbox" id="wd-website-url" label="Website URL" />
          <Form.Check
            type="checkbox"
            id="wd-media-recordings"
            label="Media Recordings"
          />
          <Form.Check
            type="checkbox"
            id="wd-student-annotation"
            label="Student Annotation"
          />
          <Form.Check
            type="checkbox"
            id="wd-file-upload"
            label="File Uploads"
          />
        </div>
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-assign-to">
            <Form.Label>Assign to</Form.Label>
            <Form.Control type="text" defaultValue="Everyone" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-due-date">
            <Form.Label>Due</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-13" />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label>Available from</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-06" />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-until">
            <Form.Label>Until</Form.Label>
            <Form.Control type="date" defaultValue="2024-05-20" />
          </Form.Group>
        </Col>
      </Row>

      <hr />

      <div className="text-end">
        <Button className="btn-secondary me-2">Cancel</Button>
        <Button className="btn-red">Save</Button>
      </div>
    </Form>
  );
}
