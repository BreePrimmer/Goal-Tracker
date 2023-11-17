import { useState } from "react";

export default function CreateGoal() {
  const [longTerm, setLongTerm] = useState(true);

  const goalFormHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div>
      <span id="new-goal">Make a new goal</span>
      <form id="goalForm" onSubmit={goalFormHandler}>
        <div>
          <label htmlFor="newGoalCategory">Category:</label>
          <input type="text" name="newGoalCategory" id="" />
        </div>
        <div>
          <label htmlFor="newGoalDesc">Description:</label>
          <input type="text" name="newGoalDesc" />
        </div>
        <div>
          <span
            onClick={() => {
              setLongTerm(false);
            }}>
            Short term
          </span>{" "}
          or {""}
          <span
            onClick={() => {
              setLongTerm(true);
            }}>
            long term
          </span>
        </div>
        <div>
          <label htmlFor="newGoalDate">End Date</label>
          <input type="datetime-local" />
        </div>
        <button type="submit">Create Goal</button>
      </form>
    </div>
  );
}
