import { Link, useParams } from "react-router-dom";

export default function GoalView() {
  let { id } = useParams();
  return (
    <div className=''>
      <Link id='rtn-btn' to={"/"}>&lt;- Return home</Link>
      <ul id='goal-list'>
        <li className='form-title'>Goal one</li>
        <li className='form-title'>Goal two</li>
        <li className='form-title'>Goal three</li>
        <li className='form-title'>Goal four</li>
      </ul>
    </div>
  );
}
