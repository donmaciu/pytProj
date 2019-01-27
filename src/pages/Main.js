import React,{Component} from 'react';
import { ScaleLoader } from 'react-spinners';


class Main extends Component {

    constructor(props) {
        super(props)

        this.state = {
            value: '',
            scanner: false,
            scannerTask: null,
        }
    }

    pushButton(btn) {
        this.setState({value: this.state.value + btn})
    }

    testScan(id) {
        fetch('/api/readTask/' + id)
        .then(res => {
            if(res.status === 200) {
                return res.json();
            } else {
                this.setState({scanner: false});

                window.clearInterval(this.task)
            }
        })
        .then(json => {
            if(json) {
                if(json.terminated && json.results) {
                    this.parseResult(json.results)

                    this.setState({scanner: false});
                    window.clearInterval(this.task)
                }
            }

            
        })
        .catch(err => {
            this.setState({scanner: false});
            window.clearInterval(this.task)
        })
    }

    parseResult(list) {
        if(list instanceof Array && list.length > 0) {
            this.setState({value: list[0]})
        }
    }

    startScanner() {
        fetch('/api/readTask?timeout=5000')
        .then(res => {
            if(res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if(json) {
                if(json.id) {
                    this.task = window.setInterval(() => this.testScan(json.id), 500);
                    this.setState({scanner: true})
                }
            }
        })
        .catch(err => {

        })
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
                    <div className='col-sm-12 p-2'>
                        <button className='btn btn-success btn-block' onClick={() => this.startScanner()}>
                            { this.state.scanner 
                                ? 
                               <ScaleLoader color='white' />
                                : 'SKANUJ' }
                        </button>
                    </div>
                </div>
            </div>
            
        )
    }
}

export default Main