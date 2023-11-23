export default function SingleGoalView(props) {
  const goal = props.goal[0];
  return (
    <div id="desc-cont">
      <div>
        <span className="form-title">Description:</span>
        <p className="goal-desc">{goal.text}</p>
        <div id="desc-date">
          <span className="form-title">Short term</span>
          <span className="form-title">{goal.date}</span>
        </div>
      </div>
    </div>
  );
}
