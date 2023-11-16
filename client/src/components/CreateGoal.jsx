export default function CreateGoal() {
  return (
    <div>
      <span id='new-goal'>Make a new goal</span>
      <form>
        <div className='goal-spacing'>
          <label className='form-title' htmlFor="newGoalCategory">Category:</label>
          <input type="text" name="newGoalCategory" id="" />
        </div>
        <div className='goal-spacing'>
          <label className='form-title' htmlFor="newGoalDesc">Description:</label>
          <input type="text" name="newGoalDesc" />
        </div>
        <div className='goal-spacing'>
          <span className='form-title'>Short term</span> or <span>long term</span>
        </div>
        <div className='goal-spacing'>
          <label className='form-title' htmlFor="newGoalDate">End Date</label>
          <input type="datetime-local" />
        </div>
      </form>
    </div>
  );
}
