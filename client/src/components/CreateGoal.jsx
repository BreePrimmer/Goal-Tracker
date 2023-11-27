import { useState } from "react";
import { QUERY_ME } from "../utils/queries";
import { useMutation } from "@apollo/client";
import { NEW_GOAL } from "../utils/mutations";

export default function CreateGoal(props) {

  const userData = props.userData;
  const preCategory = props.category;
  // console.log(preCategory);

  const [category, setCategory] = useState(userData.categories.length > 0 ? userData.categories[0]._id : "");
  const [description, setDescription] = useState("");
  const [endDate, setEndDate] = useState("");
  const [goalName, setGoalName] = useState("");

  const [createGoalMutation] = useMutation(NEW_GOAL, {
    refetchQueries: [{ query: QUERY_ME }],
  });

  const goalFormHandler = async (e) => {
    e.preventDefault();

    if(preCategory){
      setCategory(preCategory);
    }

    console.log(goalName);
    console.log(category);
    console.log(description);
    console.log(endDate);

    try {
      const { data } = await createGoalMutation({
        variables: {
          user: userData._id,
          title: goalName,
          text: description,
          date: endDate,
          categoryId: category
        }
      });

      console.log('New Goal Created: ', data.title)

    } catch (error) {
      console.error(error)
    }

    setGoalName('');
    setCategory('');
    setDescription('');
    setEndDate('');
  };
  return (
    <div className="goal-cont">
      <span id="new-goal">Make a new goal</span>
      <form className="new-goal-cont" onSubmit={goalFormHandler}>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="goalName">
            Name:
          </label>
          <input
            className="form-input"
            type="text"
            name="newGoalCategory"
            id="goalName"
            value={goalName}
            onChange={(e) => {
              setGoalName(e.target.value);
            }}
          />
          {preCategory ? (<></>) : (<>
            <div className="goal-spacing">
            <label className="form-title" htmlFor="goalCategory">
              Category:
            </label>
            <select
              name="category-select"
              id="goalCategory"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {userData.categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          </>)}
          
        </div>
        <div className="goal-spacing" id="desc-cont">
          <label className="form-title" htmlFor="desc">
            Description:
          </label>
          <textarea
            className="form-input"
            id="desc"
            type="text"
            name="newGoalDesc"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />
        </div>
        <div className="goal-spacing">
          <label className="form-title" htmlFor="endDate">
            End Date
          </label>
          <input
            className="form-input"
            type="datetime-local"
            id="endDate"
            value={endDate}
            onChange={(e) => {
              setEndDate(e.target.value);
            }}
          />
        </div>
        <button className="goal-btn" type="submit">
          Create Goal
        </button>
      </form>
    </div>
  );
}
