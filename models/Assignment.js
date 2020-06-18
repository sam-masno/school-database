const uuid = require('uuid');
class Assignment{
    constructor(title, content) {
        this.id = uuid.v4();
        this.title = title;
        this.content = content;
        this.dateIssued = new Date(Date.now()).toLocaleDateString();
        this.dateDue = new Date(Date.now() + (7 * 24 * 60 * 60 * 1000)).toLocaleDateString();
    }

    next = null;
    prev = null;
}

module.exports = Assignment;