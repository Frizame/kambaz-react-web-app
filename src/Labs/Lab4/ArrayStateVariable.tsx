import { useState } from "react";
import {
  Button,
  ListGroup,
  ListGroupItem,
  Row,
  Col,
  Table,
} from "react-bootstrap";
export default function ArrayStateVariable() {
  const [array, setArray] = useState([1, 2, 3, 4, 5]);
  const addElement = () => {
    setArray([...array, Math.floor(Math.random() * 100)]);
  };
  const deleteElement = (index: number) => {
    setArray(array.filter((item, i) => i !== index));
  };

  return (
    <div id="wd-array-state-variables">
      <h2>Array State Variable</h2>
      <Button onClick={addElement} className="btn-success mb-3">
        Add Element
      </Button>
      <ListGroup className="col-2">
        {array.map((item, index) => (
          <ListGroupItem key={index}>
            <Row>
              <Col className="fs-4">{item}</Col>
              <Col xs="auto">
                <Button
                  onClick={() => deleteElement(index)}
                  id="wd-delete-element-click"
                  className="btn-danger"
                >
                  Delete
                </Button>
              </Col>
            </Row>
          </ListGroupItem>
        ))}
      </ListGroup>
      <hr />
    </div>
  );
}
