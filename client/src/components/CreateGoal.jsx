import { useState } from "react";

export default function CreateGoal() {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goalName, setGoalName] = useState("");

  const goalFormHandler = (e) => {
    e.preventDefault();
    console.log(goalName);
    console.log(category);
    console.log(description);
    console.log(endDate);
    setLongTerm(true);
    setCategory("");
    setDescription("");
    setEndDate("");
  };
  return (
    <div className="goal-cont">
      <span id="new-goal">Make a new goal</span>
      <form className="new-goal-cont" onSubmit={goalFormHandler}>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="goalName">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            name="newGoalCategory"
            id="goalName"
            value={goalName}
            onChange={(e) => {
              setGoalName(e.target.value);
            }}
          />
          <div className="goal-spacing">
            <label className="form-title" htmlFor="goalCategory">
              Category:
            </label>
            <input
              className="form-input"
              type="text"
              name="newGoalCategory"
              id="goalCategory"
              value={category}
              onChange={(e) => {
                setCategory(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="goal-spacing" id="desc-cont">
          <label className="form-title" htmlFor="desc">
            Description:
          </label>
          <textarea
            className="form-input"
            id="desc"
            type="text"
            name="newGoalDesc"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="endDate">
            End Date
          </label>
          <input
            className="form-input"
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <button className="goal-btn" type="submit">
          Create Goal
        </button>
      </form>
    </div>
  );
}
