import {FormEvent, useState } from "react";
import { useTodo } from "../Store/TodoContextProvider";

export {};

export const Todo = () => {
    const [todo ,setTodo] = useState("")
    const {handleAddTodo} = useTodo()
    // handlesubmit event for form
    const handleSubmit = ( e : FormEvent<HTMLFormElement>) => {
       e.preventDefault()
       handleAddTodo(todo)
       setTodo(" ")
    }

    return(
      <form onSubmit={handleSubmit}>
         <input type="text" 
         value={todo}
         onChange={(e) => setTodo(e.target.value)}
         />
         <button type="submit">Add</button>
      </form>
    )
}