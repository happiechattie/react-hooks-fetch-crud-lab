import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";
import { v4 as uuid } from "uuid";

function QuestionList() {

  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(data => setQuestions(data))
  }, [])

  function handleDelete(id){
    fetch(`http://localhost:4000/questions/${id}`, {
      method : 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      const updatedQuestions = questions.filter(question => question.id !== id)
      setQuestions(updatedQuestions);
    })
  }

  function handleUpdate(id, correctIndex){
    fetch(`http://localhost:4000/questions/${id}`, {
      method : 'PATCH',
      headers : {
        'Content-Type' : 'application/json'
      },
      body : JSON.stringify({correctIndex : `${correctIndex}`})
    })
    .then(r => r.json())
    .then((data) => {
      const updatedQuestions = questions.map(question => {
        if (question.id !== id) return question
        else return data
      })
      setQuestions(updatedQuestions)
    })
  }

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questions.map(question => (
        <QuestionItem key={uuid()} handleUpdate={handleUpdate} handleDelete={handleDelete} question={question} />
      ))}</ul>
    </section>
  );
}

export default QuestionList;
