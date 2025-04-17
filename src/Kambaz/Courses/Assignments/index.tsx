/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, FormControl, InputGroup, ListGroup } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { FaClipboard, FaPlus, FaTrash } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { IoEllipsisVertical } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";
import { deleteAssignment, setAssignments } from "./reducer";
import * as assignmentsClient from "./client";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isModerator = currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  const fetchAssignmentsForCourse = async () => {
    try {
      const data = await assignmentsClient.fetchAssignmentsForCourse(cid!);
      dispatch(setAssignments(data));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteAssignmentFromCourse = async (assignmentId: string) => {
    try {
      await assignmentsClient.deleteAssignment(assignmentId);
      dispatch(deleteAssignment(assignmentId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cid) {
      fetchAssignmentsForCourse();
    }
  }, [cid]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5); // believe that time zone causing issues, adding 5 hours to fix
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div>
      <div className="d-flex justify-content-between">
        <InputGroup style={{ width: "300px" }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <FormControl placeholder="Search..." />
        </InputGroup>

        {isModerator && (
          <div>
            <Button id="wd-add-assignment-group" className="btn-secondary me-2">
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Group
            </Button>
            <Button
              id="wd-add-assignment"
              className="btn-danger"
              onClick={() =>
                navigate(`/Kambaz/Courses/${cid}/Assignments/${uuidv4()}`)
              }
            >
              <FaPlus
                className="position-relative me-2"
                style={{ bottom: "1px" }}
              />
              Assignment
            </Button>
          </div>
        )}
      </div>
      <br />
      <br />

      <ListGroup className="wd-lessons rounded-0">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
            <div>
              <BsGripVertical className="me-2 fs-3" />
              ASSIGNMENTS 40% of Total
            </div>
            <div>
              <GreenCheckmark />
              <IoEllipsisVertical className="fs-4" />
            </div>
          </div>

          <ListGroup id="wd-lessons rounded-0" className="list-group rounded-0">
            {assignments
              .filter((assignment: any) => assignment.course === cid)
              .map((assignment: any) => (
                <ListGroup.Item className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <FaClipboard className="me-2 fs-3" />
                  {(isModerator && (
                    <a
                      href={`#/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                      className="wd-assignment-link ms-2 text-decoration-none"
                    >
                      <span className="black-text"> {assignment.title} </span>
                    </a>
                  )) || (
                    <span className="black-text"> {assignment.title} </span>
                  )}

                  <LessonControlButtons />
                  {isModerator && (
                    <FaTrash
                      className="text-danger me-3 mt-1 float-end"
                      onClick={() => {
                        const confirmed = window.confirm(
                          `Are you sure you want to delete "${assignment.title}"?`
                        );
                        if (confirmed) {
                          deleteAssignmentFromCourse(assignment._id);
                        }
                      }}
                    />
                  )}
                  <br />
                  <div>
                    <span className="red-text ms-4 mt-2">
                      {" "}
                      Multiple Modules{" "}
                    </span>
                    | <b>Not available until</b> {formatDate(assignment.from)}{" "}
                    at 12:00am |
                    <br />
                    <b className="ms-4">Due</b> {formatDate(assignment.due)} at
                    11:59pm | {assignment.points} pts
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
