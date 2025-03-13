import { useDispatch } from "react-redux";
import { deleteTodo, setTodo } from "./todosReducer";
import { Button, Col, ListGroupItem, Row } from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function TodoItem({ todo }: { todo: any }) {
  const dispatch = useDispatch();
  return (
    <ListGroupItem key={todo.id} className="list-group-item">
      <Row  className="gap-5">
        <Col>{todo.title}</Col>
        <Col xs="auto">
          <Button
            onClick={() => dispatch(deleteTodo(todo.id))}
            id="wd-delete-todo-click"
            className="me-2 btn-danger"
          >
            {" "}
            Delete{" "}
          </Button>
          <Button
            onClick={() => dispatch(setTodo(todo))}
            id="wd-set-todo-click"
          >
            {" "}
            Edit{" "}
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  );
}
