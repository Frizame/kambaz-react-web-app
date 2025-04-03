/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { setCurrentUser } from "./reducer";
import { useDispatch } from "react-redux";
import * as client from "./client";

export default function Signin() {
  const [credentials, setCredentials] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const signin = async () => {
    const user = await client.signin(credentials);
    if (!user) return;
    dispatch(setCurrentUser(user));
    navigate("/Kambaz/Dashboard");
  };
  return (
    <div
      id="wd-signin-screen"
      className="mx-auto"
      style={{ maxWidth: "400px" }}
    >
      <h3 className="mb-2">Signin</h3>

      <Form>
        <Form.Group className="mb-3" controlId="wd-username">
          <Form.Control
            type="text"
            placeholder="username"
            value={credentials.username}
            onChange={(e) =>
              setCredentials({ ...credentials, username: e.target.value })
            }
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-password">
          <Form.Control
            type="password"
            placeholder="password"
            value={credentials.password}
            onChange={(e) =>
              setCredentials({ ...credentials, password: e.target.value })
            }
          />
        </Form.Group>

        <Button
          onClick={signin}
          id="wd-signin-btn"
          className="btn btn-primary w-100"
        >
          Sign In
        </Button>
      </Form>

      <div className="mt-3">
        <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
          Signup
        </Link>
      </div>
    </div>
  );
}
