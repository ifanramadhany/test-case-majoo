import React, { useEffect, useState } from "react";
import { Button, Modal, Form } from "react-bootstrap";
import { editTodos, deleteTodos } from "../store/actions/actionTodos";
import { useSelector, useDispatch } from "react-redux";

export default function CardTodoDone({item}) {
  const dispatch = useDispatch();
  const [update, setUpdate] = useState(false);
  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  const [userInputEditTodo, setUserInputEditTodo] = useState({
    title: item.title,
    description: item.description,
    id: item.id,
    status: item.status,
    createdAt: item.createdAt,
  });

  const deleteTodo = (id) => {
    console.log(id);
    dispatch(deleteTodos(id))
    handleCloseUpdate()
  }

  const onChangeInputEdit = (e, key) => {
    const newObj = { ...userInputEditTodo };
    newObj[key] = e.target.value;
    newObj["createdAt"] = new Date();
    const newData = { ...newObj, status: Number(newObj.status)}
    setUserInputEditTodo(newData);
  };

  const handleEditTodo = e => {
    e.preventDefault()
    console.log(userInputEditTodo, 'ini edit input');
    dispatch(editTodos(userInputEditTodo))
    handleCloseUpdate()
  }

  return (
    <>
      <div onClick={handleShowUpdate} className="card-todo-done">
        <div className="id-todo-done">
          <span>{item.id}</span>
        </div>
        <div className="title-todo-done">
          <span>{item.title}</span>
        </div>
        <div className="desc-todo-done">
          <span>{item.description}</span>
        </div>
      </div>

      <Modal show={update} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => handleEditTodo(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Todo Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="todo.."
                onChange={(e) => onChangeInputEdit(e, "title")}
                value={userInputEditTodo.title}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="details todo.."
                onChange={(e) => onChangeInputEdit(e, "description")}
                value={userInputEditTodo.description}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example" onChange={(e) => onChangeInputEdit(e, "status")} value={userInputEditTodo.status}>
                <option value="1">Done</option>
                <option value="0">Undone</option>
              </Form.Select>
            </Form.Group>

            <Button
              className="mb-3 button-modal-add"
              variant="secondary"
              type="submit"
            >
              Update
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" disabled onClick={() => deleteTodo(item.id)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
