import { useState } from 'react'
import './ProjectMenu.css'

interface Props {
    projects: string[]
    addProject: (newProject:string) => void
    activeProject: string
    setActiveProject: (newActiveProject:string) => void
}
function ProjectMenu({projects, addProject, activeProject, setActiveProject}:Props) {

const [showInput,setShowInput] = useState(false)
const [newProject,setNewProject] = useState("")

  return (
    <div className="menu">
        {projects.map(project => (
            <p className={`projectItem ${project === activeProject ? 'activeProject' : 'projectItem'}`} onClick={() => setActiveProject(project)}>{project}</p>
        ))}
        {showInput &&
    <form onSubmit={(e) => {
      e.preventDefault(); // Verhindere das Standardverhalten des Formulars
      addProject(newProject); // Füge die Aufgabe zum Backlog hinzu
      setNewProject("");
      setShowInput(false)}}>
      <label>Enter a project name</label>
      <input className="projectInput" name='NewProject' type='text' value={newProject} onChange={(e) => setNewProject(e.target.value)} placeholder='Alpha' required/>
    </form>}
        { !showInput && <button className="addButton" onClick={() =>setShowInput(!showInput)}>Add</button>}

    </div>
  )
}

export default ProjectMenu