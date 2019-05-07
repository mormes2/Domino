import React, { Component } from "react";

class Cube extends Component {
    constructor(props) {
        super(props);
        this.state = {
            firstSection: props.firstSection,
            secondSection:props.secondSection,

        };
    }
    render() {
        return (
            <div>
                <p>{this.state.firstSection}</p>
                <p>{this.state.secondSection}</p>

            </div>
        );
    }
}
export default Cube;