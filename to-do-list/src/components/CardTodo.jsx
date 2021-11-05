import React from "react";

export default function CardTodo({item, handleShowUpdate}) {
  return (
    <div onClick={handleShowUpdate} className="card-todo">
      <div className="id-todo">
        <span>{item.id}</span>
      </div>
      <div className="title-todo">
        <span>{item.title}</span>
      </div>
      <div className="desc-todo">
        <span>{item.description}</span>
      </div>
    </div>
  );
}
