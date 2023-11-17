export default function CreateGoal() {
  return (
    <div className='goal-cont'>
      <span id='new-goal'>Make a new goal</span>
      <form>
        <div className='goal-spacing'>
          <label className='form-title' htmlFor="newGoalCategory">Category:</label>
          <input className='form-input' type="text" name="newGoalCategory" id="" />
        </div>
        <div className='goal-spacing' id='desc-cont'>
          <label className='form-title' htmlFor="newGoalDesc">Description:</label>
          <textarea className='form-input' id='desc' type="text" name="newGoalDesc" />
        </div>
        <div className='goal-spacing'>
          <span className='form-title'>Short term</span> or <span className='form-title'>Long term</span>
        </div>
        <div className='goal-spacing'>
          <label className='form-title' htmlFor="newGoalDate">End Date</label>
          <input className='form-input' type="datetime-local" />
        </div>
      </form>
    </div>
  );
}
