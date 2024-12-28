const lightGrey = "rgb(116, 116, 116)";
const lighterGrey = "rgb(169, 169, 169)";
const darkGray = "rgb(62, 62, 62)";
const orange = "rgb(241, 166, 45)";
const darkOrange = "rgb(196, 136, 39)";
const allBoxElements = document.querySelectorAll('.box');
const display = document.getElementById('display');
let currentNumber = true;
let numberValue = "";
let equation = [];

allBoxElements.forEach((box) => {
    box.addEventListener("mousedown", (e) => {

        if (e.target.className.includes("light-box"))
        {
            toggleColor(e.target, lightGrey, lighterGrey);
        }
        else if (e.target.className.includes("dark-box"))
        {
            toggleColor(e.target, darkGray, lightGrey);
        }
        else if (e.target.className.includes("orange-box"))
        {
            toggleColor(e.target, orange, darkOrange);
        }

        parseCalculatorInput(e.target.className, e.target.innerText);
    });
});

// toggle button background color based on mouse down event
function toggleColor(element, originalColor, toggleColor)
{
    element.style.backgroundColor = toggleColor;
    element.addEventListener("mouseup", (element) => {
        element.target.style.backgroundColor = originalColor;
    });
}

// get and process calculator input
function parseCalculatorInput(classList, input)
{

    if (classList.includes("number"))
    {
        // Number input - integer, float
        updateNumberDisplay(input, currentNumber);
        processNumber(input);
        currentNumber = true;
    }
    else if (classList.includes("operator"))
    {
        // Operator input - mod, add, subtract, divide, multiply
        processOperator(input);
        numberValue = "";
        currentNumber = false;
    }
    else if (classList.includes("update-value"))
    {
        // Non Operator or Number input - Clear, Equal, +/-
        nonOprOrNumInput(input);
    }
}

// update calculator display
function updateNumberDisplay(input, currentNumber)
{
    if (!currentNumber)
        display.innerText = "0";

    if(display.innerText === "0" && input === '.')
    {
        display.innerText = "0.";
    }
    else if(display.innerText === "0" && input !== '.')
    {
        display.innerText = input;
        numberValue += input;
    }
    else
    {
        display.innerText += input;
        numberValue += input;
    }

    checkDisplayOverflow();
}

// get float or integer value and update
function processNumber(input)
{
    input = floatOrInt(input);
    updateNumber(numberValue);
}

// add or update number to equation
function updateNumber(input)
{
    switch (equation.length)
    {
        case 0:
            equation.push(input);
            break;
        case 1:
            equation[0] = numberValue;
            break;
        case 2:
            equation.push(input);
            break;
        case 3:
            equation[2] = numberValue;
            break;
        default:
            break;
    }

    checkDisplayOverflow();
}

function checkDisplayOverflow()
{
    if (display.innerText.length >= 11)
        display.innerText = display.innerText.substring(0,11);
}

// add or replace operator in equation
function processOperator(input)
{
    switch (equation.length)
    {
        case 0:
            equation[0] = display.innerText;
            equation[1] = input;
        case 1:
            equation.push(input);
            break;
        case 2:
            equation[1] = input;
            break;
        case 3:
            computeTotal();
            display.innerText = numberValue;
            equation[0] = numberValue;
            equation[1] = input;
            checkDisplayOverflow();
        default:
            break;
    }
}

// compute the total
function computeTotal()
{
    switch (equation.length)
    {
        case 0:
        case 1:
        case 2:
            numberValue = equation[0];
            break;
        default:
            numberValue = applyOperator(equation[0], equation[2], equation[1]);
            break;
    }
}

// clear and reset display
function clearDisplay()
{
    display.innerText = "0";
    numberValue = "";
    equation = [];
}

// applies operator to an equation
function applyOperator(x,y,opr)
{
    x = floatOrInt(x);
    y = floatOrInt(y);

    if (opr === '÷' && y === 0)
        return "Undefined";

    switch (opr)
    {
        case "+":
            return x+y;
        case "-":
            return x-y;
        case "x":
            return x*y;
        case "÷":
            return x/y;
        case "%":
            return x%y;
        default:
            return "Invalid";
    }
}

// checks whether input is a float
function floatOrInt(input)
{
    if (Math.floor(input) === Math.ceil(input))
        return parseInt(input);
    else 
        return parseFloat(input);
}

// Process non number or operator inputs
function nonOprOrNumInput(input)
{
    switch (input)
    {
        case 'C':
            clearDisplay();
            break;

        case '=':
            computeTotal();
            display.innerText = numberValue;
            numberValue = "";
            checkDisplayOverflow();
            break;

        default: // +/-
            display.innerText = floatOrInt(numberValue) * -1;
            numberValue = floatOrInt(numberValue) * -1
            updateNumber(numberValue);
            checkDisplayOverflow();
            break;
    }
}