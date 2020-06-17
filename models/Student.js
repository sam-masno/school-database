const { SchoolRosterEntry } = require('./SchooRosterEntry');

class Student extends SchoolRosterEntry {
    constructor(firstName, lastName){
        super(firstName, lastName)
    }
    role = "student";
}

module.exports = Student
