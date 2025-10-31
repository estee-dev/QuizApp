import { useState, useEffect } from "react";
import styles from "./TakeQuiz.module.css";

function TakeQuiz({ quizTaker, uploadedQuizData }) {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);

  useEffect(() => {
    if (uploadedQuizData && uploadedQuizData.length > 0) {
      const formattedData = uploadedQuizData.map((row) => ({
        question: row.Question || row.question,
        answers: [
          { text: row.OptionA, correct: row.Correct === "A" },
          { text: row.OptionB, correct: row.Correct === "B" },
          { text: row.OptionC, correct: row.Correct === "C" },
          { text: row.OptionD, correct: row.Correct === "D" },
        ],
      }));
      setQuestions(formattedData);
    }
  }, [uploadedQuizData]);

  if (questions.length === 0) return <p>Please Upload a Quiz file to Continue...</p>;

  const currentQuestion = questions[currentQuestionIndex];

  function handleAnswerClick(isCorrect) {
    if (isCorrect) setScore((prev) => prev + 1);

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex < questions.length) {
      setCurrentQuestionIndex(nextIndex);
    } else {
      setShowScore(true);
    }
  }

  function restartQuiz() {
    setCurrentQuestionIndex(0);
    setScore(0);
    setShowScore(false);
  }

  return (
    <div className={styles.takequizbody}>
      <div className={styles.app}>
        <h1>Quiz.COM</h1>
        <h3>Welcome, {quizTaker}</h3>

        {showScore ? (
          <div className={styles.quiz}>
            <h2>
              You scored {score} out of {questions.length}!
            </h2>
            <button className={styles.nextbtn} onClick={restartQuiz}>
              Take Quiz Again
            </button>
          </div>
        ) : (
          <div className={styles.quiz}>
            <h2>
              {currentQuestionIndex + 1}. {currentQuestion.question}
            </h2>
            <div className={styles.answerButtons}>
              {currentQuestion.answers.map((answer, index) => (
                <button
                  key={index}
                  className={styles.optionbtn}
                  onClick={() => handleAnswerClick(answer.correct)}
                >
                  {answer.text}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default TakeQuiz;
