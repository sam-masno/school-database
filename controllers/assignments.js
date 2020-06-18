//controller for assignments queue in graph
const Assignment = require('../models/Assignment');

module.exports = {
    //***  classAssignmentTable is sorted by classId but user id is used for consistency in requests */
    //use teacher id to add assignment to relevant class queue
    // @ teacher
    enqueueAssignment(teacherId, title, content) {
        if(!teacherId || !title || !content) {
            throw new Error('Request in complete, include teacher id, title content')
        }
        this.validateUser(teacherId);
        //get classId
        const classId = this.validateClass(teacherId)
        //make new assignment
        const assignment = new Assignment(title, content);
        // find assignment table and add to queue
        return this.classAssignmentsTable[classId].enqueue(assignment);
    },

    //dequeue assignment from teacher's queue
    // @ teachers
    dequeueAssignment(teacherId) {
        // extract classId
        this.validateUser(teacherId)
        // if(!this.validateUser)
        const classId = this.validateClass(teacherId)
        return this.classAssignmentsTable[classId].dequeue();
    },

    //peek first assignment in user's class assignments queue
    //@ teachers students
    getNextAssignment(userId) {
        const classId = this.validateClass(userId);
        return this.classAssignmentsTable[classId].peek();
    },


}