import { useSelector, useDispatch } from "react-redux";
import { addTodo, updateTodo, setTodo } from "./todosReducer";
import { Button, Col, Form, ListGroupItem, Row } from "react-bootstrap";
export default function TodoForm() {
  const { todo } = useSelector((state: any) => state.todosReducer);
  const dispatch = useDispatch();
  return (
    <ListGroupItem className="list-group-item">
      <Row>
        <Col>
          <Form>
            <Form.Group className="">
              <Form.Control
                value={todo.title}
                type="text"
                placeholder="Enter a todo-item title..."
                onChange={(e) =>
                  dispatch(setTodo({ ...todo, title: e.target.value }))
                }
              />
            </Form.Group>
          </Form>
        </Col>
        <Col xs="auto">
          <Button
            onClick={() => dispatch(updateTodo(todo))}
            id="wd-update-todo-click"
            className="me-2 btn-warning"
          >
            {" "}
            Update{" "}
          </Button>
          <Button
            onClick={() => dispatch(addTodo(todo))}
            id="wd-add-todo-click"
            className="btn-success"
          >
            {" "}
            Add{" "}
          </Button>
        </Col>
      </Row>
    </ListGroupItem>
  );
}
