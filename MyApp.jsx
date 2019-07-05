import React, { Component } from "react";
import Stack from "./Stack.jsx";
import Player from "./Player.jsx";
import Statistics from "./Statistics.jsx";
import BoardGame from "./BoardGame.jsx";



class MyApp extends Component {
    constructor(props) {
        super(props);
        this.player1 = React.createRef();//player1 ref
        this.boardGameRef = React.createRef();
        this.stackRef = React.createRef();
        this.stopWatchRef =React.createRef();
        this.state = {
            lastPoppedCard:null, //The last card that was popped from the player
            currentPlayer: null,
            numberOfPlayers:1,
            allInitialStacks: null, //Arr that contains the initial stacks for each player [{6 cubes for player 1},{6 cubes for player 2}...]
            playersStats: [], //Arr that contains statistic object for each player [{stats of player 1},..]
            gameOver: false,
            statistics:[],
            statstatesCurrentIndex:[],
            stackOutOfCubes:false,
            gameOverStatus: '' // (win/loss)
        };
        this.initPlayersStats();
    }

    //This function creates statistics object for each player and push it to the playersStats
    initPlayersStats()
    {
        this.state.playersStats =[];
        for(let i=0; i<this.state.numberOfPlayers;i++)
        {
            let newPlayerStats = {
                // key: `player${i+1}`,
                numberOfMoves:0,
                startTime: new Date(),
                takingFromStack:0,
                avgTime: 0
            };
            this.state.playersStats.push(newPlayerStats);
        }
    }

    changeTurn()
    {
        this.updateStatistics(this.state.currentPlayer);
        let playerHand =this.player1.current.getPlayerHand();
        //console.log("ChaneTurn MyApp hand" , playerHand );
        this.boardGameRef.current.checkValidCells(playerHand);

    }
    //Updates the current player statistics when the turn is over
    updateStatistics(currentPlayer)
    {
        let endWhiteTurn = new Date();
        let total_seconds = (this.state.playersStats[currentPlayer-1].startTime.getTime() - endWhiteTurn.getTime()) / 1000;
        this.state.playersStats[currentPlayer-1].startTime = endWhiteTurn;
        this.state.playersStats[currentPlayer-1].numberOfMoves++;
        this.turnDuration(total_seconds,currentPlayer);
        let obj = this.state.playersStats[currentPlayer-1];
        this.state.statistics.push(JSON.stringify(obj));
        this.forceUpdate();
    }
    //This function calculates the current turn time duration
    turnDuration(total_seconds,currentPlayer)
    {
        let seconds = Math.abs(total_seconds);
        seconds+= 0.5;
        let averageTime =(this.state.playersStats[currentPlayer-1].avgTime+seconds)/this.state.playersStats[currentPlayer-1].numberOfMoves;
        this.state.playersStats[currentPlayer-1].avgTime = Math.round(averageTime);
    }


    onStackClick(newCard) //gets object of the pulled cube from the stack
    {
        this.state.playersStats[this.state.currentPlayer-1].takingFromStack++;
        this.player1.current.addCardToPlayerHand(newCard);
        this.boardGameRef.current.changeGameTurn();
    }

    onCubeClick(cardID) //pass the cube object from player hand to boardGame
    {
        let newCube = this.player1.current.getSelectedCube(cardID);
        this.boardGameRef.current.addNewCard(newCube.cube,newCube.cubeIndex);
    }
    //This function receive arr of stacks for each player
    initPlayersStacks(allStacks)
    {
        this.setState({allInitialStacks:allStacks, currentPlayer:1} ,
            function () {
                this.forceUpdate();
            });
    }

    initGame()
    {
        this.stackRef.current.initStack();
        this.player1.current.initPlayer();
        this.initPlayersStats();
        this.stopWatchRef.current.initStopWatch();
        this.boardGameRef.current.initBoard();
        this.setState({gameOver:false,stackOutOfCubes:false,gameOverStatus:''},function ()
        {
            this.forceUpdate();
        });
    }

    //After the player try to locate cube on the board, the cube object is passed to the boardgame.
    //The board game check if the player tried to locate the cube in valid cell. If so, the cube is popped from the player
    popTheSelectedCardFromPlayerHand(index)
    {
        this.player1.current.popTheSelectedCardFromPlayerHand(index);
    }
    //This function receive the game over status:  win \ lose and perform the following:
    //1. Stop the game watch  2.updates the gameOver status 3.operate the myGameOver function in boardGame
    gameOver(status)
    {
        this.boardGameRef.current.myGameOver();
        this.stopWatchRef.current.gameOverStatistics();
        this.state.statstatesCurrentIndex.push((this.state.statistics.length)-1);
        this.setState({gameOver: true, gameOverStatus:status},function (){
            this.forceUpdate();

        })
    }

    //This function receive the side that was clicked on the "prev/next" buttons
    onChangeBoardState(side)
    {
        this.boardGameRef.current.changeBoardStates(side);
        this.changeStatsStates(side);

    }
    //This function change the statistics section when the player clicks on "prev/next" buttons
    changeStatsStates(side)
    {

        let statesIndex = this.state.statstatesCurrentIndex[0];
        if(side === 'left')//move back
        {
            if((statesIndex)-1 >= 0)
            {
                this.state.playersStats = [];
                this.state.playersStats.push(JSON.parse(this.state.statistics[statesIndex-1]));
                this.state.statstatesCurrentIndex[0] = statesIndex-1;
                this.forceUpdate();

            }
        }

        if(side === 'right')//move forward
        {
            if((statesIndex)+1 <= this.state.statistics.length-1)
            {
                this.state.playersStats = [];
                this.state.playersStats.push(JSON.parse(this.state.statistics[statesIndex+1]));
                this.state.statstatesCurrentIndex[0] = statesIndex+1;
                this.forceUpdate();
            }
        }
    }
    //This function is executed when the stack is empty and update the board game
    stackOutOfCubs()
    {
        this.boardGameRef.current.updateStackOutOfCubs();
        this.setState({stackOutOfCubes:true},function ()
        {
           this.forceUpdate();
        });
    }
    //This function returns a relevant div with winning\losing message when the game is over
    gameOverMsg() {
        //console.log("gameOverMsg");
        if(this.state.gameOver)
        {
            if(this.state.gameOverStatus==='win')
            return (
                <div className='gameOver'>you won</div>

            )
            else
            {
                return (
                    <div className='gameOver'>you lose</div>

                )
            }
        }
        else
        {
            return (
                <div></div>

            )
        }

    }


    render() {

        let handAndStackClass;
        let stackClass;
        if(this.state.gameOver|| this.state.stackOutOfCubes)
        {
            handAndStackClass = `handAndStack`;
            //handAndStackClass = `handAndStack overlay`;
            stackClass = 'overlay';
        }
        else
        {
            handAndStackClass = `handAndStack`;
            stackClass ='';

        }

        return (

            <div>
                <BoardGame ref={this.boardGameRef}
                           changeTurn = {this.changeTurn.bind(this)}
                           popTheSelectedCardFromPlayerHand = {this.popTheSelectedCardFromPlayerHand.bind(this)}
                           gameOver = {this.gameOver.bind(this)}
                />
                <div>{this.gameOverMsg()}</div>


                <div className = {handAndStackClass}>
                    <Player newCard = {this.state.lastPoppedCard}
                            currentPlayer ={this.state.currentPlayer}
                            id={1} initHand={this.state.allInitialStacks}
                            ref={this.player1}
                            changeTurn = {this.changeTurn.bind(this)}
                            gameOver = {this.gameOver.bind(this)}


                    />
                    <div className = {stackClass}>
                        <Stack stackClick={this.onStackClick.bind(this)}
                               initStacks={this.initPlayersStacks.bind(this)}
                               numOfPlayers={this.state.numberOfPlayers}
                               onCubeClick={this.onCubeClick.bind(this)}
                               stackOutOfCubs={this.stackOutOfCubs.bind(this)}
                               ref ={this.stackRef}

                        /></div>
                    <div className='newGameComponent'>
                    <button className= 'button2' onClick={this.initGame.bind(this)} ><img id={"img2-holder"} src="newGame.png"/>
                    </button></div>


                    <Statistics numberOfMoves={this.state.playersStats[0].numberOfMoves}
                                takingFromStack={this.state.playersStats[0].takingFromStack}
                                avgTime={this.state.playersStats[0].avgTime}
                                changeBoardState = {this.onChangeBoardState.bind(this)}
                                ref = {this.stopWatchRef}>

                    </Statistics>

                </div>

            </div>
        );
    }
}
export default MyApp;