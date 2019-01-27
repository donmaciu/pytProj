import React,{Component} from 'react';


class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: ''
        }
    }

    pushButton(btn) {
        this.setState({value: this.state.value + btn})
    }

    render() {
        return (
            <div className='container flexCont'>
                <div className='row screen-header'>
                    <div className='col-sm-12'>{this.state.value}</div>
                </div>
                <div className='row button-con'>
                    <div className='col-sm-3 p-2 '><button className='btn btn-primary btn-block'>+</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(7)}>7</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(8)}>8</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(9)}>9</button></div>
                </div>
                <div className='row button-con'>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block'>+</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(4)}>4</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(5)}>5</button></div>
                    <div className='col-sm-3 p-2 '><button className='btn btn-primary btn-block' onClick={() => this.pushButton(6)}>6</button></div>
                </div>
                <div className='row button-con'>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block'>+</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(1)}>1</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(2)}>2</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block' onClick={() => this.pushButton(3)}>3</button></div>
                </div>
                <div className='row button-con'>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block'>+</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block'>*</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block'>0</button></div>
                    <div className='col-sm-3 p-2'><button className='btn btn-primary btn-block'>#</button></div>
                </div>
                <div className='row screen-footer'>
                    <div className='col-sm-12 p-2'><button className='btn btn-success btn-block'>SKANUJ</button></div>
                </div>
            </div>
            
        )
    }
}

export default Main