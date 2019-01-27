const { PythonShell } = require('python-shell');

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
}