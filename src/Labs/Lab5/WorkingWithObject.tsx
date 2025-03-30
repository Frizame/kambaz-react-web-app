import React, { useState } from "react";
import { FormCheck, FormControl } from "react-bootstrap";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {
  const [assignment, setAssignment] = useState({
    id: 1,
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10",
    completed: false,
    score: 0,
  });
  const [module, setModule] = useState({
    id: 1,
    name: "React Module",
    description: "Working with React state",
    course: "Web Development",
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`;
  const MODULE_API_URL = `${REMOTE_SERVER}/lab5/module`;
  return (
    <div>
      <h3 id="wd-working-with-objects">Working With Objects</h3>
      <h4>Modifying Properties</h4>
      <a
        id="wd-update-assignment-title"
        className="btn btn-primary float-end"
        href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}
      >
        Update Title
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-assignment-title"
        defaultValue={assignment.title}
        onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })
        }
      />
      <a
        id="wd-update-assignment-score"
        className="btn btn-danger float-end"
        href={`${ASSIGNMENT_API_URL}/score/${assignment.score}`}
      >
        Update Score
      </a>
      <FormControl
        className="w-75 mb-2"
        type="number"
        id="wd-assignment-score"
        defaultValue={assignment.score}
        onChange={(e) =>
          setAssignment({ ...assignment, score: Number(e.target.value) })
        }
      />
            <a
        id="wd-update-assignment-completed"
        className="btn btn-dark float-end"
        href={`${ASSIGNMENT_API_URL}/completed/${assignment.completed}`}
      >
        Set Completed
      </a>
      <FormCheck
        className="w-75"
        id="wd-assignment-completed"
        label="Is Completed?"
        checked={assignment.completed}
        onChange={(e) =>
          setAssignment({ ...assignment, completed: e.target.checked })
        }
      />
      <hr />
      <h4>Retrieving Objects</h4>
      <a
        id="wd-retrieve-assignments"
        className="btn btn-primary"
        href={`${REMOTE_SERVER}/lab5/assignment`}
      >
        Get Assignment
      </a>
      <hr />
      <h4>Retrieving Properties</h4>
      <a
        id="wd-retrieve-assignment-title"
        className="btn btn-primary me-2"
        href={`${REMOTE_SERVER}/lab5/assignment/title`}
      >
        Get Title
      </a>
      <a
        id="wd-retrieve-assignment-score"
        className="btn btn-danger me-2"
        href={`${REMOTE_SERVER}/lab5/assignment/score`}
      >
        Get Score
      </a>
      <a
        id="wd-retrieve-assignment-completed"
        className="btn btn-dark me-2"
        href={`${REMOTE_SERVER}/lab5/assignment/completed`}
      >
        Get Completed
      </a>
      <hr />
      <h4>Modules</h4>
      <a
        id="wd-update-module-name"
        className="btn btn-danger float-end"
        href={`${MODULE_API_URL}/name/${module.name}`}
      >
        Update Name
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-name"
        defaultValue={module.name}
        onChange={(e) => setModule({ ...module, name: e.target.value })}
      />
      <a
        id="wd-update-module-description"
        className="btn btn-dark float-end"
        href={`${MODULE_API_URL}/description/${module.description}`}
      >
        Update Description
      </a>
      <FormControl
        className="w-75 mb-2"
        id="wd-module-description"
        defaultValue={module.description}
        onChange={(e) => setModule({ ...module, description: e.target.value })}
      />
      <a
        id="wd-retrieve-module"
        className="btn btn-primary me-2"
        href={`${MODULE_API_URL}`}
      >
        Get Module
      </a>
      <a
        id="wd-retrieve-module-title"
        className="btn btn-danger me-2"
        href={`${MODULE_API_URL}/name`}
      >
        Get Module Name
      </a>
      <a
        id="wd-retrieve-module-description"
        className="btn btn-dark me-2"
        href={`${MODULE_API_URL}/description`}
      >
        Get Module Description
      </a>
      <hr />
    </div>
  );
}
