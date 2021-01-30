import {Colors} from '../helpers';

export default function NodeModel(x, y) {
  this.row = x; 
  this.col = y; 
  this.isStartNode = false; 
  this.isEndNode = false;
  this.isBarrier = false;
  this.color = Colors.WHITE;

  this.clearNode = function() {
    this.row = x; 
    this.col = y; 
    this.isStartNode = false; 
    this.isEndNode = false;
    this.isBarrier = false;
    this.color = Colors.WHITE;
  }
}