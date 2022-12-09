import{Component} from 'react';
import './search-panel.css'

class SearchPanel extends Component {
    constructor(props){
        super(props)
        this.state = {
            term: ''
        }
    }

    onUpdateSearch = (e) => {
        this.setState({term: e.target.value})
        this.props.onUpdateSearch(e.target.value)
    }
    
    render(){
        return(
            <input 
                type="text"
                className = 'form-control search-input'
                placeholder = 'Найти сотрудника' 
                onChange={this.onUpdateSearch}
                value = {this.state.term}/>
        )
    }

}

export default SearchPanel;