import { useState } from "react";

export default function Categories() {
  const [createCategory, setCreateCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const categoryFormHandler = (e) => {
    e.preventDefault();
    console.log(newCategory);
    setNewCategory("");
    setCreateCategory(false);
  };

  return (
    <div className="category-container">
      <ul className="categories">
        <li id="my-category">My categories</li>
        <li className="category">General</li>
        <li
          className="category"
          id='new-category'
          onClick={() => {
            setCreateCategory(!createCategory);
          }}>
          New +
        </li>
        {createCategory && (
          <form id='new-category-form' onSubmit={categoryFormHandler}>
            <input
              type="text"
              name="newCategory"
              id="newCategory"
              value={newCategory}
              onChange={(e) => {
                setNewCategory(e.target.value);
              }}
            />
            <button type="submit">Create</button>
          </form>
        )}
      </ul>
    </div>
  );
}
