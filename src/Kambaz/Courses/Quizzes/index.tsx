/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Dropdown,
  FormControl,
  InputGroup,
  ListGroup,
} from "react-bootstrap";
import { BsGripVertical, BsRocketTakeoff } from "react-icons/bs";
import { FaPlus } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import GreenCheckmark from "../Modules/GreenCheckmark";
import * as quizzesClient from "./client";
import { deleteQuiz, setQuizzes, updateQuiz } from "./reducer";
import { v4 as uuidv4 } from "uuid";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { quizzes } = useSelector((state: any) => state.quizzesReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isModerator =
    currentUser.role === "FACULTY" || currentUser.role === "ADMIN";

  const [userAttempts, setUserAttempts] = useState<{ [key: string]: any }>({});

  const fetchQuizzesForCourse = async () => {
    try {
      const data = await quizzesClient.fetchQuizzesForCourse(cid!);

      const updatedData = await Promise.all(
        data.map(async (quiz: any) => {
          const fullQuiz = await quizzesClient.fetchQuizById(quiz._id);
          const totalPoints = fullQuiz.questions.reduce(
            (sum: number, q: any) => sum + (q.points || 0),
            0
          );
          return { ...quiz, questions: fullQuiz.questions, points: totalPoints };
        })
      );

      dispatch(setQuizzes(updatedData));

      if (currentUser.role === "STUDENT") {
        const attemptsMap: { [key: string]: any } = {};
        for (const quiz of updatedData) {
          const attempt = await quizzesClient.getLastAttempt(quiz._id, currentUser._id);
          attemptsMap[quiz._id] = attempt;
        }
        setUserAttempts(attemptsMap);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deleteQuizFromCourse = async (quizId: string) => {
    try {
      await quizzesClient.deleteQuiz(quizId);
      dispatch(deleteQuiz(quizId));
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (cid) {
      fetchQuizzesForCourse();
    }
  }, [cid]);

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    date.setHours(date.getHours() + 5);
    return date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
    });
  };

  const getAvailabilityStatus = (quiz: any) => {
    const now = new Date();
    const availableDate = new Date(quiz.availableDate);
    const untilDate = new Date(quiz.untilDate);
    if (now < availableDate) {
      return `Not available until ${formatDate(quiz.availableDate)}`;
    } else if (now >= availableDate && now <= untilDate) {
      return "Available";
    } else {
      return "Closed";
    }
  };

  const togglePublish = async (quiz: any) => {
    try {
      const updatedQuiz = { ...quiz, isPublished: !quiz.isPublished };
      await quizzesClient.updateQuiz(updatedQuiz);
      dispatch(updateQuiz(updatedQuiz));
    } catch (err) {
      console.error("Failed to toggle publish status", err);
    }
  };

  const assignmentGroups = ["Quizzes", "Exams", "Assignments", "Project"];

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
          <Button
            id="wd-add-quiz"
            className="btn-danger"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Quizzes/${uuidv4()}/edit`)
            }
          >
            <FaPlus
              className="position-relative me-2"
              style={{ bottom: "1px" }}
            />
            Quiz
          </Button>
        )}
      </div>

      <br />
      <br />

      {assignmentGroups.map((group) => (
        <ListGroup className="wd-lessons rounded-0 mb-4" key={group}>
          <ListGroup.Item className="wd-module p-0 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" />
                {group.toUpperCase()}
              </div>
              <div>
                <GreenCheckmark />
                <IoEllipsisVertical className="fs-4" />
              </div>
            </div>

            <ListGroup id={`wd-quizzes-${group}`} className="list-group rounded-0">
              {quizzes
                .filter((quiz: any) => quiz.courseId === cid && quiz.assignmentGroup === group && (isModerator || quiz.isPublished))
                .map((quiz: any) => (
                  <ListGroup.Item className="wd-lesson p-3 ps-1" key={quiz._id}>
                    <BsGripVertical className="me-2 fs-3" />
                    <BsRocketTakeoff className="me-2 fs-3" />
                    <a
                      href={`#/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`}
                      className="wd-assignment-link ms-2 text-decoration-none"
                      style={{ cursor: "pointer" }}
                    >
                      <span className="black-text"> {quiz.title} </span>
                    </a>

                    {isModerator && (
                      <Dropdown className="float-end">
                        <Dropdown.Toggle variant="light" size="sm">
                          <IoEllipsisVertical />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              navigate(
                                `/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/edit`
                              )
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item onClick={() => togglePublish(quiz)}>
                            {quiz.isPublished ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                          <Dropdown.Item
                            className="text-danger"
                            onClick={() => {
                              const confirmed = window.confirm(
                                `Are you sure you want to delete \"${quiz.title}\"?`
                              );
                              if (confirmed) {
                                deleteQuizFromCourse(quiz._id);
                              }
                            }}
                          >
                            Delete
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    )}

                    {isModerator && (
                      <div
                        className="me-3 clickable float-end"
                        onClick={() => togglePublish(quiz)}
                        style={{ cursor: "pointer" }}
                      >
                        {quiz.isPublished ? "✅" : "🚫"}
                      </div>
                    )}

                    <br />
                    <div>
                      <text className="ms-4">{getAvailabilityStatus(quiz)}</text>{" "}
                      |<b className="ms-2">Due</b> {formatDate(quiz.dueDate)} at
                      11:59pm |<b className="ms-2">Points:</b> {quiz.points} |
                      <b className="ms-2">Questions:</b>{" "}
                      {quiz.questions?.length ?? 0}
                      {currentUser.role === "STUDENT" &&
                        userAttempts[quiz._id] && (
                          <>
                            <br />
                            <b className="ms-4">Score:</b> {userAttempts[quiz._id].score} pts
                          </>
                        )}
                    </div>
                  </ListGroup.Item>
                ))}
            </ListGroup>
          </ListGroup.Item>
        </ListGroup>
      ))}
    </div>
  );
}
