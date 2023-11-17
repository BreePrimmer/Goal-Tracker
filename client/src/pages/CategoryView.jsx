import { Link, useParams } from "react-router-dom";

export default function GoalView() {
  let { id } = useParams();
  return (
    <div>
      <Link to={"/"}>&lt;- Return home</Link>
      <ul>
        <li>Goal one</li>
        <li>Goal two</li>
        <li>Goal three</li>
        <li>Goal four</li>
      </ul>
    </div>
  );
}
