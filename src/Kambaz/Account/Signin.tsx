import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Signin() {
  return (
    <div
      id="wd-signin-screen"
      className="mx-auto"
      style={{ maxWidth: "400px" }}
    >
      <h3 className="mb-2">Signin</h3>

      <Form>
        <Form.Group className="mb-3" controlId="wd-username">
          <Form.Control type="text" placeholder="username" />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-password">
          <Form.Control type="password" placeholder="password" />
        </Form.Group>

        <Link className="link-button" to="/Kambaz/Dashboard">
          Sign In
        </Link>
      </Form>

      <div className="mt-3">
        <Link to="/Kambaz/Account/Signup" id="wd-signup-link">
          Signup
        </Link>
      </div>
    </div>
  );
}
