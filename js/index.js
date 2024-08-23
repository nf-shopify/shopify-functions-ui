console.log("It's alive");
const API_URL = "https://functions-api.shopifydemo.shop";

/*----- State ------*/
let functions;
const functionSelectEl = document.querySelector("select.function-type")


fetchFunctions();

async function fetchFunctions() {
  const res = await fetch(`${API_URL}/functions`);
  functions = await res.json();
  console.log(functions);
  render();
}

function render() {
  functionSelectEl.innerHTML = "";
  functions.forEach((fun) => {
    const optionEl = document.createElement("option");
    optionEl.textContent = fun.functionName;
    functionSelectEl.append(optionEl);
  });
}
