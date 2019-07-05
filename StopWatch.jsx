import React, {Component} from "react";

class StopWatch extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            min: 0, sec: 0,  ms: 0,
            isRunning: false, hasStarted: false
        }
    }
    componentDidMount() {
        setInterval(()=> {
            if (this.state.isRunning) {
                let ms = this.state.ms;
                let sec = this.state.sec;
                let min = this.state.min;
                if (ms < 100) this.setState({ms: ms+1});
                else this.setState({sec: sec+1, ms: 0});
                if (sec > 59) this.setState({min: min+1, sec: 0});
            }
        }, 10);
    }
    handleClick(button){
        let running = this.state.isRunning;
        if (button === "toggle") {
            this.setState({isRunning: !running, hasStarted: true})
        } else if (button === "reset") {
            this.setState ({min: 0, sec: 0, ms: 0});
            this.setState({isRunning: false, hasStarted: false})
        }

        else if(button === "stop")
        {
            this.setState({isRunning: false, hasStarted: true})
        }
    }

    stopWatch()
    {
        console.log("StoptheWatch");
        this.setState({isRunning: false, hasStarted: true});

    }

    initStopWatch()
    {
        console.log("initStopWatch");
        this.setState ({min: 0, sec: 0, ms: 0});
        this.setState({isRunning: false, hasStarted: false});
    }
    fNum(e){
        return (e).toLocaleString(undefined, {minimumIntegerDigits: 2})
    }
    render() {
        return (
            <div className="stopwatch">
                <Time
                    min={this.fNum(this.state.min)}
                    sec={this.fNum(this.state.sec)}
                    ms={this.fNum(this.state.ms)}>
                </Time>
                <TimeControls
                    onClick={(button)=>this.handleClick(button)}
                    isRunning={this.state.isRunning}
                    hasStarted={this.state.hasStarted}>
                </TimeControls>
            </div>
        )
    }
}

function Time(props){
    return (
        <div className="time">
            {props.min}:{props.sec}:{props.ms}
        </div>
    )
}



function TimeControls(props) {
    let start =() => props.onClick("toggle");
    if(props.hasStarted===false)
    {
        start();
    }




    return (
        <div className="controlButtons">


        </div>
    )
}



export default StopWatch;
