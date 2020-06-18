module.exports = {
    //add node helper
    addNode(newNode){
        this.userTable[newNode.id] = newNode;
        this.adjacentList[newNode.id] = [];
        this.nodeCount++;
    },

    //validate and create undirected edge between two nodes
    addEdge(first, second) {
        if(!first || !second) {
            console.log('Provide two verteces');
            return false;
        }
        if(first === second) {
            console.log('Cannot connect node to self');
            return false;
        } 

        if(!this.adjacentList[first]) {
            console.log(first, ' does not exist');
            return;
        }
        if(!this.adjacentList[second]) {
            console.log(second, ' does not exist');
            return;
        }
        
        this.adjacentList[first].push(second);
        this.adjacentList[second].push(first);
    },

    // show connections of a specific user
    showConnections(vertex, print) {
        let connections = this.adjacentList[vertex].join(', ');
        if(print) console.log(vertex, connections);
        return connections;
    },

    //remove connection between users
    removeEdge(first, second){
        let list = this.adjacentList;
        list[first] = list[first].filter(vertex => vertex !== second)
        list[second] = list[second].filter(vertex => vertex !== first);
    },

    //check user is in userTable
    validateUser(userId) {
        if(!this.userTable[userId]) throw new Error('User does not exist');
        return true
    },

    //make sure 
    validateClass(userId) {
        if(!userId)throw new Error('User not provided to validateClass')
        const classId = this.userTable[userId].classId;
        if(!classId) throw new Error('User is not assigned a class')
        return classId
    },

    //implement a sort of bfs type search feature
    // if findOne is true, return first element, else return array of matches
    searchUsersByPropertyBFS(property, value, findOne = false){
        if(!property || !value) throw new Error('Include desired prop and value')
        if(!this.startSearch) throw new Error('Database is empty');
        //declare matches found, currentNode for tracking, seen to avoid repetition, and queue to keep track of connections waiting to be checked
        let matches = [];
        let currentNode;
        let seen = {};
        let queue = [];
        queue.push(this.startSearch);
        while(queue.length) {
            console.log('iteration')
            currentNode = queue.pop();//pop next in queue, add to seen, check if matches prop/value
            seen[currentNode] = true;
            if(this.userTable[currentNode][property] === value) {
                matches.push(this.userTable[currentNode]);
                if(findOne) break;
            }
            this.adjacentList[currentNode].forEach(connection => {
                if(!seen[connection]) seen[connection] = true;
                if(!seen[connection]) queue.push(connection);
            })
            currentNode = null;//nullify in case none found
        }
        //check if findOne, return current if true else return matches
        if(currentNode || matches.length) {//return node that broke or matches
            return findOne ? this.userTable[currentNode] : matches;
        } else {//no match was found
            throw new Error('No users found');
        }
    },

    //implement simple iterative search
    searchUsersByProperty(property, value) {
        const Users = Object.keys(this.userTable);
        const matches = []
        Users.forEach(user => {
            if(this.userTable[user][property] === value) {
                matches.push(this.userTable[user])
            }
        })
        if(matches.length) return matches
        throw new Error('No users found')
    }
}