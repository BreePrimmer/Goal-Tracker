import { useState } from "react";

export default function Todos() {
  const [createTodo, setCreateTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const exampleList = ["Fitness", "School", "Work"];

  const newTodoFormHandler = (e) => {
    e.preventDefault();
    setCreateTodo(false);
    setNewTodo("");
    console.log(newTodo);
  };

  return (
    <div className="todo-cont">
      <h1 id="to-do">To-do's</h1>
      <ul className="to-do-ul">
        {props.userData.map((todo) => (
          <li className="to-do-li" key={todo._id}>
            {todo.text}
          </li>
        ))}
      </ul>

      {!createTodo ? (
        <button
          id="to-do-btn"
          onClick={() => {
            setCreateTodo(true);
          }}>
          Add new
        </button>
      ) : (
        <div>
          <form onSubmit={newTodoFormHandler}>
            <label htmlFor="newTodoName">What's the new todo? </label>
            <input
              type="text"
              id="newTodo"
              value={newTodo}
              onChange={(e) => {
                setNewTodo(e.target.value);
              }}
            />
            <button type="submit" id="to-do-btn">
              Submit
            </button>
          </form>
          <button
            id="to-do-btn"
            onClick={() => {
              setCreateTodo(false);
            }}>
            Undo
          </button>
        </div>
      )}
    </div>
  );
}
