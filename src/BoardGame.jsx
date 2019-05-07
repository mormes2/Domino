import React, { Component } from "react";

class BoardGame extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    render() {
        return (
            <div>
                <p>BoardGame component</p>

            </div>
        );
    }
}
export default BoardGame;