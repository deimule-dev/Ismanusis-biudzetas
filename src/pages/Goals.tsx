import { useState } from "react";
import { useGoals } from "../hooks/useGoals";

export default function Goals() {
  const {
    goals,
    loading,
    saveGoal,
    removeGoal,
  } = useGoals();

  const [title, setTitle] = useState("");
  const [targetAmount, setTargetAmount] =
    useState("");

  const [targetDate, setTargetDate] =
    useState("");

  async function handleSave() {
    await saveGoal(
      title,
      Number(targetAmount),
      targetDate
    );

    setTitle("");
    setTargetAmount("");
    setTargetDate("");
  }

  return (
    <div>
      <h1>Goals</h1>

      <input
        placeholder="Goal title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="number"
        placeholder="Target amount"
        value={targetAmount}
        onChange={(e) =>
          setTargetAmount(e.target.value)
        }
      />

      <br />
      <br />

      <input
        type="date"
        value={targetDate}
        onChange={(e) =>
          setTargetDate(e.target.value)
        }
      />

      <br />
      <br />

      <button onClick={handleSave}>
        Save Goal
      </button>

      <hr />

      {loading && <p>Loading...</p>}

      {goals.map((goal) => (
        <div key={goal.id}>
          <h3>{goal.title}</h3>

          <p>
            Target: {goal.target_amount} €
          </p>

          <p>
            Current: {goal.current_amount} €
          </p>

          <button
            onClick={() =>
              removeGoal(goal.id)
            }
          >
            Delete
          </button>

          <hr />
        </div>
      ))}
    </div>
  );
}
