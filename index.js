// Packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const { Triangle, Square, Circle } = require("./lib/shapes");

// An array of questions for user input
const questions = [
    {
        type: 'list',
        name: 'shape',
        message: 'What shape do you want?',
        choices: ['None', 'Circle', 'Triangle', 'Square']

    }, 
    {
        type: 'input',
        name: 'shape_color',
        message: 'What color of the shape do you want? (Enter color keyboard OR hexadecimal number)'
    }, 
    {
        type: 'input',
        name: 'text',
        message: 'What text do you want? (Enter up to three characters)',
        validate: function(input) {
            if (input.length > 3) {
                return 'Please enter text with fewer than 3 characters'
            }
            return true
        }
    },
    {
        type: 'input',
        name: 'text_color',
        message: 'What color of the text do you want? (Enter color keyboard OR hexadecimal number)'
    },
];

// A function to write svg file
function writeToFile(fileName, data) {

    let svgString = "";

    svgString = '<svg version="1.1" width="300" height="200" xmlns="http://www.w3.org/2000/svg">'
    svgString += "<g>"
    svgString += `${data.shape}`;

    let shapeChoice;
    if (data.shape === "Triangle") {
        shapeChoice = new Triangle();
        svgString += `<polygon points="150, 18 244, 182 56, 182" fill="${data.shape_color}"/>`;
    } else if (data.shape === "Square") {
        shapeChoice = new Square();
        svgString += `<rect x="73" y="40" width="160" height="160" fill="${data.shape_color}"/>`;
    } else {
        shapeChoice = new Circle();
        svgString += `<circle cx="150" cy="115" r="80" fill="${data.shape_color}"/>`;
    }

    svgString += `<text x="150" y="130" text-anchor="middle" font-size="40" fill="${data.text_color}">${data.text}</text>`;
    svgString += "</g>";
    svgString += "</svg>";    

    fs.writeFile(fileName, svgString, (err) => {
        if (err) {
            console.error(err);
        } else {
            console.log('Generated logo.svg!');
        }
    });
}

// A function to initialize app
function init() {
    inquirer.prompt(questions)
    .then((response) => {

        const data = {
            "shape": response.shape,
            "shape_color": response.shape_color,
            "text": response.text,
            "text_color": response.text_color,
        }

        writeToFile('logo.svg', data);
    })
    .catch((error) => 
        console.error(error));
}


// Function call to initialize app
init();