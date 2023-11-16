export default function CreateGoal() {
  return (
    <div>
      <span>Make a new goal</span>
      <form>
        <div>
          <label htmlFor="newGoalCategory">Category:</label>
          <input type="text" name="newGoalCategory" id="" />
        </div>
        <div>
          <label htmlFor="newGoalDesc">Description:</label>
          <input type="text" name="newGoalDesc" />
        </div>
        <div>
          <span>Short term</span> or <span>long term</span>
        </div>
        <div>
          <label htmlFor="newGoalDate">End Date</label>
          <input type="datetime-local" />
        </div>
      </form>
    </div>
  );
}
