const fs = require('fs');
const inquirer = require('inquirer');
const colors = require('colors');

class SVG {
    constructor(shape, shapeColor1, shapeColor2, letters, letterColor, ShapeClasses) {
        this.shape = shape;
        this.shapeColor1 = shapeColor1;
        this.shapeColor2 = shapeColor2
        this.letters = letters;
        this.letterColor = letterColor;
        this.ShapeClasses = ShapeClasses;
    }

    generateSVGContent() {
        let svgContent;
        switch (this.shape) {
            case 'circle':
                svgContent = new this.ShapeClasses.Circle('circle', this.shapeColor1, this.shapeColor2).draw();
                break;
            case 'triangle':
                svgContent = new this.ShapeClasses.Triangle('triangle', this.shapeColor1, this.shapeColor2).draw();
                break;
            case 'square':
                svgContent = new this.ShapeClasses.Square('square',this.shapeColor1, this.shapeColor2).draw();
                break;
            case 'star':
                svgContent = new this.ShapeClasses.Star('star',this.shapeColor1, this.shapeColor2).draw();
                break;
            default:
                svgContent = '';
        }
        svgContent += `<text font-size="40" x="36%" y="50%" fill="${this.letterColor}">${this.letters}</text>`;
        return svgContent;
    }

    run() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'shape',
                message: 'Which shape would you like to use?',
                choices: ['circle', 'triangle', 'square', 'star'],
                default: 'circle'
            },
            {
                type: 'input',
                name: 'letters',
                message: 'Choose three letters.',
                default: 'svg'
            },
            {
                type: 'input',
                name: 'shapeColor1',
                message: 'Choose the first color for your shape.',
                default: 'blue',
            },
            {
                type: 'input',
                name: 'shapeColor2',
                message: 'Choose a second color for your shape. (choose the same color as previous to have no gradient)',
                default: 'white',
            },
            {
                type: 'input',
                name: 'letterColor',
                message: 'Choose a color for the letters.',
                default: 'black',
            }
        ])
        .then((answers) => {
            if (answers.letters.length > 3) {
                console.log('Must use three letters. Try again.');
                return this.run();
            } else if (!answers.shapeColor1) {
                console.log("Please enter a first color for your shape.")
                return this.run();
            } else if (!answers.shapeColor2) {
                console.log("Please enter a second color for your shape.")
                return this.run();
            }else if (!answers.letterColor) {
                console.log("Please enter a color for your letters.")
                return this.run();
            } else {
                // Set the properties based on user input
                this.shape = answers.shape;
                this.shapeColor1 = answers.shapeColor1;
                this.shapeColor2 = answers.shapeColor2;
                this.letters = answers.letters;
                this.letterColor = answers.letterColor;
    
                // Generate SVG content
                const svgContent = this.generateSVGContent();
    
                // Write SVG content to file
                fs.writeFile(`${this.shape}${this.letters}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">${svgContent}</svg>`, (err) => {
                    if (err) {
                        console.error('Error writing SVG file:', err);
                    } else {
                        console.log('SVG file created successfully!');
                    }
                });
            }
        })
        .catch((err) => {
            console.error(err, 'ERROR. Please check error message for more details.')
        });
    }


//     colorsByInput() {
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'shape',
//             message: 'Which shape would you like to use?',
//             choices: ['circle', 'triangle', 'square', 'star']
//         },
//         {
//             type: 'input',
//             name: 'letters',
//             message: 'Choose three letters.'
//         },
//         {
//             type: 'input',
//             name: 'shapeColor',
//             message: 'Choose a color for your shape.',
//         },
//         {
//             type: 'input',
//             name: 'letterColor',
//             message: 'Choose a color for the letters.',
//         }
//     ])
//     .then((answers) => {
//         if (answers.letters.length > 3) {
//             console.log('Must use three letters. Try again.');
//             return this.colorsByInput();
//         } else if (!answers.color) {
//             console.log("Please enter a color for your shape.")
//             return this.colorsByInput();
//         } else if (!answers.letterColor) {
//             console.log("Please enter a color for your letters.")
//             return this.colorsByInput();
//         } else {
//             // Set the properties based on user input
//             this.shape = answers.shape;
//             this.color = answers.shapeColor;
//             this.letters = answers.letters;
//             this.letterColor = answers.letterColor;

//             // Generate SVG content
//             const svgContent = this.generateSVGContent();

//             // Write SVG content to file
//             fs.writeFile(`${this.shape}${this.letters}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">${svgContent}</svg>`, (err) => {
//                 if (err) {
//                     console.error('Error writing SVG file:', err);
//                 } else {
//                     console.log('SVG file created successfully!');
//                 }
//             });
//         }
//     })
//     .catch((err) => {
//         console.error(err, 'ERROR. Please check error message for more details.')
//     });
// }

//     colorsbyList() {
//     inquirer.prompt([
//         {
//             type: 'list',
//             name: 'shape',
//             message: 'Which shape would you like to use?',
//             choices: ['circle', 'triangle', 'square', 'star']
//         },
//         {
//             type: 'input',
//             name: 'letters',
//             message: 'Choose three letters.'
//         },
//         {
//             type: 'list',  // Changed from 'input' to 'list'
//             name: 'shapeColor',
//             message: `'Choose a color for your shape.' ${coloredTemplateShape}`,
//             choices: colorChoices  // Provide color choices here
//         },
//         {
//             type: 'list',
//             name: 'letterColor',
//             message: `'Choose a color for the letters.' ${coloredTemplateLetters}`,
//             choices: colorChoices
//         }
//     ])
//     .then((answers) => {
//         if (answers.letters.length > 3) {
//             console.log('Must use three letters. Try again.');
//             return this.run();
//         } else {
//             // Set the properties based on user input
//             this.shape = answers.shape;
//             this.color = answers.shapeColor;
//             this.letters = answers.letters;
//             this.letterColor = answers.letterColor;

//             // Generate SVG content
//             const svgContent = this.generateSVGContent();

//             // Write SVG content to file
//             fs.writeFile(`${this.shape}${this.letters}.svg`, `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200">${svgContent}</svg>`, (err) => {
//                 if (err) {
//                     console.error('Error writing SVG file:', err);
//                 } else {
//                     console.log('SVG file created successfully!');
//                 }
//             });
//         }
//     })
//     .catch((err) => {
//         console.error(err, 'ERROR. Please check error message for more details.')
//     });
// }
}
// Below i created a color map to test out making different things colored in the terminal. I used chat GPT to generate this list because i didnt want to type it all out. Also, this is more of a fun thing anyway.
const colorMap = {
    Black: 'black',
    Silver: 'silver',
    Gray: 'gray',
    Grey: 'grey',
    White: 'white',
    Maroon: 'maroon',
    Red: 'red',
    Purple: 'purple',
    Fuchsia: 'fuchsia',
    Green: 'green',
    Lime: 'lime',
    Olive: 'olive',
    Yellow: 'yellow',
    Navy: 'navy',
    Blue: 'blue',
    Teal: 'teal',
    Aqua: 'aqua',
    Orange: 'orange',
    AliceBlue: 'aliceblue',
    AntiqueWhite: 'antiquewhite',
    Aquamarine: 'aquamarine',
    Azure: 'azure',
    Beige: 'beige',
    Bisque: 'bisque',
    BlanchedAlmond: 'blanchedalmond',
    BlueViolet: 'blueviolet',
    Brown: 'brown',
    BurlyWood: 'burlywood',
    CadetBlue: 'cadetblue',
    Chartreuse: 'chartreuse',
    Chocolate: 'chocolate'
  };

  const colorChoices = ['black','silver','gray','grey','white','maroon','red','purple','fuchsia','green','lime','olive','yellow','navy','blue','teal','aqua','orange','aliceblue','antiquewhite','aquamarine','azure','beige','bisque','blanchedalmond','blueviolet','brown','burlywood','cadetblue','chartreuse','chocolate']


  // Construct the template literal with colorized text for easier viewing.
  const coloredTemplateShape = `
${'Black:'.green} '${colorMap['Black'].yellow}'
${'Silver:'.green} '${colorMap['Silver'].yellow}'
${'Gray/Grey:'.green} '${colorMap['Gray'].yellow} or ${colorMap['Grey'].yellow}'
${'White:'.green} '${colorMap['White'].yellow}'
${'Maroon:'.green} '${colorMap['Maroon'].yellow}'
${'Red:'.green} '${colorMap['Red'].yellow}'
${'Purple:'.green} '${colorMap['Purple'].yellow}'
${'Fuchsia:'.green} '${colorMap['Fuchsia'].yellow}'
${'Green:'.green} '${colorMap['Green'].yellow}'
${'Lime:'.green} '${colorMap['Lime'].yellow}'
${'Olive:'.green} '${colorMap['Olive'].yellow}'
${'Yellow:'.green} '${colorMap['Yellow'].yellow}'
${'Navy:'.green} '${colorMap['Navy'].yellow}'
${'Blue:'.green} '${colorMap['Blue'].yellow}'
${'Teal:'.green} '${colorMap['Teal'].yellow}'
${'Aqua:'.green} '${colorMap['Aqua'].yellow}'
${'Orange:'.green} '${colorMap['Orange'].yellow}'
${'AliceBlue:'.green} '${colorMap['AliceBlue'].yellow}'
${'AntiqueWhite:'.green} '${colorMap['AntiqueWhite'].yellow}'
${'Aquamarine:'.green} '${colorMap['Aquamarine'].yellow}'
${'Azure:'.green} '${colorMap['Azure'].yellow}'
${'Beige:'.green} '${colorMap['Beige'].yellow}'
${'Bisque:'.green} '${colorMap['Bisque'].yellow}'
${'BlanchedAlmond:'.green} '${colorMap['BlanchedAlmond'].yellow}'
${'BlueViolet:'.green} '${colorMap['BlueViolet'].yellow}'
${'Brown:'.green} '${colorMap['Brown'].yellow}'
${'BurlyWood:'.green} '${colorMap['BurlyWood'].yellow}'
${'CadetBlue:'.green} '${colorMap['CadetBlue'].yellow}'
${'Chartreuse:'.green} '${colorMap['Chartreuse'].yellow}'
${'Chocolate:'.green} '${colorMap['Chocolate'].yellow}'
Choose shape Color.
`;

const coloredTemplateLetters = `
${'Black:'.green} '${colorMap['Black'].yellow}'
${'Silver:'.green} '${colorMap['Silver'].yellow}'
${'Gray/Grey:'.green} '${colorMap['Gray'].yellow} or ${colorMap['Grey'].yellow}'
${'White:'.green} '${colorMap['White'].yellow}'
${'Maroon:'.green} '${colorMap['Maroon'].yellow}'
${'Red:'.green} '${colorMap['Red'].yellow}'
${'Purple:'.green} '${colorMap['Purple'].yellow}'
${'Fuchsia:'.green} '${colorMap['Fuchsia'].yellow}'
${'Green:'.green} '${colorMap['Green'].yellow}'
${'Lime:'.green} '${colorMap['Lime'].yellow}'
${'Olive:'.green} '${colorMap['Olive'].yellow}'
${'Yellow:'.green} '${colorMap['Yellow'].yellow}'
${'Navy:'.green} '${colorMap['Navy'].yellow}'
${'Blue:'.green} '${colorMap['Blue'].yellow}'
${'Teal:'.green} '${colorMap['Teal'].yellow}'
${'Aqua:'.green} '${colorMap['Aqua'].yellow}'
${'Orange:'.green} '${colorMap['Orange'].yellow}'
${'AliceBlue:'.green} '${colorMap['AliceBlue'].yellow}'
${'AntiqueWhite:'.green} '${colorMap['AntiqueWhite'].yellow}'
${'Aquamarine:'.green} '${colorMap['Aquamarine'].yellow}'
${'Azure:'.green} '${colorMap['Azure'].yellow}'
${'Beige:'.green} '${colorMap['Beige'].yellow}'
${'Bisque:'.green} '${colorMap['Bisque'].yellow}'
${'BlanchedAlmond:'.green} '${colorMap['BlanchedAlmond'].yellow}'
${'BlueViolet:'.green} '${colorMap['BlueViolet'].yellow}'
${'Brown:'.green} '${colorMap['Brown'].yellow}'
${'BurlyWood:'.green} '${colorMap['BurlyWood'].yellow}'
${'CadetBlue:'.green} '${colorMap['CadetBlue'].yellow}'
${'Chartreuse:'.green} '${colorMap['Chartreuse'].yellow}'
${'Chocolate:'.green} '${colorMap['Chocolate'].yellow}'
Choose letter color.
`;




module.exports = SVG;