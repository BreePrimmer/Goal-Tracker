export default function CreateGoal() {
  return (
    <div>
      <span>Make a new goal</span>
      <form>
        <div>
          <label for="newGoalCategory">Category:</label>
          <input type="text" name="newGoalCategory" id="" />
        </div>
        <div>
          <label for="newGoalDesc">Description:</label>
          <input type="text" name="newGoalDesc" />
        </div>
        <div>
          <label for="newGoalDate">End Date</label>
          <input type="datetime-local" />
        </div>
      </form>
    </div>
  );
}
