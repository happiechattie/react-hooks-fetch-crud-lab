import React, {useState} from "react";
import { v4 as uuid } from "uuid";

function NewTaskForm({onTaskFormSubmit, CATEGORIES}) {

  const [text, setText] = useState('');
  const [category, setCategory] = useState('Code');

  function handleTextChange(e){
    setText(e.target.value);
  }

  function handleCategoryChange(e){
    setCategory(e.target.value);
  }

  function handleSubmit(e){
    e.preventDefault();
    onTaskFormSubmit({
      id: text,
      text: text,
      category: category
    })
  }

  const categoryList = 
    CATEGORIES.map(category => {
      return category !== 'All' ? (<option key={uuid()}>{category}</option>) : null
    });

  return (
    <form onSubmit={handleSubmit} className="new-task-form">
      <label>
        Details
        <input type="text" name="text" onChange={handleTextChange} />
      </label>
      <label>
        Category
        <select name="category" onChange={handleCategoryChange}>
          {categoryList}
        </select>
      </label>
      <input type="submit" value="Add task" />
    </form>
  );
}

export default NewTaskForm;
