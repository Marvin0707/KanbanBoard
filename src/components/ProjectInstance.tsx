import './ProjectInstance.css'
import KanbanColumn from './KanbanColumn'
import KanbanItem from './KanbanItem'
import { useEffect, useState } from 'react';

interface Props{
  activeProject: string
}

function ProjectInstance({activeProject}:Props) {

  // Funktion, um den Local Storage abzurufen und den Wert zurückzugeben
  const retrieveFromLocalStorage = (key:string, defaultValue:string[]) => {
    const storedValue = localStorage.getItem((activeProject+key));
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [backlog, setBacklog] = useState(() =>
    retrieveFromLocalStorage('backlog', [])
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
    localStorage.setItem((activeProject+'backlog'), JSON.stringify(backlog));
  }, [backlog]);

  useEffect(() => {
    localStorage.setItem(activeProject+'doing', JSON.stringify(doing));
  }, [doing]);

  useEffect(() => {
    localStorage.setItem(activeProject+'done', JSON.stringify(done));
  }, [done]);

  useEffect(() => {
    console.log("Retrieving data from Local Storage...");
    console.log("Backlog:", retrieveFromLocalStorage(activeProject + 'backlog', []));
    console.log("Doing:", retrieveFromLocalStorage(activeProject + 'doing', []));
    console.log("Done:", retrieveFromLocalStorage(activeProject + 'done', []));
    
    setBacklog(retrieveFromLocalStorage('backlog', []));
    setDoing(retrieveFromLocalStorage('doing', []));
    setDone(retrieveFromLocalStorage('done', []));
  
}, [activeProject]);

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
  <div className='instanceContainer'>
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
    <form onSubmit={(e) => {
    e.preventDefault(); // Verhindere das Standardverhalten des Formulars
    addTask(task); // Füge die Aufgabe zum Backlog hinzu
    setTask("");
    setShowInput(false)}}>
      <label>Enter a task</label>
      <input className="taskInput" name='task' type='text' value={task} onChange={(e) => setTask(e.target.value)} placeholder='Do homework' required/>
    </form>
    </div>}

  </>
  )
}

export default ProjectInstance