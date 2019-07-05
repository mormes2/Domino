import React, { Component } from "react";
import Cube from './Cube.jsx';
import './Cube.css';


class Stack extends Component {
    constructor(props) {
        super(props);
        this.state = {
            stack: [],
            numberOfPlayers: props.numOfPlayers,
            numberOfStartCubes: 6
        };

        this.createNewStack();
        this.initPlayersStacks(this.state.numberOfPlayers);
    }
    //This function is executed when the player click on the stack button
    onStackClick() {
        if(this.state.stack.length !== 1)
        {
            let index = this.state.stack.length-1;
            let newStack = this.state.stack;
            let popCard = newStack.pop();
            this.props.stackClick(popCard); //operate the function in myApp
            this.setState({ stack : this.state.stack.filter((_, i) => i !== index)});
        }

        else
        {
            let index = this.state.stack.length-1;
            let newStack = this.state.stack;
            let popCard = newStack.pop();
            this.props.stackClick(popCard); //operate the function in myApp
            this.setState({ stack : this.state.stack.filter((_, i) => i !== index)});
            this.props.stackOutOfCubs();
        }
    }

    //This function creates stack with 28 initial cubes
    createNewStack()
    {
        let newKey;
        for(let i=0; i<7; i++)
        {
            for(let j=i; j<7; j++)
            {
                newKey = i+' '+j;
                this.state.stack.push(<Cube firstSection={i} secondSection={j} key={newKey} id={newKey} onCubeClick={this.props.onCubeClick}/>);
            }
        }
        shuffleStack(this.state.stack);
    }

    initStack()
    {
        this.state.stack = [];
        this.createNewStack();
        this.initPlayersStacks(this.state.numberOfPlayers);
    }


    //This function creates arr that contains stack for each player
    initPlayersStacks(numberOfPlayers)
    {
        let newStack = this.state.stack;
        let allStacks = [];
        let index;

        for(let i=1;i<=numberOfPlayers;i++)
        {
            let stack = [];
            for(let j=0;j<this.state.numberOfStartCubes;j++)
            {
                index = this.state.stack.length-1;
                stack.push(newStack.pop());
                this.state.stack.filter((_, i) => i !== index);
            }
            allStacks.push(stack);
        }
        this.props.initStacks(allStacks);
    }


    render() {
        return (
            <div className='component stackComponent'>
                <br/>
                <button className='button'  onClick={this.onStackClick.bind(this)}><img id={"img-holder"} src="newCube.png"/></button>
                <br/>
                <p>Number of cubes left {this.state.stack.length}</p>
            </div>
        );
    }
}


//This function shuffle the stack
function shuffleStack(stack) {
    let i, j, tmp;
    for (i = stack.length -1; i>0; i--){
        j = Math.floor(Math.random() * (i + 1));
        tmp = stack[i];
        stack[i] = stack[j];
        stack[j] = tmp;
    }
    return stack
}


export default Stack;