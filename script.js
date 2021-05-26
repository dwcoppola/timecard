localStorage.id === undefined ? localStorage.id = '0' : false;

class Employee {

    constructor(name, rate) {
        this.id = '';
        this.name = name,
        this.latestIn = '',
        this.latestOut = '',
        this.status = false,
        this.rate = rate
    }

    toString = () => {
        return this.name;
    }

    punchIn = () => {
        if (this.status !== true) {
            this.latestIn = (new Date).toString().slice(0, 24);
            this.latestOut = '';
            this.status = true;
        } else {
            alert(`You're already punched in`)
        }
    }

    punchOut = () => {
        if (this.status !== false) {
            this.latestOut = (new Date).toString().slice(0, 24);
            this.status = false;
        } else {
            alert(`You're already punched out`)
        }
    }

    latestShift = () => {
        if (this.latestIn === '') {
            alert('Error')
        } else if (this.latestOut === '') {
            alert('error')
        }
        return ((Date.parse(this.latestOut) - Date.parse(this.latestIn)) / 60000 * (Number(this.rate) / 60)).toFixed(2);
    }

    save = () => {
        localStorage[`employee-${this.id}`] = 
            `{"id": "${this.id}", "name": "${this.name}", "latestIn": "${this.latestIn}", ` + 
            `"latestOut": "${this.latestOut}", "status": ${this.status}, "rate": "${this.rate}"}`        
    }

    delete = () => {
        localStorage.removeItem(`employee-${this.id}`);
    }

}

function incrementID() {
    localStorage.id = Number(localStorage.id) + 1;
}

function addEmployee(name, rate) {
    if (name === undefined || rate === undefined) {
        alert('You must provide both a name and rate of pay (USD / hour)');
    } else {
        const employee = new Employee(name, rate);
        localStorage[`employee-${localStorage.id}`] = 
            `{"id": "${localStorage.id}", "name": "${employee.name}", "latestIn": "${employee.latestIn}", ` + 
            `"latestOut": "${employee.latestOut}", "status": false, "rate": "${employee.rate}"}`
        employee.id = localStorage.id;
        incrementID();
        return employee;
    }
}

function getOneEmployee(id) {
    let data = JSON.parse(localStorage[`employee-${id}`]);
    let employee = new Employee(data.name, data.rate);
    employee.id = data.id;
    employee.latestIn = data.latestIn;
    employee.latestOut = data.latestOut;
    employee.status = data.status;
    employee.rate = data.rate;
    return employee;
}

function getAllEmployees() {
    let output = [];
    for (let i = 0; i < localStorage.id; i++) {
        let employee = getEmployee(i);
        output.push(employee);
    }
    return output;
}
