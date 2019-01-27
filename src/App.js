import React,{Component} from 'react';
import ReactDOM from 'react-dom';
import Main from './pages/Main';

class App extends Component {

    render() {
        return (
            <div>
                <Main/>
            </div>
        )
    }
}


const appCont = document.getElementById('app');

if(appCont) {
    ReactDOM.render(
        <App/>, appCont
    )
}


