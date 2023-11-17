import { useState } from "react";

export default function CreateGoal() {
  const [longTerm, setLongTerm] = useState(true);

  const goalFormHandler = (e) => {
    e.preventDefault();
  };
  return (
    <div className="goal-cont">
      <span id="new-goal">Make a new goal</span>
      <form className='new-goal-cont'>
      <div className="goal-spacing">
          <label className="form-title" htmlFor="newGoalCategory">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            name="newGoalCategory"
            id="goalName"
          />
        </div>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="newGoalCategory">
            Category:
          </label>
          <input
            className="form-input"
            type="text"
            name="newGoalCategory"
            id="goalCategory"
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
          />
        </div>
        <div className="goal-spacing">
          <span className="form-title">Short term</span> or{" "}
          <span className="form-title">Long term</span>
        </div>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="newGoalDate">
            End Date
          </label>
          <input className="form-input" type="datetime-local" />
        </div>
        <button className="goal-btn" type="submit">Create Goal</button>
      </form>
    </div>
  );
}
