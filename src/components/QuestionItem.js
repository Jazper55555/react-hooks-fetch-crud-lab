import React, { useState } from "react";

function QuestionItem({ question, onDelete, onAnswerUpdate }) {
  const { id, prompt, answers, correctIndex } = question;
  const [index, setIndex] = useState(0)

  const options = answers.map((answer, index) => (
    <option key={index} value={index}>
      {answer}
    </option>
  ));

  function handleDelete() {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'DELETE'
    })
    .then(resp => resp.json())
    .then(() => onDelete(question))
  }

  function handleChange(event) {
    fetch(`http://localhost:4000/questions/${id}`, {
      method: 'PATCH', 
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        'correctIndex': event.target.value
      })
    })
    .then(resp => resp.json())
    .then(() => onAnswerUpdate(event.target.value))
  }

  return (
    <li>
      <h4>Question {id}</h4>
      <h5>Prompt: {prompt}</h5>
      <label>
        Correct Answer:
        <select onChange={handleChange} defaultValue={correctIndex}>{options}</select>
      </label>
      <button onClick={handleDelete}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
