import EnvironmentVariables from "./EnvironmentVariables";
import HttpClient from "./HttpClient";
import PathParameters from "./PathParameters";
import QueryParameters from "./QueryParameters";
import WorkingWithArrays from "./WorkingWithArrays";
import WorkingWithArraysAsynchronously from "./WorkingWithArraysAsynchronously";
import WorkingWithObjects from "./WorkingWithObject";
import WorkingWithObjectsAsynchronously from "./WorkingWithObjectsAsynchronously";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;

export default function Lab5() {
  return (
    <div id="wd-lab5" className="ms-5 me-5 mt-2 mb-5">
      <h2>Lab 5</h2>
      <div className="list-group">
        <a
          href={`${REMOTE_SERVER}/lab5/welcome`}
          className="list-group-item"
        >
          Welcome
        </a>
      </div>
      <hr />
      <EnvironmentVariables />
      <PathParameters />
      <QueryParameters />
      <WorkingWithObjects />
      <WorkingWithArrays />
      <HttpClient />
      <WorkingWithObjectsAsynchronously />
      <WorkingWithArraysAsynchronously />
    </div>
  );
}
