const { SchoolRosterEntry } = require('./SchooRosterEntry');

class Student extends SchoolRosterEntry {
    constructor(firstName, lastName, classId){
        super(firstName, lastName)
        this.classId = classId;
    }
    role = "student";
}

module.exports = Student
