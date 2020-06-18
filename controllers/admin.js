const Administrator = require('../models/Administrator');
const Teacher = require('../models/Teacher');
const AssignmentsQueue = require('../models/AssignmentsQueue')

module.exports = {
    //add new teacher and connect to administrator
    addNewTeacherToAdministrator(administratorId, firstName, lastName) {
        //make new node, add to table and list, init assignments queue, add edge to administrator
        this.validateUser(administratorId)
        const newTeacher = new Teacher(firstName, lastName);
        this.addNode(newTeacher);
        this.classAssignmentsTable[newTeacher.classId] = new AssignmentsQueue();
        this.addEdge(administratorId, newTeacher.id);
        return newTeacher;
    },

    // add existing admin to existing teacher
    connectAdminAndTeacher(adminId, teacherId) {
        this.validateUser(adminId);
        this.validateUser(teacherId);
        this.addEdge(adminId, teacherId);
    },

    // create new administrator
    addAdministrator(firstName, lastName) {
        const newAdmin = new Administrator(firstName, lastName);
        this.addNode(newAdmin);
        if(!this.startSearch) this.startSearch = newAdmin.id
        return newAdmin;
    }
}