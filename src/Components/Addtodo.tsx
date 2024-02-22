import { useTodo } from '../Store/TodoContextProvider';
import { useSearchParams } from 'react-router-dom';
export {};

export const Addtodo = () => {
    const { todos , toggalAddTodo , handleDeleteTodo} = useTodo()
    const [serarchData] = useSearchParams();
    const todoData = serarchData.get("todos");
    console.log(todoData)
    
    let FilteredData = todos;

    if(todoData === "active"){
      FilteredData = FilteredData.filter((task) => !task.completed)
    }

    if(todoData === "completed"){
      FilteredData = FilteredData.filter((task) => task.completed)
    }
  return (
     <ul className='main-task'>
        {
           FilteredData.map((todo)=>{
            return(
                <li key={todo.id}>
                    <input type="checkbox"
                     name={`todo-${todo.id}`}
                     id={`todo-${todo.id}`}
                     checked={todo.completed} 
                     onChange={() => toggalAddTodo(todo.id)} 
                     />
                  <label htmlFor={`todo-${todo.id}`}>{todo.task}</label>
                  {
                    todo.completed && (
                        <button type="submit"
                         onClick={ () => handleDeleteTodo(todo.id)}
                         > Delete</button>
                    )
                  }
                </li>
            )
           })  
    
        }
     </ul>
  )
}


