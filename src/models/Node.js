import { Colors } from '../helpers';

export default function NodeModel(row, col) {
  this.row = row; 
  this.col = col; 
  this.color = Colors.WHITE;
  this.neighbors = [];
  this.previous = null;
  this.f = Infinity;
  this.g = Infinity;
  this.h = Infinity;

  this.clearNode = function() {
    this.color = Colors.WHITE;
    this.neighbors = [];
    this.previous = null;
    this.f = Infinity;
    this.g = Infinity;
    this.h = Infinity;
  }

  this.setPath = function() {
    this.color = Colors.BLUE;
  }

  this.setOpen = function() {
    this.color = Colors.GREEN;
  }

  this.setClosed = function() {
    this.color = Colors.RED;
  }

  this.setStartNode = function() {
    this.color = Colors.ORANGE;
  }

  this.setEndNode = function() {
    this.color = Colors.TURQUOISE;
  }

  this.setBarrier = function() {
    this.color = Colors.BLACK;
  }

  this.isStartNode = function() {
    return this.color === Colors.ORANGE;
  }

  this.isEndNode = function() {
    return this.color === Colors.TURQUOISE; 
  }

  this.isBarrier = function () {
    return this.color === Colors.BLACK;
  }

  this.isEmpty = function() {
    return this.color === Colors.WHITE;
  }

  this.getPosition = function() {
    return { row: this.row, col: this.col };
  }

  this.getColor = function() {
    return this.color;
  }

  this.addNeighbors = function(board, totalRows, totalCols) {
    if(this.row < totalRows - 1 && ! (board[this.row + 1][this.col]).isBarrier()) {
      this.neighbors.push(board[this.row + 1][this.col]);
    }

    if(this.row > 0 && !(board[this.row - 1][this.col]).isBarrier()) {
      this.neighbors.push(board[this.row - 1][this.col]);
    }

    if(this.col < totalCols - 1 && !(board[this.row][this.col + 1]).isBarrier()) {
      this.neighbors.push(board[this.row][this.col + 1]);
    }

    if(this.col > 0 && !(board[this.row][this.col - 1]).isBarrier()) {
      this.neighbors.push(board[this.row][this.col - 1]);
    }
  }
}