class AssignmentQueue{
    constructor() {
        this.first = null;
        this.last = null;
        this.length = 0;
    }
    //enqueue - add a node to queue in last position
    enqueue(assignment) {
        //create node
        // const assignment = assignment;
        //check if first node being added
        if(this.length === 0) {
            this.first = assignment;
            this.last = this.first;
            this.length++;
            return assignment
        }

        //handle if not first node
        //assign newnode.next to last node
        this.last.prev = assignment;
        assignment.next = this.last;
        this.last = assignment
        //increment count
        this.length++
        console.log('Assignment enqueued')
        return assignment
    }

    //dequeue - remove a node from the first position
    dequeue() {
        //handle if no first
        if(!this.first) return null

        //handle if only node
        if(this.length === 1) {
            this.first = null;
            this.last = null
            this.length = 0
            return
        }
        //unlink first from second to last node
        this.first.prev.next = null;
        // reassign first node
        this.first = this.first.prev;
        this.length--;
        console.log('Assignment dequeued')
        return
    }
    //peek - return the first and last items
    peek(print) {
        if(print) console.log('1st:', this.first.value, 'last:', this.last.value)
        return (this.first)
    }

    //print queue
    print() {
        let node = this.first;
        while(node) {
            console.log(node);
            node = node.prev
        }
        console.log(this.length)
    }
}

// const queue = new AssignmentQueue()

// queue.enqueue('first', 'content')
// queue.enqueue('second', 'content')
// queue.enqueue('third', 'content')
// // queue.dequeue()
// queue.enqueue('fourth')
// queue.dequeue()
// queue.dequeue()
// queue.dequeue()
// queue.dequeue()

// queue.peek(true)

// queue.print()

module.exports = AssignmentQueue;