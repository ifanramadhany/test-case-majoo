import React, { useEffect, useState } from "react";
import "./App.css";
import { useSelector, useDispatch } from "react-redux";
import { fetchTodos, addTodos } from "./store/actions/actionTodos";
import CardTodo from "./components/CardTodo";
import CardTodoDone from "./components/CardTodoDone";
import { Button, Modal, Form } from "react-bootstrap";
import ReactLoading from "react-loading";

function App() {
  const dispatch = useDispatch();
  
  const { todos, isLoading, error } = useSelector((state) => state.todoState);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  const todosUndone = todos.filter(el => el.status === 0).sort((a,b) => b.createdAt - a.createdAt)
  const todosDone = todos.filter(el => el.status === 1).sort((a,b) => a.createdAt - b.createdAt)

  const [userInputAddTodo, setUserInputAddTodo] = useState({
    title: '',
    description: '',
    id: '',
    status: '',
    createdAt: '',
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
            {isLoading ? <ReactLoading className="loading-error" type="spin" color="white" /> : null}

            {error ? <h2 className="loading-error">Something went error, {error.message}</h2> : null}

            {todosUndone.map((item) => (
              <CardTodo
                key={item.id}
                item={item}
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
        <div className="main-content-finished">
        <div className="title-finished">
            <h2>Finished Todos</h2>
          </div>
          <div className="add-button">
            <Button variant="outline-success" disabled onClick={handleShow}>
              Archived
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
          <div className="content-done">
            {/* card todo */}
            {isLoading ? <ReactLoading className="loading-error" type="spin" color="#374151" /> : null}

            {error ? <h2 className="loading-error">Something went error, {error.message}</h2> : null}

            {todosDone.map((item) => (
              <CardTodoDone
                key={item.id}
                item={item}
              ></CardTodoDone>
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

      
    </div>
  );
}

export default App;
