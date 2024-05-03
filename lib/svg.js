const fs = require('fs');
const colors = require('colors');
const inquirer = require('inquirer');
const shape = reauire('./lib/shape.js');
const express = require('express')


class SVG {
    constructor(shape, color, letters, letterColor) {
        this.shape = shape;
        this.color = color;
        this.letters = letters;
        this.letterColor = letterColor;
    }
    run() {
        inquirer.prompt([
            {
                type: 'list',
                name: 'shape',
                message: 'Which shape would you like to use?',
                choices: ['circle', 'tirangle', 'square', 'star', ]
            },
            {
                type: 'input',
                name: 'letters',
                message: 'Choose three letters.'
            }])
            .then(inquirer.prompt([
            {
                type: 'input',
                name: 'shapeColor',
                message: 'Choose a color for your shape. Press ENTER to view all color choices',
                
            }
        ])).catch((err) =>  {
            console.error(err, 'ERROR. Please check error message for more details.')
        })
    }
}