import React, { useState, useEffect } from "react";
import QuestionItem from './QuestionItem'

function QuestionList() {
  const [questions, setQuestions] = useState(null)

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(resp => resp.json())
    .then(data => setQuestions(data))
  }, [])

  // console.log(data)

  function deleteQuestion(deletedQuestion) {
    const updatedQuestions = questions.filter((question) => question.id !== deletedQuestion.id)
    setQuestions(updatedQuestions)
  }

  function handleAnswerChange(updatedAnswer) {
    const updatedQuestions = questions.filter((question) => question.id !== updatedAnswer.id)
    setQuestions(updatedQuestions)  }

  return (
    <section>
      <h1>Quiz Questions</h1>
        {questions === null ? <ul></ul> : (
          <ul>
          {questions.map(question => (
            <QuestionItem onAnswerUpdate={handleAnswerChange} onDelete={deleteQuestion} key={question.id} question={question}/>
          ))}
        </ul>
  )}
    </section>
  );
}

export default QuestionList;
