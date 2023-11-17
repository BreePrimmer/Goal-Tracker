import { useState } from "react";

export default function CreateGoal() {
  const [longTerm, setLongTerm] = useState(true);
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");

  const goalFormHandler = (e) => {
    e.preventDefault();
    console.log(category);
    console.log(description);
    console.log(`Long term: ${longTerm}`);
    console.log(endDate);
    setLongTerm(true);
    setCategory("");
    setDescription("");
    setEndDate("");
  };
  return (
    <div className="goal-cont">
      <span id="new-goal">Make a new goal</span>
      <form onSubmit={goalFormHandler}>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="newGoalCategory">
            Category:
          </label>
          <input
            className="form-input"
            type="text"
            name="newGoalCategory"
            id=""
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
        </div>
        <div className="goal-spacing" id="desc-cont">
          <label className="form-title" htmlFor="newGoalDesc">
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
          <span
            className="form-title"
            onClick={() => {
              setLongTerm(false);
            }}>
            Short term
          </span>{" "}
          or{" "}
          <span
            className="form-title"
            onClick={() => {
              setLongTerm(true);
            }}>
            Long term
          </span>
        </div>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="newGoalDate">
            End Date
          </label>
          <input
            className="form-input"
            type="datetime-local"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}
