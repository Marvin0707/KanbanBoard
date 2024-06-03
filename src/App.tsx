import './App.css'
import KanbanColumn from './components/KanbanColumn'
import KanbanItem from './components/KanbanItem'
import { useEffect, useState } from 'react';

function App() {

  // Funktion, um den Local Storage abzurufen und den Wert zurückzugeben
  const retrieveFromLocalStorage = (key:string, defaultValue:string[]) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [backlog, setBacklog] = useState(() =>
    retrieveFromLocalStorage('backlog', ["Hausaufgaben machen und aufräumen1", "Hausaufgaben machen und aufräumen2"])
  );
  const [doing, setDoing] = useState(() =>
    retrieveFromLocalStorage('doing', [])
  );
  const [done, setDone] = useState(() =>
    retrieveFromLocalStorage('done', [])
  );

  const [task,setTask] = useState("")
  const [showInput,setShowInput] = useState(false)

  // Bei Änderungen in backlog, doing oder done, die Daten im Local Storage aktualisieren
  useEffect(() => {
    localStorage.setItem('backlog', JSON.stringify(backlog));
  }, [backlog]);

  useEffect(() => {
    localStorage.setItem('doing', JSON.stringify(doing));
  }, [doing]);

  useEffect(() => {
    localStorage.setItem('done', JSON.stringify(done));
  }, [done]);

  const handleDelete = (index:number) => {
    // Kopiere die aktuelle Backlog-Liste
    const updatedDone = [...done];
    // Entferne das Element mit dem angegebenen Index aus der Kopie
    updatedDone.splice(index, 1);
    // Setze die aktualisierte Backlog-Liste
    setDone(updatedDone);
};

const handleMoveBacklog = (index: number) => {
  const item = backlog[index];
  const updatedBacklog = [...backlog];
  updatedBacklog.splice(index, 1);
  const updatedDoing = [...doing, item]; // Füge das Element zur Doing-Liste hinzu
  setBacklog(updatedBacklog);
  setDoing(updatedDoing);
};
const handleMoveDoing = (index:number) => {
  const item = doing[index];
  const updatedDoing = [...doing];
  updatedDoing.splice(index, 1);
  const updatedDone = [...done, item]; // Füge das Element zur Doing-Liste hinzu
  setDoing(updatedDoing);
  setDone(updatedDone);
}

const addTask = (task:string) => {
  setBacklog([...backlog,task])
}

  return (
  <>
  <div className='appContainer'>
    <KanbanColumn heading='Backlog' onAddClick={() => setShowInput(!showInput)} >
    {backlog.map((item:string, index:number) => (
          <KanbanItem task={item} onMoveClick={() => handleMoveBacklog(index)} column='backlog'/>
        ))}
    </KanbanColumn>
    <KanbanColumn heading='Doing'>
    {doing.map((item:string, index:number) => (
          <KanbanItem task={item} onMoveClick={() => handleMoveDoing(index)} column='doing'/>
        ))}
    </KanbanColumn>
    <KanbanColumn heading='Done'>
    {done.map((item:string, index:number) => (
          <KanbanItem task={item} onDeleteClick={() => handleDelete(index)} column='done'/>
        ))}
    </KanbanColumn>
  </div>
  {showInput && <div className="inputForm">
    <form onSubmit={() => addTask(task)}>
      <label>Enter a task</label>
      <input className="taskInput" name='task' type='text' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Do homework' required/>
    </form>
    </div>}

  </>
  )
}

export default App