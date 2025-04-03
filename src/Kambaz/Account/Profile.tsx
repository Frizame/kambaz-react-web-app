/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentUser } from "./reducer";
import { Button, Form } from "react-bootstrap";
import * as client from "./client";

export default function Profile() {
  const [profile, setProfile] = useState<any>({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const updateProfile = async () => {
    const updatedProfile = await client.updateUser(profile);
    dispatch(setCurrentUser(updatedProfile));
  };
  const fetchProfile = () => {
    if (!currentUser) return navigate("/Kambaz/Account/Signin");
    setProfile(currentUser);
  };
  const signout = async () => {
    await client.signout();
    dispatch(setCurrentUser(null));
    navigate("/Kambaz/Account/Signin");
  };
  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <div
      id="wd-profile-screen"
      className="mx-auto"
      style={{ maxWidth: "400px" }}
    >
      <h3 className="mb-2">Profile</h3>
      {profile && (
        <Form>
          <Form.Group className="mb-3" controlId="wd-username">
            <Form.Control
              type="text"
              value={profile.username}
              placeholder="username"
              onChange={(e) =>
                setProfile({ ...profile, username: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-password">
            <Form.Control
              type="password"
              value={profile.password}
              placeholder="password"
              onChange={(e) =>
                setProfile({ ...profile, password: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-firstname">
            <Form.Control
              type="text"
              value={profile.firstName}
              placeholder="First Name"
              onChange={(e) =>
                setProfile({ ...profile, firstName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-lastname">
            <Form.Control
              type="text"
              value={profile.lastName}
              placeholder="Last Name"
              onChange={(e) =>
                setProfile({ ...profile, lastName: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-dob">
            <Form.Control
              type="date"
              value={profile.dob}
              onChange={(e) => setProfile({ ...profile, dob: e.target.value })}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-email">
            <Form.Control
              type="email"
              value={profile.email}
              placeholder="Enter email"
              onChange={(e) =>
                setProfile({ ...profile, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="wd-role">
            <Form.Select
              value={profile.role}
              onChange={(e) => setProfile({ ...profile, role: e.target.value })}
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              <option value="FACULTY">Faculty</option>
              <option value="STUDENT">Student</option>
            </Form.Select>
          </Form.Group>

          <Button
            onClick={updateProfile}
            className="btn btn-primary w-100 mb-2"
          >
            {" "}
            Update{" "}
          </Button>

          <Button className="btn-danger" onClick={signout}>
            Sign out
          </Button>
        </Form>
      )}
    </div>
  );
}
