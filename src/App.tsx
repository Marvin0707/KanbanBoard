import { useState } from 'react';
import './App.css'
import ProjectInstance from './components/ProjectInstance';
import ProjectMenu from './components/ProjectMenu';

function App() {

  const [isMenuOpen,setMenuOpen] = useState(false)
  const [projects,setProjects] = useState(["1","2","3"])
  const [activeProject, setActiveProject] = useState(projects[0])
  const addProject = (project:string) => {
    setProjects([...projects, project])

}

  return (
  <>
  <div className='appContainer'>
    <ProjectInstance activeProject={activeProject}/>
    {isMenuOpen && <ProjectMenu projects={projects} addProject={addProject} activeProject={activeProject} setActiveProject={setActiveProject}/>}
    <img src='menu_24dp_FILL0_wght400_GRAD0_opsz24.svg' className='menuButton' onClick={() => setMenuOpen(!isMenuOpen)}/>
  </div>

  </>
  )
}

export default App