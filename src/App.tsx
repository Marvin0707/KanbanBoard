import { useState, useEffect } from 'react';
import './App.css'
import ProjectInstance from './components/ProjectInstance';
import ProjectMenu from './components/ProjectMenu';

function App() {

  const retrieveFromLocalStorage = (key:string, defaultValue:string[]) => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  };

  const [isMenuOpen,setMenuOpen] = useState(false)
  const [projects,setProjects] = useState(retrieveFromLocalStorage('projects',["My first project"]))
  const [activeProject, setActiveProject] = useState(projects[0])
  const addProject = (project:string) => {
    setProjects([...projects, project])
}

 useEffect(() => {
  localStorage.setItem('projects', JSON.stringify(projects));
}, [projects]);

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