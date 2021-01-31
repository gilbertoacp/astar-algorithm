import { Colors, getNodeFromBoard } from '../helpers';

export default function NodeModel(row, col) {
  this.row = row; 
  this.col = col; 
  this.isStartNode = false; 
  this.isEndNode = false;
  this.isBarrier = false;
  this.color = Colors.WHITE;
  this.neighbors = [];
  this.previous = null;

  this.clearNode = function() {
    this.isStartNode = false; 
    this.isEndNode = false;
    this.isBarrier = false;
    this.color = Colors.WHITE;
  }

  this.addNeighbors = function(board, totalRows, totalCols) {

    const { row, col } = this;

    if(row < totalRows - 1) {

      this.neighbors.push(
        getNodeFromBoard(board, row + 1, col)
      );

    }

    if(row > 0) {

      this.neighbors.push(
        getNodeFromBoard(board, row - 1, col)
      );
    
    }

    if(col < totalCols - 1) {

      this.neighbors.push(
        getNodeFromBoard(board, row, col + 1)
      );

    }
    
    if(col > 0) {

      this.neighbors.push(
        getNodeFromBoard(board, row, col - 1)
      );

    }

  }
}