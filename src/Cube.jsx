import React, { Component } from "react";
import  "./Cube.css";
import ReactDOM from 'react-dom';



class Cube extends Component {

    constructor(props) {
        super(props);
        this.state = {
            firstSection: props.firstSection,
            secondSection:props.secondSection,
           // cube: createDomino()
            key: ''


        };
/*
        function createDot() {
            const dot = React.createElement('div');
            dot.classList.add('dot');
            return dot
        }

        function createSection () {
            const section = React.createElement('div')
            for (let i = 0; i < this.state.firstSection; i++) {
                let dot = createDot();
                section.appendChild(dot);
            }
            section.classList.add('section', 'section' + this.state.firstSection);
            return section
        }

        function createDomino () {
            const domino = React.createElement('div');
            domino.classList.add('domino');
            var fs = createSection();
            const hr = React.createElement('hr');
            var ss = createSection();
            domino.appendChild(fs);
            domino.appendChild(hr);
            domino.appendChild(ss);
            return domino
        }





*/

    }
    render() {
        return (
            <div className='domino' >
                <p>{this.state.firstSection}</p>
                <div className='hr'></div>
                <p>{this.state.secondSection}</p>
            </div>
        );
    }
}
export default Cube;