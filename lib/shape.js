const SVG = require('./lib/svg.js');

class Shape extends SVG {
    constructor(shape, color) {
    super(shape, color);
    this.shape = shape;
    this.color = color;
    }
    draw() {
        console.log('this needs to be run on one of the children of the shape class');
    }
}

class Circle extends Shape {
    constructor(shape, color) {
        super(shape, color);
        this.shape = shape;
        this.color = color;
    }
    draw() {
        return `<circle cx="150" cy="100" r="80" fill="${this.color}"/>`
    }
}

class Triangle extends Shape {
    constructor(shape, color) {
        super(shape, color);
        this.shape = shape;
        this.color = color;
    }
    draw() {
        return `<polygon points="50,10 10,90 90,90" fill="${this.color}"/>`;
         
    }
}

class Square extends Shape {
    constructor(shape, color) {
        super(shape, color);
        this.shape = shape;
        this.color = color;
    }
    draw() {
        return `<rect x="90" y="40" width="120" height="120" fill="${this.color}"/>`
       
    }
}

class Star extends Shape {
    constructor(shape, color) {
        super(shape, color);
        this.shape = shape;
        this.color = color;
    }
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