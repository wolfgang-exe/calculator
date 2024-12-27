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
        updateNumberDisplay(input, currentNumber);
        currentNumber = true;
    }
    else if (classList.includes("math"))
    {
        processNumber();
        validateOperator(input);
        currentNumber = false;
    }
    else if (classList.includes("update-value"))
    {
        switch (input)
        {
            case 'C':
                clearDisplay();
                break;

            case '=':
                if (numberValue == "")
                    exit();
                processNumber();
                display.innerText = equation[0];

                break;

            default: // +/- case
                plusMinus();

                break;
        }
    }
    
    if (equation.length === 3)
        computeEquation();
}

function updateNumberDisplay(input, currentNumber)
{
    if (!currentNumber)
        display.innerText = "0";

    if(display.innerText === "0" && input === '.'){
        display.innerText = "0.";
    }
    else if(display.innerText === "0" && input !== '.'){
        display.innerText = input;
        numberValue += input;
    }
    else{
        display.innerText += input;
        numberValue += input;
    }
}

function processNumber()
{
    if (Math.floor(numberValue) === Math.ceil(numberValue))
        equation.push(parseInt(numberValue));
    else 
        equation.push(parseFloat(numberValue));

    numberValue = "";
}

function plusMinus()
{
    if (display.value === "0")
    {
        display.innerText = "0";
        exit();
    }

    if (numberValue !== "")
        processNumber();

    if (equation.length === 3)
    {
        equation[2] *= -1;
        display.innerText = equation[2];
    }
    else 
    {
        equation[0] *= -1;
        display.innerText = equation[0]
    }  
}

function clearDisplay()
{
    display.innerText = "0";
    numberValue = "";
}

function computeEquation()
{
    let x = equation[0];
    let opr = equation[1];
    let y = equation[2];
    equation = []; 
    numberValue = "";

    applyOperator(x,y,opr);
}

function validateOperator(input)
{
    if (equation[1] === undefined)
        equation.push(input);
    else 
        equation[1] = input;
}

function applyOperator(x,y,opr)
{
    switch (opr)
    {
        case "+":
            display.innerText = x+y;
            break;
        case "-":
            display.innerText = x-y;
            break;
        case "x":
            display.innerText = x*y;
            break;
        case "+":
            if (y !== 0)
                display.innerText = x/y;
            else 
                display.innerText = "Invalid";
            break;
        case "%":
            display.innerText = x%y;
            break;
        default:
            display.innerText = "Invalid";
            break;
    }
}