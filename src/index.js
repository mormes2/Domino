import React from 'react';
import ReactDOM from 'react-dom';
import Cube from './Cube.jsx';
import BoardGame from './BoardGame.jsx';
import Player from "./Player.jsx";
import CubeList from "./CubeList.jsx";




const App = () => (
    <div>
        <CubeList/>

    </div>
)

ReactDOM.render(<App />, document.getElementById("root"))
