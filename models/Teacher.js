const { SchoolRosterEntry } = require('./SchooRosterEntry');
const uuid = require('uuid')

class Teacher extends SchoolRosterEntry {
    constructor(firstName, lastName){
        super(firstName, lastName)
        //this is used to track assignments in classAssignmentsTable
        this.classId = uuid.v4();
    }
    role = "teacher";
}

module.exports = Teacher

