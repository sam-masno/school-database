const { addNewTeacherToAdministrator, connectAdminAndTeacher, addAdministrator } = require('./controllers/admin');
const { validateClass, validateUser,removeEdge, showConnections, addEdge, addNode, searchUsersByPropertyBFS, searchUsersByProperty } = require('./controllers/graphUtils');
const { removeTeacherAndStudents, addNewStudentToTeacher, addTeacherToAClass } = require('./controllers/teachers');
const { removeStudent } = require('./controllers/students');
const { enqueueAssignment, dequeueAssignment, getNextAssignment } = require('./controllers/assignments');

const util = require('util');

/*
GRAPH FLOW
1.Users are stored in in hash table by their id. There are the classes of user, Admin, Teacher, and Student

2. Adjacent list is a hash table (representing each user) in which each hash value is an array of strings. Each string is an id of another user to which there is a connection

3.ClassAssignmentsTable is a hashtable with a spot for each class (group of teacher and students). The value for each hash is a Queue data structure that holds Assignment objects;  

4. StartSearch is the id of the first Admin node entered.

5. Admin users can be added independently. Teachers must be added under an admin and students under a teacher. After creation there is no upward limit of connections between user types. 
*/

class Graph {
    constructor() {
        //total count of nodes
        this.nodeCount = 0;
        //make hash table for user objects
        this.userTable = {}
        // contain edge lists by SchoolRosterEntry id
        this.adjacentList = {};
        //hold queues representing class assignments. seperated by classId of Teacher model
        this.classAssignmentsTable = {};
        //hold designated admin node to start search
        this.startSearch = null;
    }
    
    //base graph utils - located in ./controllers/graphUtils
    removeEdge = removeEdge.bind(this);
    showConnections = showConnections.bind(this);
    addEdge = addEdge.bind(this);
    addNode = addNode.bind(this);
    validateUser = validateUser.bind(this);
    validateClass = validateClass.bind(this);
    searchUsersByPropertyBFS = searchUsersByPropertyBFS.bind(this)
    searchUsersByProperty = searchUsersByProperty.bind(this)

    //admin related functions - located in ./controllers/admin
    //Admin model located in ./models/Admin
    addNewTeacherToAdministrator = addNewTeacherToAdministrator.bind(this);
    connectAdminAndTeacher = connectAdminAndTeacher.bind(this);
    addAdministrator = addAdministrator.bind(this);

    //teacher related functions - located in ./controllers/teachers
    //Teacher model located in ./models/Teacher
    removeTeacherAndStudents = removeTeacherAndStudents.bind(this);
    addNewStudentToTeacher = addNewStudentToTeacher.bind(this);
    addTeacherToAClass = addTeacherToAClass.bind(this);

    //student functions - located in ./controllers/students
    //Student model located in ./models/Student
    removeStudent = removeStudent.bind(this);

    //assignmentQueue functions - located in ./controllers/assignments
    //AssignmentQueue model located in ./models/AssignmentQueue
    //Assignment model located in ./models/Assignemtn
    enqueueAssignment = enqueueAssignment.bind(this);
    dequeueAssignment = dequeueAssignment.bind(this);
    getNextAssignment = getNextAssignment.bind(this);
}

const graph = new Graph();

//test block for adding/removing users
try {
    const admin = graph.addAdministrator('sam', 'admin')
    const admin2 = graph.addAdministrator('zonks', 'bonks')
    const teacher = graph.addNewTeacherToAdministrator(admin.id, 'teacher', '1111');
    const teacher2 = graph.addNewTeacherToAdministrator(admin.id, 'teacher2', '22222');
    const teacher3 = graph.addNewTeacherToAdministrator(admin.id, 'teacher3', '33333');  
    graph.connectAdminAndTeacher(admin2.id, teacher.id)
    graph.addNewStudentToTeacher(teacher.id, 'aa', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'bb', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'cc', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'dd', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'ee', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'ff', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'gg', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'hh', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'ii', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'jj', 'student')
    graph.addNewStudentToTeacher(teacher.id, 'kk', 'student')
    graph.addTeacherToAClass(teacher.id, teacher2.id)

    console.log(graph.searchUsersByPropertyBFS('role', 'student'))
    // console.log('search results', graph.searchUsersByProperty('role', 'student'))

    // graph.enqueueAssignment(teacher.id, 'test assignment', { content: 'content'})
    // graph.enqueueAssignment(teacher2.id, 'test assignment 1', { content: 'content'})
    // graph.enqueueAssignment(teacher2.id, 'test assignment 2', { content: 'content'})
    // graph.enqueueAssignment(teacher2.id, 'test assignment 3', { content: 'content'})
    // graph.dequeueAssignment(teacher2.id)
    // graph.removeTeacherAndStudents(teacher.id, true)
} catch (error) {
    console.log(error.message)
}

// console.log(util.inspect(graph, { showHidden: false, depth: null, colors: true}))

module.exports = graph