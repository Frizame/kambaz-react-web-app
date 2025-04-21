import { useEffect, useState } from "react";
import { Table, FormControl } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import * as quizzesClient from "../client";

export default function StudentGrades({ users = [], quizId }: { users: any[], quizId: string }) {
  const [filteredUsers, setFilteredUsers] = useState(users.filter((u) => u.role === "STUDENT"));
  const [scores, setScores] = useState<{ [key: string]: number | null }>({});

  useEffect(() => {
    const fetchScores = async () => {
      const newScores: { [key: string]: number | null } = {};
      for (const user of filteredUsers) {
        try {
          const attempt = await quizzesClient.getLastAttempt(quizId, user._id);
          newScores[user._id] = attempt ? attempt.score : null;
        } catch {
          newScores[user._id] = null;
        }
      }
      setScores(newScores);
    };
    fetchScores();
  }, [quizId, filteredUsers]);

  const handleSearch = (term: string) => {
    const lower = term.toLowerCase();
    setFilteredUsers(
      users.filter(
        (u) =>
          u.role === "STUDENT" &&
          (`${u.firstName} ${u.lastName}`.toLowerCase().includes(lower) ||
            u.username.toLowerCase().includes(lower))
      )
    );
  };

  return (
    <div>
      <FormControl
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search students"
        className="float-start w-25 me-2 mb-2"
      />
      <Table striped className="mt-5">
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <FaUserCircle className="me-2 fs-4 text-secondary" />
                {user.firstName} {user.lastName}
              </td>
              <td>{scores[user._id] !== null ? scores[user._id] : "-"}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
