import { Form, Row, Col, Button } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentsClient from "./client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const [assignment, setAssignment] = useState<any>({});
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isNew, setIsNew] = useState(false);

  useEffect(() => {
    const foundAssignment = assignments.find(
      (assignment: any) => assignment._id === aid
    );
    if (foundAssignment) {
      setAssignment(foundAssignment);
    } else {
      setIsNew(true);
      setAssignment({
        title: "New Assignment",
        course: cid,
        description: "Enter description...",
        points: 100,
      });
    }
  }, []);

  const goBack = () => {
    navigate(`/Kambaz/Courses/${assignment?.course}/Assignments`);
  };

  const add = async () => {
    try {
      const newAssignment = await assignmentsClient.createAssignmentForCourse(
        cid!,
        assignment
      );
      dispatch(addAssignment(newAssignment));
      goBack();
    } catch (err) {
      console.error("Failed to add assignment:", err);
    }
  };

  const update = async () => {
    try {
      const updatedAssignment = await assignmentsClient.updateAssignment(
        assignment
      );
      dispatch(updateAssignment(updatedAssignment));
      goBack();
    } catch (err) {
      console.error("Failed to update assignment:", err);
    }
  };

  return (
    <Form id="wd-assignments-editor">
      <Form.Group className="mb-3" controlId="wd-name">
        <Form.Label>Assignment Name</Form.Label>
        <Form.Control
          type="text"
          value={assignment.title}
          onChange={(e) =>
            setAssignment({ ...assignment, title: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="wd-description">
        <Form.Control
          as="textarea"
          rows={3}
          value={assignment.description}
          onChange={(e) =>
            setAssignment({ ...assignment, description: e.target.value })
          }
        />
      </Form.Group>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-points">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={assignment.points}
              onChange={(e) =>
                setAssignment({ ...assignment, points: e.target.value })
              }
            />
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
            <Form.Control
              type="date"
              value={assignment.due}
              onChange={(e) =>
                setAssignment({ ...assignment, due: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-from">
            <Form.Label>Available from</Form.Label>
            <Form.Control
              type="date"
              value={assignment.from}
              onChange={(e) =>
                setAssignment({ ...assignment, from: e.target.value })
              }
            />
          </Form.Group>
        </Col>

        <Col md={6}>
          <Form.Group className="mb-3" controlId="wd-available-until">
            <Form.Label>Until</Form.Label>
            <Form.Control
              type="date"
              value={assignment.to}
              onChange={(e) =>
                setAssignment({ ...assignment, to: e.target.value })
              }
            />
          </Form.Group>
        </Col>
      </Row>

      <hr />

      <div className="text-end">
        <Button onClick={goBack} className="btn btn-secondary me-2">
          Cancel
        </Button>
        <Button className="btn btn-danger" onClick={isNew ? add : update}>
          Save
        </Button>
      </div>
    </Form>
  );
}
