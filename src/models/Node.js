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
  this.f = 0;
  this.g = 0;
  this.h = 0;

  this.clearNode = function() {
    this.isStartNode = false; 
    this.isEndNode = false;
    this.isBarrier = false;
    this.color = Colors.WHITE;
  }

  this.addNeighbors = function(board, totalRows, totalCols) {

    const { row, col } = this;

    if(row < totalRows - 1) {

      const node = getNodeFromBoard(board, row + 1, col);
      
      if(node.isBarrier)
        this.neighbors.push(node);

    }

    if(row > 0) {

      const node = getNodeFromBoard(board, row - 1, col);

      if(node.isBarrier)
        this.neighbors.push(node);
    
    }

    if(col < totalCols - 1) {

      const node = getNodeFromBoard(board, row, col + 1);

      if(node.isBarrier)
        this.neighbors.push(node);

    }
    
    if(col > 0) {

      const node = getNodeFromBoard(board, row, col - 1);

      if(node.isBarrier)
        this.neighbors.push(node);

    }

  }
}