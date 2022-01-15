const sampleText = document.getElementById("sample-text");

const unitSelectors = document.getElementsByClassName("unit-selector");
const copyBtn = document.getElementById("copy-code");
const cssCode = document.getElementById("css-code");

const units = ["px", "rem", "em", "%", "in", "cm", "mm"];

const words =
  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.";

const defaultValues = {
  "font-size": 16,
  color: "#000000",
  "background-color": "none",
  "text-align": "left",
  //   "vertical-align":"baseline",
  "text-decoration": "none",
  "text-transform": "none",
  "text-indent": 0,
  "letter-spacing": 0,
  "word-spacing": 0,
  "font-style":'normal',
  "font-variant":"normal",
};

const properties = Object.keys(defaultValues);
//load css code from samplecode
const loadCssCode = () => {
  let newCssCode = "";
  properties.map((property) => {
    //converting css mode to js mode
    const index = property.indexOf("-");
    let convertedPropertyName = property;
    if (index > -1) {
      let propertyValue = property[index + 1].toUpperCase();
      convertedPropertyName =
        property.slice(0, index) + propertyValue + property.slice(index + 2);
    }
    if (sampleText.style[convertedPropertyName]) {
      //adding style to css code
      newCssCode +=
        property + ":" + sampleText.style[convertedPropertyName] + ";" + "\n";
    }
  });
  //saving css code
  if(!newCssCode){
    cssCode.innerText = 'no styles added yet';
    copyBtn.classList.add("disabled");
  }else{
    copyBtn.classList.remove("disabled");
    cssCode.innerText = newCssCode;
  }
};

document.addEventListener("DOMContentLoaded", function () {
  //sets unit options
  let innerHtml = "";
  units.map((unit) => {
    innerHtml += '<option value="' + unit + '">' + unit + "</option>";
  });
  [...unitSelectors].map((unitSelector) => {
    unitSelector.innerHTML = innerHtml;
  });

  sampleText.innerText = words.slice(0, 300);
  //get default values
  loadCssCode();
});

//copy css code
copyBtn.onclick = () => {
  const codeToBeCopied = cssCode.innerText;
  let emptyArea = document.getElementById("text-area");
  emptyArea.innerHTML = codeToBeCopied;
  emptyArea.select();
  document.execCommand("copy");
  document.getElementById('code-copied').style.display = 'inherit'
  window.setTimeout(()=>{
    document.getElementById('code-copied').style.display = 'none'
  },2000)
};

const handleValueChangeWithUnit = (e) => {
  sampleText.style[e.name] =
    e.value + document.getElementById("unit-selector-" + e.name).value;
  document.querySelector(`button[name="${e.name}"]`).classList.remove("disabled");
  loadCssCode();
};

const handleUnitChange = (e) => {
  sampleText.style[e.name] = document.getElementById(e.name).value + e.value;
  document.querySelector(`button[name="${e.name}"]`).classList.remove("disabled");
  loadCssCode();
};

const handleValueChange = (e) => {
  sampleText.style[e.name] = e.value;
  document.querySelector(`button[name="${e.name}"]`).classList.remove("disabled");
  loadCssCode();
};

const handleReset = (e) => {
  sampleText.style.removeProperty(e.name);
  document.getElementById(e.name).value = defaultValues[e.name];
  if (document.getElementById("unit-selector-" + e.name)) {
    document.getElementById("unit-selector-" + e.name).value = "px";
  }
  document.querySelector(`button[name="${e.name}"]`).classList.add("disabled");
  loadCssCode();
};

const handleResetAll = () => {
  properties.map((property) => {
    sampleText.style.removeProperty(property);
    document.querySelector(`button[name="${property}"]`).classList.add("disabled");
    if (document.getElementById(property)) {
      document.getElementById(property).value = defaultValues[property];
    }
    if (document.getElementById("unit-selector-" + property)) {
      document.getElementById("unit-selector-" + property).value = "px";
    }
  });
  loadCssCode();
};

const handleSampleTextLength = (e) => {
  sampleText.innerText = words.slice(0, e.value);
};
