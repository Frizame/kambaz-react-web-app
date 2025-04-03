import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addEnrollment, deleteEnrollment } from "./Enrollments/reducer";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const [enrolling, setEnrolling] = useState(false);

  const dispatch = useDispatch();

  const filteredCourses = courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {currentUser.role === "STUDENT" && (
        <Button className="float-end" onClick={() => setEnrolling(!enrolling)}>
          {enrolling ? "Hide Enrollments" : "Show Enrollments"}
        </Button>
      )}
      {currentUser.role === "FACULTY" && (
        <h5 className="mb-5">
          New Course
          <br />
          <input
            value={course.name}
            className="form-control mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <textarea
            value={course.description}
            className="form-control"
            onChange={(e) =>
              setCourse({ ...course, description: e.target.value })
            }
          />
          <button
            className="btn btn-primary float-end mt-2"
            id="wd-add-new-course-click"
            onClick={addNewCourse}
          >
            {" "}
            Add{" "}
          </button>
          <button
            className="btn btn-warning float-end me-2 mt-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
        </h5>
      )}
      <h2 id="wd-dashboard-published" className="mt-5">
        Published Courses ({filteredCourses.length})
      </h2>{" "}
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {filteredCourses.map((course) => (
            <Col className="wd-dashboard-course" style={{ width: "300px" }}>
              <Card>
                <Link
                  to={`/Kambaz/Courses/${course._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={`/images/${course.image}`}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <Card.Body className="card-body">
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {course.name}{" "}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {course.description}{" "}
                    </Card.Text>
                    <Button variant="primary"> Go </Button>

                    {currentUser.role === "STUDENT" && enrolling === true && (
                      <button
                        onClick={
                          enrollments.some(
                            (enrollment: any) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          )
                            ? (event) => {
                                event.preventDefault();
                                dispatch(
                                  deleteEnrollment({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                              }
                            : (event) => {
                                event.preventDefault();
                                dispatch(
                                  addEnrollment({
                                    user: currentUser._id,
                                    course: course._id,
                                  })
                                );
                              }
                        }
                        className={
                          enrollments.some(
                            (enrollment: any) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          )
                            ? "btn btn-danger float-end"
                            : "btn btn-success float-end"
                        }
                        id="wd-delete-course-click"
                      >
                        {enrollments.some(
                          (enrollment: any) =>
                            enrollment.user === currentUser._id &&
                            enrollment.course === course._id
                        )
                          ? "Unenroll"
                          : "Enroll"}
                      </button>
                    )}

                    {currentUser.role === "FACULTY" && (
                      <button
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                        className="btn btn-danger float-end"
                        id="wd-delete-course-click"
                      >
                        Delete
                      </button>
                    )}
                    {currentUser.role === "FACULTY" && (
                      <button
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          setCourse(course);
                        }}
                        className="btn btn-warning me-2 float-end"
                      >
                        Edit
                      </button>
                    )}
                  </Card.Body>
                </Link>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
