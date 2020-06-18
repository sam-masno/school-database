module.exports = {
    //remove student from teacher
    removeStudent(studentId) {
        // validate student
        if(!studentId || ! this.userTable[studentId]) {
            return 'Student does not exist'
        }
        // get students teacher and remove connection
        const teacherId = this.adjacentList[studentId][0];
        this.adjacentList[teacherId] = this.adjacentList[teacherId].filter(connectionId => {
            return connectionId !== studentId;
        })
        // delete student from user table and list
        delete this.userTable[studentId];
        delete this.adjacentList[studentId];
        this.nodeCount--;
    }
}