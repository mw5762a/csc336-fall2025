import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import './todoitem.css'

// this is where the js code is going to live 
function todoitem({todo}) {
  return (
    <>
    <li style={{textDecoration: todo.complete ? "line-through" : "none"}}> 
        {todo.task}
    </li>
    </>
  )
}

export default App
