import React, { Component } from "react";
import Cube from "./Cube.jsx";
import Cell from "./Cell.jsx";
import "./Cube.css";


class Player extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playerId: props.id,
            hand:[],
            newCard : null,
            current : props.currentPlayer,
            startingCubes: null,
            score:0,
            lastSelectedCubeIndex: null,
            startDate : new Date(),
            numberOfStartedGames: []


        };

    }

    getPlayerHand()
    {
        return (this.state.hand);
    }

    //This function gets the card that was popped from stack and adds it to the hand array
    addCardToPlayerHand(newCard)
    {
        this.state.hand.push({
            firstSection: newCard.props.firstSection,
            secondSection: newCard.props.secondSection,
            key: newCard.key,
            id: newCard.props.id,
            onCubeClick: newCard.props.onCubeClick,
            isSelected:'notSelected'

        });
        this.props.changeTurn();
        this.forceUpdate();
    }

    //This function gets (from myApp) the id of the cube that was clicked by the user.
    getSelectedCube(cardToPop) {
        let popCard = null;
        let index=-1;

        for(let i=0; i<this.state.hand.length;i++)
        {
            if(this.state.hand[i].id===cardToPop)
            {
                index = i;
                popCard = this.state.hand[i];
                this.state.hand[i].isSelected = 'selected';

            }
            else
                 this.state.hand[i].isSelected = 'notSelected';
        }
        this.forceUpdate();
        return {cube:popCard,
            cubeIndex:index};
    }

    popTheSelectedCardFromPlayerHand(index)
    {
        this.state.hand.splice(index, 1);
        this.forceUpdate();
        if(this.state.hand.length===0)
        {
            this.props.gameOver('win');
        }
    }


    scoreCalculate()
    {
        let cubesNum = this.state.hand.length;
        let cubesSum =0;
        if(this.state.hand.length>0)
        {
            for(let i=0;i<cubesNum;i++)
            {
                cubesSum+= this.state.hand[i].firstSection+this.state.hand[i].secondSection;
            }
        }
        return cubesSum;

    }

    initPlayer()
    {
        this.state.hand = [];
        this.state.numberOfStartedGames =[];
    }



    render() {
        if(!(this.props.initHand === null) && this.state.hand.length === 0 && this.state.numberOfStartedGames.length === 0)
        {
            let myStack =  this.props.initHand[(this.state.playerId)-1];
            for(let i=0;i< this.props.initHand[(this.state.playerId)-1].length;i++)
            {
                this.state.hand.push({
                    firstSection: myStack[i].props.firstSection,
                    secondSection: myStack[i].props.secondSection,
                    id: myStack[i].props.id,
                    key:myStack[i].key,
                    onCubeClick: myStack[i].props.onCubeClick,
                    isSelected:'notSelected'
                })
            }
            this.state.numberOfStartedGames.push(1);
        }


        return (
            <div className='component handComponent'>
                <div className='dominoes'>
                    {
                        this.state.hand.map((cube)=> {return <Cube
                            firstSection={cube.firstSection}
                            secondSection={cube.secondSection}
                            id = {cube.id}
                            key = {cube.key}
                            onCubeClick = {cube.onCubeClick}
                            isSelected={cube.isSelected }
                        />;})
                    }
                </div>
                <br/>
                <p>My score {this.scoreCalculate()}</p>
            </div>)
    }
}
export default Player;