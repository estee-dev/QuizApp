
import { useState } from "react";
import styles from "./Form.module.css";

function Form({ onStart, onClose }) {
  const [name, setName] = useState("");
  const [time, setTime] = useState(60); // default 60 seconds

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || time <= 0) {
      alert("Please enter your name and a valid time.");
      return;
    }
    onStart(name, parseInt(time));
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>
          ×
        </button>
        <h2>Enter Quiz Details</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <label>Time (in seconds):</label>
          <input
            type="number"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />

          <button type="submit">Start Quiz</button>
        </form>
      </div>
    </div>
  );
}

export default Form;