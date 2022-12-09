
import EmployeesListItem from "../employees-list-item/employees-list-item"
import './employees-list.css'

const EmployeesList = ({data, onDelete, onToggleProp}) => {
    const elements = data.map (item => {
        const{id, ...elseProps} = item;
        return (
            
            // <EmployeesListItem name = {item.name} salary = {item.salary}/>
            <EmployeesListItem 
                key = {id}
                {...elseProps} 
                onDelete = {() => onDelete(id)}
                onToggleProp = {(e) => onToggleProp(e, id, e.currentTarget.getAttribute('data-toggle'))}
            />
            
        )
    })

    return (
        <ul className="app-list list-group">
            {elements}
        </ul>
    )
}
export default EmployeesList;


