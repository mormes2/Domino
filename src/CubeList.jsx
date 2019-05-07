import React, { Component } from "react";
import Cube from './Cube.jsx'


class CubeList extends Component {
    constructor() {
        super();
        this.state = {
           deck: []

        };

        var decklist = this.state.deck;
    }

   render() {
        var newkey;
        for(var i=0; i<7;i++ )
        {
            for(var j=i; j<7;j++)
            {
                newkey = i+' '+j;
                this.state.deck.push(<Cube firstSection={i} secondSection={j} key={newkey} id={newkey}/>);
            }
        }

        return (
            <div>
                <h1>This is the cube list</h1>
                <p>The number of cubes {this.state.deck.length}</p>
                {this.state.deck}
            </div>
        );
    }
}
export default CubeList;