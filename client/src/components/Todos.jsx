import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO, DELETE_TODO } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

export default function Todos(props) {
  const userData = props.userData;

  const [createTodo, setCreateTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const [createTodoMutation] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const [deleteTodoMutation] = useMutation(DELETE_TODO, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const newTodoFormHandler = async (e) => {
    e.preventDefault();
    // console.log(newTodo);

    try {
      const { data } = await createTodoMutation({
        variables: {
          text: newTodo,
          user: userData._id,
        },
      });

      console.log("Todo created:", data.newTodo);
    } catch (error) {
      console.log(error);
    }

    setCreateTodo(false);
    setNewTodo("");
  };

  // Delete Todo Handler
  const deleteTodoHandler = async (todoId) => {
    try {
      console.log(todoId);
      console.log(userData._id);
      const { data } = await deleteTodoMutation({
        variables: {
          todoId: todoId,
          user: userData._id,
        },
      });

      console.log("Todo deleted");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="todo-cont">
      <h1 id="to-do">To-do's</h1>
      <ul className="to-do-ul">
        {userData.todos.map((todo) => {
          return (
            <li className="to-do-li" key={todo._id}>
              <button
                id="to-do-btn"
                onClick={() => {
                  deleteTodoHandler(todo._id);
                }}>
                -
              </button>
              {todo.text}
            </li>
          );
        })}
      </ul>

      {!createTodo ? (
        <button
          id="to-do-btn"
          onClick={() => {
            setCreateTodo(true);
          }}>
          +
        </button>
      ) : (
        <div id="new-to-do-cont">
          <form id="new-to-do-form" onSubmit={newTodoFormHandler}>
            <label id="new-to-do-label" htmlFor="newTodoName">
              What's the new todo?{" "}
            </label>
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
