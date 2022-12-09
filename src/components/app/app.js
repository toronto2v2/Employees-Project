import {Component} from 'react'
import './app.css'
import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployeesList from '../employees-list/employees-list';
import EmployeesAddForm from '../employees-add-form/employees-add-form';



class App  extends Component{
    constructor(props){
        super(props)

        this.state = {
            data : [
                {name: 'Alex L', salary: 800, increase: false, rise: true, id: 1},
                {name: 'Jason R', salary: 1200, increase: false, rise: false, id: 2},
                {name: 'Anna O', salary: 15000, increase: false, rise: false, id: 3},
            ],
            term: '',
            filter: 'all',
        }

        this.dataIndex = 4;
    }

    

    deleteItem = (id) => {
        this.setState(({data}) => {
            const newState = data.filter(item => item.id !== id)
            return {data: newState}
        })
    }


    addItem = (name, salary) => {
        this.setState(({data}) => ({
            data: [...data, {name, salary, increase: false, rise: false, id: this.dataIndex++,}]
        }))
    }

    onToggleProp = (e, id, prop) => {
        if (e.code === 'Space'){
            e.preventDefault()
        }
        if (e.type === 'click' || e.code === 'Enter' || e.code === 'Space'){
            this.setState(({data}) => {
                const newArr =  data.map(item => item.id === id ? {...item, [prop]: !item[prop]} : {...item})
                return {data: newArr}
             })
        }

    }


    searchEmp = (items, term) => {
        if(term.length === 0){
            return items;
        }

        return items.filter(item => {
            return item.name.includes(term)
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term})
    }

    onFilter = (items, filter) => {
        switch(filter){
            case 'rise':
                return items.filter(item => item.rise)
            case 'moreThan1000':
                return items.filter(item => item.salary > 1000)
            default: return items
        }
    }

    onFilterSelect = (filter) => {
        this.setState({filter})
    }

    render( ) {
        const {data, term, filter } = this.state;
        const employeesForIncrease = data.filter(item => item.increase).length
        const visibleData = this.onFilter(this.searchEmp(data, term), filter)
    
        return(
            <div className="app">
                <AppInfo
                    employeesQuantity = {this.state.data.length}
                    employeesForIncrease = {employeesForIncrease}/>
    
                <div className="search-panel">
                    <SearchPanel
                        onUpdateSearch = {this.onUpdateSearch}/>
                    <AppFilter
                        filter = {filter}
                        onFilterSelect = {this.onFilterSelect}/>
                </div>
    
                <EmployeesList 
                    data = {visibleData}
                    onDelete = {this.deleteItem}
                    onToggleProp = {this.onToggleProp}
                />
    
                <EmployeesAddForm
                    onAddItem = {this.addItem}/>
            </div>
        );
    }
}

export default App;