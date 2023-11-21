import { useState } from "react";

export default function Categories() {
  const [createCategory, setCreateCategory] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  const exampleList = ["Fitness", "School", "Work"];

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
        {/* {exampleList.map((category, index) => (
          <li className="category" key={category}>
            {category}
          </li>
        ))} */}
        <li
          className="category"
          onClick={() => {
            setCreateCategory(!createCategory);
          }}>
          New +
        </li>
        {createCategory && (
          <form onSubmit={categoryFormHandler}>
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
