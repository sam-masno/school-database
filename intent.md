# School Graph
## Intent
1. Create a custom datastructure to organize school functionalities as described: 
* Administrators that have access to teachers
* Teachers that have access to students
* Students

# Data and functionality
1. Administrator
* Contain Admininstrator information
* Connected to other Administrators
* Contain a queue of tasks
* Disperse messages to teachers

2. Teachers 
* Contain teacher information
* Connected to Adminstrator and Students
* Give assignments to students

3. Students
* Contain student information
* Connected to at least one teacher
* Have access to queue of assignments

# Implementation
* Will be implemented with an undirected graph, nodes will be class based objects
1. Create Administrator, Student, and Teacher models
2. Start graph with new Administrator as root node
* Administrators can add Teachers, Teachers can add Students