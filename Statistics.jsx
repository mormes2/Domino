import React, { Component } from "react";
import StopWatch from "./StopWatch.jsx";


class Statistics extends Component {
    constructor(props) {
        super(props);
        this.stopWatchRef =React.createRef();
        this.state = {
            numberOfMoves:props.numberOfMoves,
            takingFromStack:props.takingFromStack,
            avgTime: props.avgTime,
            buttonsVisible: false
        };
    }

    initStopWatch()
    {
        //console.log("initStopWatch stats");
        this.stopWatchRef.current.initStopWatch();
        this.setState({buttonsVisible: false},function (){
        this.forceUpdate();
        }

        )
    }

    //The game is over, this function updates the statistics to "game over" mode
    gameOverStatistics()
    {
        //console.log("gameOverStatistics");
        this.stopWatchRef.current.stopWatch();
        this.setState({buttonsVisible:true})

    }
    //This function is executed when the player clicks on "PREV " button
    changeBoardLeft()
    {
        //console.log("changeBoardState left");
        this.props.changeBoardState("left");
    }
    //This function is executed when the player clicks on "NEXT" button
    changeBoardRight()
    {
        //console.log("changeBoardState right");
        this.props.changeBoardState("right");
    }

    getButtonClassName()
    {
      if(this.state.buttonsVisible)
      {
          return ''
      }
      else
      {
          return 'buttonHidden'
      }
    }



    render() {

        let buttonClassName =  this.getButtonClassName();
        return (

            <div className='component statisticsComponent'>
                <div className = 'text'>Average turn duration: {this.props.avgTime} </div>
                <br/>
                <div className = 'text'>Taking from stack: {this.props.takingFromStack}</div>
                <br/>
                <div className = 'text'>Number of moves: {this.props.numberOfMoves}</div>
                <br/>
                <div className = 'text'>
                    <StopWatch className='buttonNewGame' ref={this.stopWatchRef}/>
                </div>
                <div>
                    <button className={buttonClassName} id={'leftButton'} onClick={this.changeBoardLeft.bind(this)} >PREV </button>
                    <button className={buttonClassName} id={'rightButton'} onClick={this.changeBoardRight.bind(this)} >NEXT </button>

                </div>
            </div>
        );
    }
}
export default Statistics;

