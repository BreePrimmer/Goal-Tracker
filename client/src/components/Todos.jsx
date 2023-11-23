import { useState } from "react";

export default function Todos(props) {
  const [createTodo, setCreateTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const exampleList = ["Fitness", "School", "Work"];

  const newTodoFormHandler = (e) => {
    e.preventDefault();
    setCreateTodo(false);
    setNewTodo("");
    console.log(newTodo);
  };
  // [{"__typename":"Todo","_id":"655d92f6d18bba64a1805044","text":"Do Homework 1.2"}]

  return (
    <div className="todo-cont">
      <h1 id="to-do">To-do's</h1>
      {/* <div id='to-do-border'>
        <ul className="to-do-ul">
          <li className="to-do-li">Placeholder todo</li>
          <li className="to-do-li">Placeholder todo</li>
          <li className="to-do-li">Placeholder todo</li>
          {/* {exampleList.map((todo, index) => (
            <li className="to-do-li" key={todo}>
              {todo}
            </li>
          ))} */}
      {/* </ul> */}
      <div id="to-do-border">
        <ul className="to-do-ul">
          {props.userData.map((todo) => (
            <li className="to-do-li" key={todo._id}>
              {todo.text}
            </li>
          ))}
        </ul>
      </div>

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
