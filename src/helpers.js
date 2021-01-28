export const h = (p1, p2) => {
  const x1 = p1.row;
  const y1 = p1.col;

  const x2 = p2.row;
  const y2 = p2.col;

  return Math.abs(x1 - x2) + Math.abs(y1 - y2);
}

export const Colors = {
  RED: 'rgb(255, 0, 0)',
  GREEN:'rgb(0, 255, 0)',
  BLUE: 'rgb(0, 255, 0)',
  YELLOW: 'rgb(255, 255, 0)',
  WHITE: 'rgb(255, 255, 255)',
  BLACK: 'rgb(0, 0, 0)',
  PURPLE: 'rgb(128, 0, 128)',
  ORANGE: 'rgb(255, 165 ,0)',
  GREY: 'rgb(128, 128, 128)',
  TURQUOISE: 'rgb(64, 224, 208)'
}