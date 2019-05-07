import React, { Component } from "react";
import Cube from './Cube.jsx'

class CubeList extends Component {
    constructor() {
        super();
        this.state = {
           deck: []

        };
    }





    render() {
        this.state.deck.push(<Cube firstSection={3}  secondSection={4}/>);
        this.state.deck.push(<Cube firstSection={6}  secondSection={6}/>);


        return (
            <div>
                <h1>This is the cube list</h1>
                <p>{this.state.deck[0]}</p>
                <p>{this.state.deck[1]}</p>


            </div>
        );
    }
}
export default CubeList;