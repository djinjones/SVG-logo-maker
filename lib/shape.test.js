const { Circle, Triangle, Square, Star } = require('./shape');
const SVG = require('./svg');
const fs = require('fs');
describe('Shape drawing', () => {
    test('Circle should draw correctly', () => {
        const circle = new Circle();
        const svgContent = circle.draw();
        expect(svgContent).toContain('<circle');
        expect(svgContent).toContain('cx="150"');
    });
    test('Triangle should draw correctly', () => {
        const triangle = new Triangle();
        const svgContent = triangle.draw();
        expect(svgContent).toContain('<polygon');
        expect(svgContent).toContain('points="100,10 10,190 190,190"')
    });
    test('Square should draw correctly', () => {
        const square = new Square();
        const svgContent = square.draw();
        expect(svgContent).toContain('<rect');
        expect(svgContent).toContain('x="90"');
    });

    test('Star should draw correctly', () => {
        const star = new Star();
        const svgContent = star.draw();
        expect(svgContent).toContain('<polygon');
    });
});


// I used AI to help me see what different types of tests i could run on the svg file 
describe('SVG Generation', () => {
    test('SVG file should contain correct content based on user input', async () => {
        const userInput = {
            shape: 'circle',
            letters: 'ABC',
            shapeColor: 'red',
            letterColor: 'blue'
        };

        // Mocking file created to capture SVG content
        const writeFileMock = jest.spyOn(fs, 'writeFile').mockImplementation((filename, data, callback) => {
            // Asserting SVG content based on user input
            expect(data).toContain('<circle');
            expect(data).toContain('fill="red"');
            expect(data).toContain('<text x="50" y="150" fill="blue">ABC</text>');
            // Add more assertions as needed for other shapes and properties
            // Call the callback to simulate writing to the file
            callback(null);
        });


        const svg = new SVG();

  
        await svg.run(userInput);


        expect(writeFileMock).toHaveBeenCalled();


        writeFileMock.mockRestore();
    });
});
// I found out that you can use jest to make a mock file to run a test. I think this is a lot better way of testing using jest than what we previously went over in class. 