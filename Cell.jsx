import React, { Component } from "react";
import Cube from "./Cube.jsx";
import  "./Cube.css";

class Cell extends Component {
    constructor(props) {
        super(props);
        this.state = {
            i: props.i,
            j: props.j,
            status: props.status,
            isValid: props.isValid,
            cube: props.cube,
            id: props.id,
            cellDirection: props.direction, //direction 1 = horizontal  direction 2 = vertical
            haveSameSections: props.haveSameSections,

        };
    }

    getCube()
        {
            if(this.props.cube)
           {
               return(<Cube firstSection={this.props.cube.firstSection}
                            secondSection={this.props.cube.secondSection}
                            key={this.props.cube.id}
                            id={this.props.cube.id}
                            direction = {this.props.direction}
                            isSelected = {this.props.cube.isSelected}
               />)
           }
        }

    onCellClick() {
        this.props.oncellclick(this.props.i, this.props.j);
    }


    render() {
        let x = '';
        if(this.props.direction === 2)
            x = 'direction';


        let newClass;
        if(this.props.cube)
            newClass = `cell ${this.props.isValid} ${x} overlay`;

        else
            newClass = `cell ${this.props.isValid} ${x} `;


        return (
            <div className = {newClass} id ={this.props.id} onClick = {this.onCellClick.bind(this)}>
               <div> {this.getCube()} </div>
            </div>
        );
    }
}


export default Cell;

