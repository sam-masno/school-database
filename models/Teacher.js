const { SchoolRosterEntry } = require('./SchooRosterEntry');

class Teacher extends SchoolRosterEntry {
    constructor(firstName, lastName){
        super(firstName, lastName)
    }
    role = "teacher";
}

module.exports = Teacher

