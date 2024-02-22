import { ReactNode, useContext } from "react";
import { createContext ,useState} from "react";
export {};
// creating the types 
export type TodoProviderProbs = {
    children : ReactNode
}
 
export type TodoArr = {
    id:string,
    task:string,
    completed:boolean,
    createdat:Date
}

export type TodoContext = {
    todos : TodoArr[],
    handleAddTodo :(task : string) => void;
    toggalAddTodo : (id : string) => void;
    handleDeleteTodo : (task : string) => void;
}

// creating the context
export const TodosContext = createContext<TodoContext | null>(null)
// Provider for context
export const TodoContextProvider = ({children}:TodoProviderProbs) => {

      const [todos,setTodos] = useState<TodoArr[]>(() => {
        try {
            const newTodo = localStorage.getItem("todos") || "[]"
            return JSON.parse(newTodo) as TodoArr[];
        } catch (error) {
            return [];
        }
      })
  
      const handleAddTodo  = ( task :string ) => {
           setTodos( ( prev ) => {
             const NewTodos : TodoArr[] = [
                {
                 id:Math.random().toString(),
                 task : task,
                 completed : false,
                 createdat : new Date()
                },
              ...prev
            ]
            // storing the data in to local storage
            localStorage.setItem("todos",JSON.stringify(todos))
             return NewTodos;
           })
      }

      const handleDeleteTodo = ( id : string ) => {
         setTodos(( prev ) => {
           const NewTodos  = prev.filter((FilteredData) => FilteredData.id!== id )
        // storing the data into local storage 
           localStorage.setItem("todos",JSON.stringify(todos));
           return NewTodos
         })
      }

      const toggalAddTodo = ( id : string ) => {
         setTodos(( prev ) => {
           const NewTodos = prev.map((todo) => {
                if(todo.id === id){
                    return {...todo , completed :! todo.completed};
                }
                return todo;
            });
            // storing the data into local storage
            localStorage.setItem("todos",JSON.stringify(todos));
            return NewTodos;
         })
      }


   return(
    <TodosContext.Provider value={{todos,handleAddTodo,toggalAddTodo,handleDeleteTodo}}>
        {children}
    </TodosContext.Provider>
   )

}
// custom hook
export const useTodo = () => {
    const todosConsumer = useContext(TodosContext);
     
    if(!todosConsumer){
        throw new Error("It is not a todoConsumer")
    }
    return todosConsumer;
}