import { ReactNode } from "react";
import './KanbanColumn.css'


interface Props{
    heading: string;
    onAddClick?: () => void;
    children: ReactNode;
}


function KanbanColumn({heading,onAddClick, children}: Props) {
    let headingClass;
  if (heading === "Backlog") {
  headingClass = "columnHeading todo";
} else if (heading === "Doing") {
  headingClass = "columnHeading doing";
} else {
  headingClass = "columnHeading done";
}

  return (
    <div className="columnContainer">
      <div className={headingClass}>
        <h2>{heading}</h2>
      </div>
        {children}
        {heading === "Backlog" ? <button className="addButton" onClick={onAddClick}>Add</button> : null}
    </div>
  )
}

export default KanbanColumn