import React from 'react';
import ReactDOM from 'react-dom';
import Deck from './Deck.jsx';
import Statistics from './Statistics.jsx'
import Cube from './Cube.jsx';
import BoardGame from './BoardGame.jsx';
import Player from "./Player.jsx";

const App = () => (
    <div>
        <Deck />
        <Statistics/>
        <BoardGame />
        <Cube />
        <Player />


    </div>
);

ReactDOM.render(<App />, document.getElementById("root"));
