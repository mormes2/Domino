import React, { Component } from "react";

class Deck extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    render() {
        return (
            <div>
                <p>I am the Deck component </p>
            </div>
        );
    }
}
export default Deck;