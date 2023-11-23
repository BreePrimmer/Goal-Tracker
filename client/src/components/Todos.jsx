import { useState } from "react";
import { useMutation } from "@apollo/client";
import { CREATE_TODO } from "../utils/mutations";
import { QUERY_ME } from "../utils/queries";

export default function Todos(props) {

  const userData = props.userData;

  const [createTodo, setCreateTodo] = useState(false);
  const [newTodo, setNewTodo] = useState("");

  const [createTodoMutation] = useMutation(CREATE_TODO, {
    refetchQueries: [{ query: QUERY_ME }]
  });

  const newTodoFormHandler = async (e) => {
    e.preventDefault();
    // console.log(newTodo);

    try{
      const { data } = await createTodoMutation({
        variables: {
          text: newTodo,
          user: userData._id
        }
      })

      console.log("Todo created:", data.newTodo);

    }catch(error){
      console.log(error);
    }

    setCreateTodo(false);
    setNewTodo("");
    
  };

  return (
    <div className="todo-cont">
      <h1 id="to-do">To-do's</h1>
      <ul className="to-do-ul">
        {userData.todos.map( (todo) => {
          return (
            <li className="to-do-li" key={todo._id}>{todo.text}</li>
          )
        })}
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
