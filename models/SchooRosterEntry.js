const uuid = require('uuid');

class SchoolRosterEntry {
    constructor(firstName, lastName){
        this.id = uuid.v4();
        this.firstName = firstName;
        this.lastName = lastName;
    }
}

module.exports.SchoolRosterEntry = SchoolRosterEntry