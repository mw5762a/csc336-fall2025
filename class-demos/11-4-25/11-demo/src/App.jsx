import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import todoitem from './todoitem'

// this is where the js code is going to live 
function App() {

  //anytime you want to change x it needs to go through the function setX(x)
  //this will allow the UI to update each time for x (DATA BINDING)
  const[x, setX] = useState(10); 
  const[task, setTask] = useState(""); 

  let todos = [
    {
      task: "eat dinner", 
      complete: false, 
      id: 1
    }, 
    {
      task: "pet cat", 
      complete: true, 
      id: 2
    }, 
    {
      task: "order shoe rack", 
      complete: false, 
      id: 3
    }
  ]

  function addTodo(){
    let newtodo = {
      task: task, 
      completed: false, 
      id: todos.length+1
    }
    //creates a giant new array of all the old and new values 
    setTodos(...todos, newTodos)
    setTask("") 
  }

  // everything inside of the return is HTML that can reference the js through {}
  return (
    <>
      <div>

        <input 
        type="text"
        onChange={(e => setTask(e.target.value))}
        />

      {task}

      <ul>
        {todos.map(todo => {
          <todoitem task={todo} key={todo.id}/>
        })}

      </ul>
      </div>

    </>
  )
}

export default App
