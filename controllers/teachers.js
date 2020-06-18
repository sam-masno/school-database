const Student = require('../models/Student');

module.exports = {
    // remove teacher and if removeStudents true will remove students under that teacher
    removeTeacherAndStudents(teacherId, removeStudents = false) {
        if(!teacherId || this.userTable[teacherId].role !== 'teacher') return 'Not a teacher'
        if(removeStudents) {
            //loop through teacher connection list, delete if role === student
            this.adjacentList[teacherId].forEach(connection => {
                if(this.userTable[connection].role === 'student') {
                    delete this.userTable[connection];
                    delete this.adjacentList[connection];
                    this.nodeCount--;
                } else {
                    this.adjacentList[connection] = this.adjacentList[connection].filter(userId => {
                        return userId !== teacherId;
                    })
                }
            })
        } else {
            this.adjacentList[teacherId].forEach(connection => {
                this.adjacentList[connection] = this.adjacentList[connection].filter( userId => {
                    userId !== teacherId}
                )
            })
        }

        // delete teacher adacent list
        delete this.userTable[teacherId];
        //delete teacher from table
        delete this.adjacentList[teacherId];
        this.nodeCount--;
    },

    //add a new student to existing teacher
    addNewStudentToTeacher(teacherId, firstName, lastName) {
        //make node,
        const classId = this.userTable[teacherId].classId; 
        const newStudent = new Student(firstName, lastName, classId);
        this.addNode(newStudent);
        this.addEdge(teacherId, newStudent.id);
        return newStudent;
    },

    //add newTeacherId to oldTeacherClass, copies students and admin
    //@teachers
    addTeacherToAClass(oldTeacherId, newTeacherId) {
        //validate teachers
        this.validateUser(oldTeacherId);
        this.validateUser(newTeacherId)
        // copy oldTeacherId's student edeges to newTeacherId
        this.adjacentList[newTeacherId] = [ ...this.adjacentList[oldTeacherId]]
        //add teacher to each student's list
        this.adjacentList[newTeacherId].forEach(connection => {
            this.adjacentList[connection].push(newTeacherId);
        })
        //modify newTeacherId classid
        this.userTable[newTeacherId].classId = this.userTable[oldTeacherId].classId
    }
}