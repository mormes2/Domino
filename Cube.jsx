import React, { Component } from "react";
import  "./Cube.css";
import ReactDOM from 'react-dom';

class Cube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstSection: props.firstSection,
            secondSection:props.secondSection,
            key: ' ',
            id: props.id,
            cubeSum:  props.firstSection+props.secondSection,
            isSelected: '',
            direction:props.direction
        };
    }

    static createDot(dotsNum) {

        switch (dotsNum) {
            case 1:
                return(
                    <div className='section section1' >
                        <div className='dot'/>
                    </div>);
            case 2:
                return(
                    <div className='section section2' >
                        <div className='dot'/>
                        <div className='dot'/>
                    </div>);
            case 3:
                return(
                    <div className='section section3' >
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                    </div>);
            case 4:
                return(
                    <div className='section section4' >
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                    </div>);

            case 5:
                return(
                    <div className='section section5' >
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                    </div>);
            case 6:
                return(
                    <div className='section section6' >
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                        <div className='dot'/>
                    </div>);

            case 0:
                return(
                    <div className='section'/>
                )
        }
    }

    onCubeClick()
    {
        this.props.onCubeClick(this.state.id);
    }


    render() {
        let newClass = `domino ${this.props.isSelected} ${this.props.direction} `;

        return (
            <div className={newClass} onClick={this.onCubeClick.bind(this)} id={this.state.id}>
                {Cube.createDot(this.state.firstSection)}
                <div className='hr'/>
                {Cube.createDot(this.state.secondSection)}
            </div>
        );
    }
}


export default Cube;