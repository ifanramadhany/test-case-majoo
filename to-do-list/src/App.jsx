import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodos } from "./store/actions/actionTodos";
import CardTodo from "./components/CardTodo";
import { Button, Modal, Form } from "react-bootstrap";

function App() {
  const dispatch = useDispatch();
  
  const { todos, isLoading, error } = useSelector((state) => state.todoState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);


  const [userInputAddTodo, setUserInputAddTodo] = useState({
    title: '',
    description: '',
    id: '',
    status: '',
    createdAt: '',
  });

  const [show, setShow] = useState(false);
  const [update, setUpdate] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCloseUpdate = () => setUpdate(false);
  const handleShowUpdate = () => setUpdate(true);

  const clearAddTodoData = () => setUserInputAddTodo({
    title: '',
    description: '',
    id: '',
    status: '',
    createdAt: '',
  })
  
  console.log(todos);

  const onChangeInputAdd = (e, key) => {
    const newObj = { ...userInputAddTodo };
    newObj[key] = e.target.value;
    newObj['id'] = todos.length + 1
    newObj['createdAt'] = new Date()
    newObj['status'] = 0
    setUserInputAddTodo(newObj);
  };

  const handleAddTodo = e => {
    e.preventDefault()
    console.log(userInputAddTodo);
    dispatch(addTodos(userInputAddTodo))
    clearAddTodoData()
    handleClose()
  }

  return (
    <div className="App">
      <div className="App-header">
        <div className="main-content">
          <div className="title">
            <h2>Your todo List Today!</h2>
          </div>
          <div className="add-button">
            <Button variant="outline-secondary" onClick={handleShow}>
              Add Todo
            </Button>
          </div>
          <div className="content-top">
            <div className="card-todo-top">
              <div className="id-todo-top">
                <span>ID</span>
              </div>
              <div className="title-todo-top">
                <span>Todo</span>
              </div>
              <div className="desc-todo-top">
                <span>Description</span>
              </div>
            </div>
          </div>
          <div className="content">
            {/* card todo */}
            {isLoading ? <h2 className="loading-error">Loading ...</h2> : null}

            {error ? <h2 className="loading-error">Something went error, {error.message}</h2> : null}

            {todos.map((item) => (
              <CardTodo
                key={item.id}
                item={item}
                handleShowUpdate={handleShowUpdate}
              ></CardTodo>
            ))}

            <div className="card-todo-top">
              <div className="id-todo-top">
                <span></span>
              </div>
              <div className="title-todo-top">
                <span></span>
              </div>
              <div className="desc-todo-top">
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="main-content-finished"></div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={e => handleAddTodo(e)}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Todo Name</Form.Label>
              <Form.Control type="text" placeholder="todo.." onChange={(e) => onChangeInputAdd(e, 'title')} value={userInputAddTodo.title}/>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="details todo.." onChange={(e) => onChangeInputAdd(e, 'description')} value={userInputAddTodo.description}/>
            </Form.Group>

            <Button
              className="mb-3 button-modal-add"
              variant="secondary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <Modal show={update} onHide={handleCloseUpdate}>
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Todo Name</Form.Label>
              <Form.Control type="text" placeholder="todo.." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Description</Form.Label>
              <Form.Control type="text" placeholder="details todo.." />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example">
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
          <Button variant="danger" onClick={handleClose}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default App;
