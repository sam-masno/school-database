const uuid = require('uuid');

class SchoolRosterEntry {
    constructor(firstName, lastName){
        // this.id = uuid.v4();
        //use below version of id for easier human readable testing 
        this.id = `${firstName}${lastName}`
        this.firstName = firstName;
        this.lastName = lastName;
    }
    //messages will be a hashtable using id of users then array of messages
    messages = {}
}

module.exports.SchoolRosterEntry = SchoolRosterEntry;