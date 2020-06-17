const { SchoolRosterEntry } = require('./SchooRosterEntry');

class Administrator extends SchoolRosterEntry {
    constructor(firstName, lastName){
        super(firstName, lastName)
    }
    role = "administrator";
}

module.exports = Administrator
