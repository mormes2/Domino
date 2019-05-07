import React, { Component } from "react";

class Statistics extends Component {
    constructor() {
        super();
        this.state = {
            title: ""
        };
    }
    render() {
        return (
            <div>
                <p>I am the Statistics component </p>
            </div>
        );
    }
}
export default Statistics;