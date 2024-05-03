
const SVG = require('./lib/svg');
const { Circle, Triangle, Square, Star } = require('./lib/shape');
const shapeClasses = { Circle, Triangle, Square, Star };

const svg = new SVG('circle', 'white', 'white', 'ABC', 'blue', shapeClasses);
svg.run();

