import { Link, useParams } from "react-router-dom";

export default function GoalView() {
  let { id } = useParams();
  return (
    <div id='goal-list-cont'>
      <ul id='goal-list'>
        <li className='form-title' id="goal-name">Goal one</li>
        <li className='form-title' id="goal-name">Goal two</li>
        <li className='form-title' id="goal-name">Goal three</li>
        <li className='form-title' id="goal-name">Goal four</li>
      </ul>
      <Link id='rtn-btn' to={"/"}>&lt;-</Link>
    </div>
  );
}
