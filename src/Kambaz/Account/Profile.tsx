import { Link } from "react-router-dom";
import { Form } from "react-bootstrap";

export default function Profile() {
  return (
    <div
      id="wd-profile-screen"
      className="mx-auto"
      style={{ maxWidth: "400px" }}
    >
      <h3 className="mb-2">Profile</h3>

      <Form>
        <Form.Group className="mb-3" controlId="wd-username">
          <Form.Control
            type="text"
            defaultValue="alice"
            placeholder="username"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-password">
          <Form.Control
            type="password"
            defaultValue="123"
            placeholder="password"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-firstname">
          <Form.Control
            type="text"
            defaultValue="Alice"
            placeholder="First Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-lastname">
          <Form.Control
            type="text"
            defaultValue="Wonderland"
            placeholder="Last Name"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-dob">
          <Form.Control
            type="date"
            defaultValue="2000-01-01"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-email">
          <Form.Control
            type="email"
            defaultValue="alice@wonderland"
            placeholder="Enter email"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="wd-role">
          <Form.Select defaultValue="FACULTY">
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
            <option value="FACULTY">Faculty</option>
            <option value="STUDENT">Student</option>
          </Form.Select>
        </Form.Group>

        <Link className="link-button bg-red" to="/Kambaz/Account/Signin">
          Sign out
        </Link>
      </Form>
    </div>
  );
}
