import React, { Component } from "react";

class Cube extends Component {
    constructor() {
        super();
        this.state = {
            firstSection: "",
            secondSection:"",
            line:""

        };
    }
    render() {
        return (
            <div>
                <p>Cube component</p>

            </div>
        );
    }
}
export default Cube;