import { Component } from 'react';
import './employees-add-form.css'

class EmployeesAddForm extends Component {
    constructor(props){
        super(props)

        this.state ={
            name: '',
            salary: '',
            namePlaceholder: 'Как его зовут?',
            salaryPlaceholder: 'З/П в $?',
            styleOfNameInput: {},
            styleOfSalaryInput: {}
        }

        
    }


    onValueChange = (e) => {
        this.setState(() => ({
            [e.target.name]: e.target.value
        }))
        console.log(this.state.name);
        const {name, salary} = this.state
        if (name.length <= 2 || name.search(/\d/g) !== -1){
            this.setState({styleOfNameInput: {border: '2px solid red'}})
        }else{
            this.setState({styleOfNameInput: {}})
        }

        if (salary.length <= 2 || salary.length > 5){
            this.setState({styleOfSalaryInput: {border: '2px solid red'}})
        }else{
            this.setState({styleOfSalaryInput: {}})
        }

    }

    onSubmit = (e) => {
        e.preventDefault();
        const {onAddItem} = this.props;
        const {name, salary} = this.state
        
        if (name.length <= 2 || name.search(/\d/g) !== -1){
            this.setState({name: '', namePlaceholder: 'Введите корректное имя'})
        }
        if (salary.length <= 2 || salary.length > 5){
            this.setState({salary: '', salaryPlaceholder: 'Введите корректную з/п'})
        }
        if(name.length > 2 && name.search(/\d/g) === -1 && salary.length > 2 && salary.length <= 5){
            onAddItem(name, salary);
            this.setState({
                name: '',
                salary:'',
                namePlaceholder: 'Как его зовут?',
                salaryPlaceholder: 'З/П в $?'
            })

        }

    }


    render(){
        const{name, salary, namePlaceholder, salaryPlaceholder, styleOfNameInput,styleOfSalaryInput} = this.state;

        return (
            <div className="app-add-form">
            <h3>Добавьте нового сотрудника</h3>
            <form
                className="add-form d-flex"
                onSubmit={this.onSubmit}>
                <input type="text"
                    className="form-control new-post-label"
                    placeholder={namePlaceholder} 
                    value={name}
                    name = 'name'        
                    onChange = {this.onValueChange}
                    onInput = {this.validationName}
                    style = {styleOfNameInput}/>
                
                <input type="number"
                    className="form-control new-post-label"
                    placeholder= {salaryPlaceholder}
                    value={salary}
                    name = 'salary'        
                    onChange = {this.onValueChange}
                    style = {styleOfSalaryInput}/>
    
                <button type="submit"
                        className="btn btn-outline-light">Добавить</button>
            </form>
        </div>
        )
    }

}

export default EmployeesAddForm;