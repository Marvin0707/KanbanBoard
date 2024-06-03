import './KanbanItem.css'
import { useState } from 'react';

interface Props{
    task: string;
    onDeleteClick?: () => void
    onMoveClick?: () => void
    column: string
}

function KanbanItem({task,onDeleteClick, onMoveClick, column}: Props) {
    const [isHovered, setIsHovered] = useState(false);



  return (
    <div className='itemContainer' onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
        <p className="task">{task}</p>
        {(column === "backlog" || column === "doing") && isHovered ? 
        <button className='itemButton' onClick={onMoveClick}>
        <img src='dist\assets\arrow_forward_24dp_FILL0_wght400_GRAD0_opsz24.svg'/>
        </button> : null}
        {column === "done" && isHovered ? 
        <button className='itemButton' onClick={onDeleteClick}>
            <img src='dist\assets\delete_24dp_FILL0_wght400_GRAD0_opsz24.svg' className='icon'/>
        </button> : null}
    </div>
  )
}

export default KanbanItem