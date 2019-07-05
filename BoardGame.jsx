import React, {Component} from "react";
import Cell from './Cell.jsx'
import Cube from './Cube.jsx'
import  "./Cube.css";
import Stack from "./Stack.jsx";


const NumOfCols = 13;
const NumOfRows = 13;
const cordRow = 3;
const cordCol = 6;

class BoardGame extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playBoard:[], //Array of cells
            cardToAdd: null, //The last cube that was chosen by the player and need to be added to the board
            cardToAddIndex: null, //The last cube index the user chose and need to be added to the board
            stuckOutOfCubes: false,
            playBoardStates:[],
            playBoardStatesCurrentIndex: [] //the index of current playboard state which displayed
        };
        this.createBoard();
    }

    //This function crates the board game. Each cell is initiate with default parameters
    initBoard()
    {
        this.state.playBoard = [];
        this.state.playBoardStates = [];
        this.state.playBoardStatesCurrentIndex = [];
        this.createBoard();
    }

    createBoard() {

        this.state.playBoard = new Array(NumOfRows);
        for (let i = 0; i < NumOfRows; i++) {
            this.state.playBoard[i] = new Array(NumOfCols);
            for (let j = 0; j < NumOfCols; j++) {
                this.state.playBoard[i][j] = {
                    key: `cell-${i}-${j}`,
                    status: 'free',
                    id: `cell-${i}-${j}`,
                    isValid: 'inValid',
                    cube:null,
                    i: i,
                    j: j,
                    direction: 0, //If the cell has cube, the direction mention the cube's direction. (direction 1 = vertical , direction 2 = horizontal, direction 0 = the cell is empty)
                    numInSection: null, //If the cell is valid, 'numInSection' mention which number should be located on it
                    whichSecNeeded: '', //which section is the 'numInSection' (can be firstSection OR secondSection)
                    haveSameSections: 0, //0 = false, 1 = true
                }
            }
        }

        //Make the first cell [7][7] valid
        this.state.playBoard[cordRow][cordCol].isValid = 'valid';
        this.state.playBoard[cordRow][cordCol].direction = 1;
    }

    //This function receives the last cube that was chosen by the player from 'MyApp' , turns it into object and update the 'cardToAdd' state
    addNewCard(newCard,cubeIndex)
    {
        let newCube = {
            firstSection: newCard.firstSection,
            secondSection: newCard.secondSection,
            key: newCard.key,
            id: newCard.id,
            cubeDirection: 0,
            isSelected: ''
        };
        this.setState({cardToAdd: newCube, cardToAddIndex:cubeIndex});
    }


    //Once a cell was clicked , this function receives the i,j locations,
    //and checks if the cube that the player was selected can be located on the board.
    onCellClick(cube_i , cube_j)
    {
        if(this.state.cardToAdd) //if the user selected a card
        {
            //In the first turn, locate the last cube as is and update the cell state
            if(cube_i === cordRow && cube_j === cordCol) {
                if(this.isCubeCanBeLocatedOnTheCell(cube_i,cube_j)) {
                    this.state.playBoard[cube_i][cube_j].cube = this.state.cardToAdd ;
                    this.onCellClickHelper(cube_i, cube_j);
                }
            }
            //If this is not the first turn, locate the last cube after adjustment and update the cell state
            else {
                if(this.isCubeCanBeLocatedOnTheCell(cube_i,cube_j)) {
                    let cube = this.adjustCubeToCell(this.state.cardToAdd,cube_i,cube_j);

                    this.state.playBoard[cube_i][cube_j].cube = cube ;
                    this.onCellClickHelper(cube_i, cube_j);
                }
            }
        }
    }

    //This is a helper function, changing the relevant cell to be taken, setting the relevant porps and changing turn
    onCellClickHelper(cube_i, cube_j){

        this.state.playBoard[cube_i][cube_j].isValid = 'inValid';
        this.state.playBoard[cube_i][cube_j].status = 'taken';

        if (this.state.cardToAdd.firstSection === this.state.cardToAdd.secondSection)
        {
            this.state.playBoard[cube_i][cube_j].haveSameSections = 1;

        }


        this.props.popTheSelectedCardFromPlayerHand(this.state.cardToAddIndex);
        this.setState({cardToAdd: null});
        this.changeGameTurn();
    }


    //This function manage the validation process of the board cells, by calling smaller functions
    checkValidCells(playerHand)
    {

        for(let i=0; i<NumOfRows ; i++) {
            for(let j=0; j<NumOfCols ; j++) {
                if(this.checkSpecificCell(i,j,'up')) {
                    if(this.searchForRelevantCube(this.state.playBoard[i-1][j].numInSection,playerHand)) {
                        this.state.playBoard[i-1][j].isValid = 'valid';
                        this.state.playBoard[i-1][j].direction = 1;
                    } else
                        this.state.playBoard[i-1][j].isValid = 'inValid';
                }

                if(this.checkSpecificCell(i,j,'down')) {
                    if(this.searchForRelevantCube(this.state.playBoard[i+1][j].numInSection,playerHand)) {
                        this.state.playBoard[i+1][j].isValid = 'valid';
                        this.state.playBoard[i+1][j].direction = 1;
                    } else
                        this.state.playBoard[i+1][j].isValid = 'inValid';
                }

                if(this.checkSpecificCell(i,j,'left')) {
                    if(this.searchForRelevantCube(this.state.playBoard[i][j-1].numInSection,playerHand)) {
                        this.state.playBoard[i][j-1].isValid = 'valid';
                        if (this.state.playBoard[i][j-1].haveSameSections === 0){
                            this.state.playBoard[i][j-1].direction = 2;
                        } else
                            this.state.playBoard[i][j-1].direction = 1;
                    }
                    else
                        this.state.playBoard[i][j-1].isValid = 'inValid';
                }

                if(this.checkSpecificCell(i,j,'right')) {
                    if(this.searchForRelevantCube(this.state.playBoard[i][j+1].numInSection,playerHand)) {
                        this.state.playBoard[i][j+1].isValid = 'valid';
                        if (this.state.playBoard[i][j+1].haveSameSections === 0){
                            this.state.playBoard[i][j+1].direction = 2;
                        } else
                            this.state.playBoard[i][j-1].direction = 1;
                    } else
                        this.state.playBoard[i][j+1].isValid = 'inValid';
                }
            }

        }
        //In case that the stack is over and there are no valid cells on board, the game is over
        if(!(this.checkIfValidCellOnBoard())&&this.state.stuckOutOfCubes)
        {
            this.props.gameOver("loss"); //operate gameOver function in myApp
        }
        this.forceUpdate();
    }


    //This function receive the game over statue and updates myApp
    myGameOver()
    {
        this.state.playBoardStatesCurrentIndex.push((this.state.playBoardStates.length)-1);
        this.forceUpdate();
    }

    changeBoardStates(side)
    {

        let statesIndex = this.state.playBoardStatesCurrentIndex[0];
        if(side === 'left')//move back
        {
            if((statesIndex)-1 >= 0)
            {
                this.setState({playBoard:JSON.parse(this.state.playBoardStates[statesIndex-1])},function(){
                    this.state.playBoardStatesCurrentIndex[0] = statesIndex-1;
                    this.forceUpdate();
                });
            }
        }

        if(side === 'right')//move forward
        {
            if((statesIndex)+1 <= this.state.playBoardStates.length-1){
                this.setState({playBoard:JSON.parse(this.state.playBoardStates[statesIndex+1])},function(){
                    this.state.playBoardStatesCurrentIndex[0] = statesIndex+1;
                    this.forceUpdate();
                });
            }
        }
    }
    //This function receives a cell[i][j] that wad chosen by the player and checks if 'cardToAdd' (the last cube that was popped) can be located on it
    //Conditions : 1.the cell is free
    //             2.the cell is valid in this turn
    //             3.One of the cube sections match to the  "numInSection" value
    isCubeCanBeLocatedOnTheCell(i,j) {
        //If this is the first turn, any cube can be located.
        if(i === cordRow && j === cordCol)
            return true;

        //If this is not the first turn
        else {
            if(this.state.playBoard[i][j].isValid === 'valid'&&this.state.playBoard[i][j].status === 'free') //If the cube is valid
            {
                if(this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection||this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection)
                    return true;
                else return false;
            }
            else return false;
        }

    }
    createCubeObj(cubeDir, i, j, rotate, cellDir){
        let newCube = null;
        if (!rotate){
            if (cubeDir === 1){
                newCube = {
                    firstSection: this.state.cardToAdd.firstSection,
                    secondSection: this.state.cardToAdd.secondSection,
                    key: this.state.cardToAdd.key,
                    id: this.state.cardToAdd.id,
                };
                this.state.playBoard[i][j].direction = cellDir;
                return newCube;
            }

            if (cubeDir === 2){
                newCube = {
                    firstSection: this.state.cardToAdd.firstSection,
                    secondSection: this.state.cardToAdd.secondSection,
                    key: this.state.cardToAdd.key,
                    id: this.state.cardToAdd.id,
                    cubeDirection: 2
                };
                this.state.playBoard[i][j].direction = cellDir;
                return newCube;
            }
        }
        else {
            if (cubeDir === 1){
                newCube = {
                    firstSection: this.state.cardToAdd.secondSection,
                    secondSection: this.state.cardToAdd.firstSection,
                    key: this.state.cardToAdd.key,
                    id: this.state.cardToAdd.id,
                };
                this.state.playBoard[i][j].direction = cellDir;
                return newCube;
            }

            if (cubeDir === 2){
                newCube = {
                    firstSection: this.state.cardToAdd.secondSection,
                    secondSection: this.state.cardToAdd.firstSection,
                    key: this.state.cardToAdd.key,
                    id: this.state.cardToAdd.id,
                    cubeDirection: 2
                };
                this.state.playBoard[i][j].direction = cellDir;
                return newCube;
            }
        }
    }
    //This function adjust the cube data according to the cell requirements and returns new Object of cube
    adjustCubeToCell(cube,i,j)
    {
        let newCube = null;

        //1. if the cube in the cell and the cube to add dont have the same sections and the cube in the cell is vertical
        if (this.state.playBoard[i][j].haveSameSections === 0) {                            //if the curr cube doesn't have the same sections
            if (this.state.cardToAdd.firstSection !== this.state.cardToAdd.secondSection) { //if card to add doesn't have the same sections
                if (this.state.playBoard[i][j].direction === 1) {                           //if the curr cube is vertical

                    //checking up:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(1, i, j, false, 1);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(1, i, j, true, 1);
                    }
                    //checking down:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(1, i, j, false, 1);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(1, i, j, true, 1);
                    }
                }
                //if the cube is horizontal
                if (this.state.playBoard[i][j].direction === 2) {

                    //checking left:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(2, i, j, false, 2);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(2, i, j, true, 2);
                    }
                    //checking right:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(2, i, j, false, 2);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(2, i, j, true, 2);
                    }
                }
            }

            //cube on the cell doesn't have the same section, cube to add have the same section and the cube is vertical
            if (this.state.cardToAdd.firstSection === this.state.cardToAdd.secondSection) { //if the card to add have the same sections
                if (this.state.playBoard[i][j].direction === 1) { //if the cube is vertical
                    //checking up & down:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection)
                        return this.createCubeObj(2, i, j, false, 2);
                }
                if (this.state.playBoard[i][j].direction === 2) {
                    //checking up & down:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection)
                        return this.createCubeObj(2, i, j, false, 1);
                }
            }
        }

        if (this.state.playBoard[i][j].haveSameSections === 1){
            if (this.state.cardToAdd.firstSection !== this.state.cardToAdd.secondSection){
                if (this.state.playBoard[i][j].direction === 1){
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(1, i, j, false, 1);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(1, i, j, true, 1);
                    }
                    //checking down
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(1, i, j, false, 1);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(1, i, j, true, 1);
                    }
                }
                if (this.state.playBoard[i][j].direction === 2){
                    //checking left:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(2, i, j, false, 2);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection){
                        if (this.state.playBoard[i][j].whichSecNeeded === 'firstSection')
                            return this.createCubeObj(2, i, j, true, 2);
                    }
                    //checking right:
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.secondSection) {
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(2, i, j, false, 2);
                    }
                    if (this.state.playBoard[i][j].numInSection === this.state.cardToAdd.firstSection){
                        if (this.state.playBoard[i][j].whichSecNeeded === 'secondSection')
                            return this.createCubeObj(2, i, j, true, 2);
                    }
                }
            }
        }
    }

    //When the stack is out of cubes, Myapp execute this function in order to update stuckOutOfCubes state
    updateStackOutOfCubs()
    {
        this.setState({stuckOutOfCubes:true},function ()
        {
            {
               if(!(this.checkIfValidCellOnBoard()))
               {
                   console.log("GameOver");
               }
            }
        });

    }
    //This function returns 'True' is there a valid cell on board, else return false.
    checkIfValidCellOnBoard()
    {
        for (let i = 0; i < NumOfRows; i++)
        {
            for (let j = 0; j < NumOfCols; j++)
            {
                if(this.state.playBoard[i][j].isValid==='valid')
                {
                    return true;
                }
            }
        }

        return false;

    }
    changeGameTurn() {
        this.state.playBoardStates.push(JSON.stringify(this.state.playBoard));
        this.props.changeTurn();
    }

    //This function receives a number to to search in the player's hand
    searchForRelevantCube(numberForSearch, playerHand)
    {
        let found;
        found = playerHand.find((item)=> (item.firstSection===numberForSearch || item.secondSection===numberForSearch) );
        return (found);
    }


    //This functions receives a cell[i][j] and direction ,and checks for every cell with a cube if the surrounding cells in the direction are valid
    //if the cube's sections are the same and it doesn't matter if it's vertical or horizontal
    //if the cub's sections aren't the same:
    //                  if the cube is vertical - check up and down
    //                  if the cube is horizontal - check left and right
    checkSpecificCell(i,j,dir) {   //Checks the cell above the cell[i][j]
        if (this.state.playBoard[i][j].haveSameSections === 1) { //if the cube's sections are equal
            if (this.state.playBoard[i][j].status === 'taken') { //if the cell holds a cube and it's vertical or horizontal
                if (dir === 'up') { //check the cell above this cell
                    if (((i - 1) >= 0) && (this.state.playBoard[i - 1][j].status === 'free')) { //if the above cell is empty
                        this.state.playBoard[i - 1][j].numInSection = this.state.playBoard[i][j].cube.firstSection;
                        this.state.playBoard[i - 1][j].whichSecNeeded = 'secondSection';
                        return true;
                    }

                } if (dir === 'down') { //check the cell under
                    if (((i + 1) < NumOfCols) && (this.state.playBoard[i + 1][j].status === 'free')) { //if the cell under is empty
                        this.state.playBoard[i + 1][j].numInSection = this.state.playBoard[i][j].cube.secondSection;
                        this.state.playBoard[i + 1][j].whichSecNeeded = 'firstSection';
                        return true;
                    }

                } if (dir === 'right') { //check the cell to the right
                    if (((j + 1) < NumOfCols) && (this.state.playBoard[i][j + 1].status === 'free')) {
                        this.state.playBoard[i][j + 1].numInSection = this.state.playBoard[i][j].cube.firstSection;
                        this.state.playBoard[i][j + 1].whichSecNeeded = 'secondSection';
                        return true;
                    }
                } if (dir === 'left') { //check the cell to the left
                    if (((j - 1) >= 0) && (this.state.playBoard[i][j - 1].status === 'free')) {
                        this.state.playBoard[i][j - 1].numInSection = this.state.playBoard[i][j].cube.secondSection;
                        this.state.playBoard[i][j - 1].whichSecNeeded = 'firstSection';
                        return true;
                    }
                }

            }
        } if (this.state.playBoard[i][j].haveSameSections === 0) { //if the cube doesn't have the same sections
            if (this.state.playBoard[i][j].status === 'taken') { //if the cell holds a cube
                if (this.state.playBoard[i][j].direction === 1) { //if  the cube is vertical
                    if (dir === 'up') {
                        if (((i - 1) >= 0) && (this.state.playBoard[i - 1][j].status === 'free')) { //if the above cell is empty
                            this.state.playBoard[i - 1][j].numInSection = this.state.playBoard[i][j].cube.firstSection;
                            this.state.playBoard[i - 1][j].whichSecNeeded = 'secondSection';
                            return true;
                        }
                    }  if (dir === 'down') {
                        if (((i + 1) < NumOfCols) && (this.state.playBoard[i + 1][j].status === 'free')) { //if the cell under is empty
                            this.state.playBoard[i + 1][j].numInSection = this.state.playBoard[i][j].cube.secondSection;
                            this.state.playBoard[i + 1][j].whichSecNeeded = 'firstSection';
                            return true;
                        }
                    }
                }  if (this.state.playBoard[i][j].direction === 2) { // if the cube is horizontal
                    if (dir === 'right') {
                        if (((j + 1) < NumOfCols) && (this.state.playBoard[i][j + 1].status === 'free')) {
                            this.state.playBoard[i][j + 1].numInSection = this.state.playBoard[i][j].cube.firstSection;
                            this.state.playBoard[i][j + 1].whichSecNeeded = 'secondSection';
                            return true;
                        }
                    } if (dir === 'left') {
                        if (((j - 1) >= 0) && (this.state.playBoard[i][j - 1].status === 'free')) {
                            this.state.playBoard[i][j - 1].numInSection = this.state.playBoard[i][j].cube.secondSection;
                            this.state.playBoard[i][j - 1].whichSecNeeded = 'firstSection';
                            return true;
                        }
                    }
                } else return false;
            }
        }
    }

    render()
    {
        return (
            <div className='board' id='playBoard'>
                {   this.state.playBoard.map( ( row ) => {
                    return row.map( ( cell ) => {
                        return  <Cell status={cell.status}
                                      id={cell.id +' '+cell.isValid}
                                      cube={cell.cube}
                                      isValid = {cell.isValid}
                                      j={cell.j}
                                      i = {cell.i}
                                      oncellclick = {this.onCellClick.bind(this)}
                                      direction = {cell.direction}
                                      key = {cell.id}
                        />;
                    } );
                },this )}
            </div>
        );
    }
}


export default BoardGame;



