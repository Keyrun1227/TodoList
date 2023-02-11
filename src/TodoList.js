import React, { useState } from "react";
import { FiEdit } from "react-icons/fi";
import { BsTrashFill } from "react-icons/bs";
import Alert from "./Alert";

const TodoList = () => {
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ status: false, message: "", type: "" });

  const [message, setMessage] = useState({
    id: "",
    text: "",
  });

  const [isEditing, setEditing] = useState({
    id: "",
    Editing: false,
  });

  const changeMessage = (e) => {
    setMessage({
      ...message,
      text: e.target.value,
    });
  };

  const handleAdd = (e) => {
    e.preventDefault();
    if (!message.text) {
      setAlert({
        status: true,
        type: "danger",
        message: "Please Enter Some Text",
      });
      return;
    }
    let newTodo = {
      text: message.text,
      id: new Date().getTime().toString(),
    };
    setList([...list, newTodo]);
    setMessage({
      id: "",
      text: "",
    });
    setAlert({ status: true, message: "Item Added", type: "success" });
  };

  const handleEdit = (e) => {
    e.preventDefault();
    if (!message.text) {
      setAlert({
        status: true,
        type: "danger",
        message: "Please Enter Some Text",
      });
      return;
    }
    let newTodos = list.map((eachItem) => {
      if (eachItem.id === isEditing.id) {
        return {
          id: isEditing.id,
          text: message.text,
        };
      } else {
        return eachItem;
      }
    });
    setList(newTodos);
    setAlert({ status: true, message: "Item Updated", type: "success" });
    setMessage({
      id: "",
      text: "",
    });
    setEditing({
      id: "",
      isEditing: false,
    });
  };

  const handleDelete = (id) => {
    let newTodos = list.filter((eachItem) => {
      return eachItem.id !== id;
    });
    setList(newTodos);
    setAlert({ status: true, message: "Item Deleted", type: "danger" });
  };

  const changeTodoItem = (id) => {
    setEditing({
      ...isEditing,
      id: id,
      Editing: true,
    });
    let editableItem = list.find((eachItem) => eachItem.id === id);
    setMessage({
      ...message,
      id: editableItem.id,
      text: editableItem.text,
    });
  };

  const clearTodoList = () => {
    setAlert({ status: true, message: "Items Deleted", type: "danger" });
    setList([]);
  };

  return (
    <main className="section">
      <div className="main-container section-center">
        <div className="title">
          <h2>Kiran Todo list</h2>
          <div className="underline"></div>
        </div>
        {alert.status && (
          <Alert
            setAlert={setAlert}
            message={alert.message}
            type={alert.type}
          />
        )}
        <div className="form-container">
          <form>
            <input
              type="text"
              className="form-input"
              value={message.text}
              placeholder="Enter Some Text"
              onChange={changeMessage}
            />
            {isEditing.Editing ? (
              <button className="submit-btn" type="submit" onClick={handleEdit}>
                edit
              </button>
            ) : (
              <button className="submit-btn" type="submit" onClick={handleAdd}>
                submit
              </button>
            )}
          </form>
        </div>
        {list.length === 0 && (
          <h3 style={{ color: "red" }}>Todo List Is Empty</h3>
        )}
        <div className="todolist-container">
          {list.map((eachItem) => {
            const { id, text } = eachItem;
            return (
              <div className="todo" key={id}>
                <div className="message">{text}</div>
                <div className="button-container">
                  <button
                    className="edit-btn"
                    onClick={() => changeTodoItem(id)}
                  >
                    <FiEdit />
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(id)}
                  >
                    <BsTrashFill />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {list.length > 0 && (
          <div className="clear-items">
            <button className="clear-btn" onClick={clearTodoList}>
              Clear Todos
            </button>
          </div>
        )}
      </div>
    </main>
  );
};

export default TodoList;
