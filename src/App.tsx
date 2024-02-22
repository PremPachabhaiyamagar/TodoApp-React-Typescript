import './App.css';
import { Todo } from './Components/Todo';
import { Addtodo } from './Components/Addtodo';
import { Navbar } from './Components/Navbar';

function App() {
  return (
    <main className="App">
      <h2>React + Typescript Todo</h2>
      <Navbar />
      <Todo />
      <Addtodo />
    </main>
  );
}

export default App;
