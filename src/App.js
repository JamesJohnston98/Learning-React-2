import React, { useState, useRef, useEffect} from 'react';
import TodoList from './TodoList'
import uuidv4 from 'uuid/v4'


const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] =  useState([])
  const todoNameRef = useRef()

  //Allows the todo list to be saved to the local storage when an item is created and retrieved when the user reloads the page.
  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)
  }, [])
  useEffect(() =>{
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  //allows the todo to be toggled from complete to incomplete or incomplete to complete 
  function toggleTodo(id){
    //a copy of the todos list so that it doesnt change the current todo list
    const newTodo = [...todos]
    const todo = newTodo.find(todo => todo.id ===  id)
    todo.complete = !todo.complete
    setTodos(newTodo)
  }
  
  //allows the user to add a todo to the list once they have click the add todo button.
  function handleAddTodo(e){
    const name = todoNameRef.current.value
     if(name === '') return 
     setTodos(prevTodos =>  {
       return [...prevTodos,  {id: uuidv4(), name: name, complete: false}]
     })
     todoNameRef.current.value = null 
 }

 //function to allow the completed items to be removed from the todo list
 function handleClear(){
   const newTodo = todos.filter(todo => !todo.complete)
   setTodos(newTodo)
 }

 //displays the todo list onto the page with the input page 
 //Allows the user to create todo list and delete the completed items from the list.
  return (
    <>
    <TodoList  todos={todos} toggleTodo={toggleTodo}/>
    <input ref={todoNameRef} type = "text" />
    <button onClick={handleAddTodo}>Add Todo</button>
    <button onClick={handleClear}>Clear Completed</button>
    <div>{todos.filter(todo => !todo.complete).length} Left to do</div>
    </>
  )
}

export default App;
