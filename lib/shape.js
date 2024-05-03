const SVG = require('./svg');
const colors = require('colors');

class Shape extends SVG {
    constructor(shape = 'square', shapeColor1 = 'white', shapeColor2 = 'white') {
    super(shape, shapeColor1, shapeColor2);
    this.shape = shape;
    this.shapeColor1 = shapeColor1;
    this.shapeColor2 = shapeColor2
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
        if (this.shapeColor1 == this.shapeColor2) {
            return `<circle cx="100" cy="100" r="100" fill="${this.shapeColor1}"/>`
        } else {

        return `   
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${this.shapeColor1};stop-opacity:1" />
        <stop offset="100%" style="${this.shapeColor2};stop-opacity:1" />
        </linearGradient>
        <circle cx="100" cy="100" r="100" fill="url(#gradient)"/>`
        }
    }
}

class Triangle extends Shape {

    draw() {
        if (this.shapeColor1 == this.shapeColor2) {
            return `<polygon points="100,10 10,190 190,190" fill="${this.shapeColor1}"/>`
        } else {
        return `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${this.shapeColor1};stop-opacity:1" />
        <stop offset="100%" style="${this.shapeColor2};stop-opacity:1" />
        </linearGradient> 
        <polygon points="100,10 10,190 190,190" fill="url(#gradient)"/>`;         
        }
    }
}

class Square extends Shape {
   
    draw() {
        if (this.shapeColor1 == this.shapeColor2) {
            return `<rect x="0" y="0" width="200" height="200" fill="${this.shapeColor1}"/>`
        } else {
        return `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${this.shapeColor1};stop-opacity:1" />
        <stop offset="100%" style="${this.shapeColor2};stop-opacity:1" />
        </linearGradient>
        <rect x="0" y="0" width="200" height="200" fill="url(#gradient)"/> `
       }
    }
}

class Star extends Shape {

    draw() {
        if (this.shapeColor1 == this.shapeColor2) {
            return `<polygon points="${generateStarPoints(100, 100, 5, 80, 40)}" fill="${this.shapeColor1}"/>`
        } else {
        return `
        <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" style="stop-color:${this.shapeColor1};stop-opacity:1" />
        <stop offset="100%" style="${this.shapeColor2};stop-opacity:1" />
        </linearGradient>
        <polygon points="${generateStarPoints(100, 100, 5, 80, 40)}" fill="url(#gradient)"/>`
        }
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