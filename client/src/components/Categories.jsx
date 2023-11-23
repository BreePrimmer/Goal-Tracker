import { useState } from "react";

export default function Categories(props) {
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
        {props.userData.map((category) => {
          return (
            <div key={category.name}>
              <li className="category">
                <Link to={`/category/${category.name}`}>{category.name}</Link>
              </li>
            </div>
          );
        })}
        <li
          className="category"
          onClick={() => {
            setCreateCategory(true);
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
