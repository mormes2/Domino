import React, { Component } from "react";

class Player extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    render() {
        return (
            <div>
                <p>Player component</p>

            </div>
        );
    }
}
export default Player;