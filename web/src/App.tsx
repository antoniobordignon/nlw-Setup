import './styles/global.css';

import Habit from "./components/Habit";

function App() {
  return (
    <div>
      <Habit completed={3}/>
      <Habit completed={5}/>
      <Habit completed={8}/>
      <Habit completed={13}/>
      <Habit completed={21}/>
      <Habit completed={34}/>
    </div>
  )
}

export default App
