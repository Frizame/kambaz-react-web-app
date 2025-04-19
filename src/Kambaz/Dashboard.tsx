/* eslint-disable @typescript-eslint/no-explicit-any */
import { Link } from "react-router-dom";
import { Button, Card, Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setEnrollments, addEnrollment, deleteEnrollment } from "./Enrollments/reducer";
import * as enrollmentsClient from "./Enrollments/client"

export default function Dashboard({
  courses,
  course,
  allCourses,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  allCourses: any[];
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments } = useSelector((state: any) => state.enrollmentsReducer);

  const [enrolling, setEnrolling] = useState(false);

  const dispatch = useDispatch();

  const fetchEnrollments = async () => {
    try {
      const enrollments = await enrollmentsClient.findEnrollments();
      dispatch(setEnrollments(enrollments));
    } catch (error) {
      console.log(error);
    }
  };

  const enroll = async (courseId: string) => {
    try {
      const enrollment = await enrollmentsClient.enroll(currentUser._id, courseId);
      dispatch(addEnrollment(enrollment));
    } catch (error) {
      console.log(error);
    }
  };

  const unenroll = async (courseId: string) => {
    try {
      await enrollmentsClient.unenroll(currentUser._id, courseId);
      dispatch(
        deleteEnrollment({
          user: currentUser._id,
          course: courseId,
        })
      );
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchEnrollments();
  }, [currentUser]);

  const isFaculty = currentUser.role === "FACULTY";
  const isModerator = isFaculty || currentUser.role === "ADMIN";
  const isStudent = currentUser.role === "STUDENT";

  const filteredCourses = enrolling ? allCourses : courses;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
      {isStudent && (
        <Button className="float-end" onClick={() => setEnrolling(!enrolling)}>
          {enrolling ? "My Courses" : "All Courses"}
        </Button>
      )}
      {isModerator && (
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

                    {isStudent && enrolling === true && (
                      <button
                        onClick={
                          enrollments.some(
                            (enrollment: any) =>
                              enrollment.user === currentUser._id &&
                              enrollment.course === course._id
                          )
                            ? (event) => {
                                event.preventDefault();
                                unenroll(course._id);
                              }
                            : (event) => {
                                event.preventDefault();
                                enroll(course._id);
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

                    {isModerator && (
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
                    {isModerator && (
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
