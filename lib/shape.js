const SVG = require('./svg');
const colors = require('colors');

class Shape extends SVG {
    constructor(shape = 'square', color = 'white') {
    super(shape, color);
    this.shape = shape;
    this.color = color;
    }
    draw() {
        console.log('this needs to be run on one of the children of the shape class');
    }
    setColor(){
        this.color = color
    }
}

class Circle extends Shape {

    draw() {
        return `<circle cx="150" cy="100" r="60" fill="${this.color}"/>`
    }
  
}

class Triangle extends Shape {

    draw() {
        return `<polygon points="50,10 10,90 90,90" fill="${this.color}"/>`;
         
    }
}

class Square extends Shape {
   
    draw() {
        return `<rect x="90" y="40" width="120" height="120" fill="${this.color}"/>`
       
    }
}

class Star extends Shape {

    draw() {
        return `<polygon points="${generateStarPoints(100, 100, 5, 80, 40)}" fill="${this.color}" />`
    }
}

function generateStarPoints(cx, cy, spikes, outerRadius, innerRadius) {
    let rot = (Math.PI / 2) * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;
  
    let points = '';
  
    for (let i = 0; i < spikes; i++) {
      x = cx + Math.cos(rot) * outerRadius;
      y = cy + Math.sin(rot) * outerRadius;
      points += `${x},${y} `;
  
      rot += step;
  
      x = cx + Math.cos(rot) * innerRadius;
      y = cy + Math.sin(rot) * innerRadius;
      points += `${x},${y} `;
  
      rot += step;
    }
  
    return points;
  }


module.exports = {Circle, Triangle, Square, Star};