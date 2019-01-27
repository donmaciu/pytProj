const { PythonShell } = require('python-shell');
const uniqueString = require('unique-string');

let isReading = false;

const cleanup = () => {
    return new Promise((resolve, reject) => {
        PythonShell.run('Cleanup.py', { mode:'text', scriptPath: __dirname, pythonPath: '/usr/bin/python2.7', pythonOptions: ['-u'] }, (err, results) => {

            if(err) {
                return reject({code: 500, error: "script_err", inner: err});
                //console.log(err)
                
            }
            //console.log(results)
            resolve(results);
        })
    })
}

const readCard = () => {
    return new Promise((resolve, reject) => {
        console.log("Reading",isReading)
        if(isReading) {
            return reject({code: 500, error: "device_busy"});
        }

        isReading = true;

        PythonShell.run('Read.py', { mode:'text', scriptPath: __dirname, pythonPath: '/usr/bin/python2.7', pythonOptions: ['-u'] }, (err, results) => {
            isReading = false;

            if(err) {
                return reject({code: 500, error: "script_err", inner: err});
                //console.log(err)
                
            }
            //console.log(results)
            resolve(results);
        })
    })
}

let readTasks = {}

class ReadCardTask {
    constructor(timeout) {
        this.id = uniqueString();
        readTasks[this.id] = this;
        this.values = [];
        this.err = [];


        this.pyshell = null;

        this.start();

        if(timeout > 0) {
            setTimeout(() => { this.terminate() }, timeout)
        }
    }

    isTerminated() {
        if(!this.pyshell) {
            return false;
        }

        return this.pyshell.terminated;
    }

    start() {
        this.pyshell = new PythonShell('Read.py', { mode:'text', scriptPath: __dirname, pythonPath: '/usr/bin/python2.7'})

        this.pyshell.on('message', (message) => {
            this.values.push(message);
        } )

        this.pyshell.on('stderr', (err) => {
            this.err.push(err);
        })


        this.pyshell.end(() => {})
    }

    terminate() {
        console.log(this.id, 'termination...')

        if(!this.pyshell) {
            return;
        }

        this.pyshell.terminate();

        cleanup()
        .then(res => {

        })
        .catch(err => {
            console.log(err)
        })
        
    }

    getResult() {
        return this.values;
    }
}

/**
 * 
 * @param {String} id 
 * @param {*} inTask 
 */
const readCardTask = (id, inTask, timeout) => {
    /** @type {ReadCardTask} */
    let task = null;



    if(id && !readTasks[id]) {
        throw new Error('not_found');
    } else if(id) {
        task = readTasks[id];
        console.log('intask',inTask)
        if(task.isTerminated() === false && inTask && inTask.terminated === true) {
            task.terminate();
        }

    } else {
        task = new ReadCardTask(timeout);
    }


    let retTask = {
        id: task.id,
        results: task.values,
        errs: task.err,
        terminated: task.isTerminated()
    }

    return retTask;
}

const writeCard = data => {
    return new Promise((resolve, reject) => {
        if(!data || data.length === 0) {
            return reject({code: 400, error: "empty_data"})
        }

        PythonShell.run('Write.py', { mode:'text', scriptPath: __dirname, pythonPath: '/usr/bin/python2.7', pythonOptions: ['-u'], args: [data] }, (err, results) => {

            if(err) {
                return reject({code: 500, error: "script_err", inner: err});
                //console.log(err)
                
            }
            //console.log(results)
            resolve(results);
        })
    })
}

module.exports = {
    readCard: readCard,
    writeCard: writeCard,
    cleanup: cleanup,
    readCardTask: readCardTask,
}