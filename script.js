const lightGrey = "rgb(116, 116, 116)";
const lighterGrey = "rgb(169, 169, 169)";
const darkGray = "rgb(62, 62, 62)";
const orange = "rgb(241, 166, 45)";
const darkOrange = "rgb(196, 136, 39)";
const allBoxElements = document.querySelectorAll('.box');

allBoxElements.forEach((box) => {
    box.addEventListener("mousedown", (e) => {
        
        // Styling
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
    });
});


// toggle background color based on mouse down event
function toggleColor(element, originalColor, toggleColor)
{
    element.style.backgroundColor = toggleColor;
    element.addEventListener("mouseup", (element) => {
        element.target.style.backgroundColor = originalColor;
    });
}