/*----- Global Variables ------*/
console.log("It's alive");
const API_URL = "https://functions-api.shopifydemo.shop";

/*----- State ------*/
let functions;
let selectedFunction;
let selectedScenario;
const functionSelectEl = document.querySelector("select.function-type");
const scenarioSelectEl = document.querySelector("select.function-scenario");
const jsonPayloadEl = document.querySelector("textarea.json-payload");

/*----- Event Handlers ------*/
functionSelectEl.addEventListener("change", (evt) => {
  selectedFunction = functions.find(
    (fun) => fun.functionEndpoint === evt.target.value
  );
  render();
});

scenarioSelectEl.addEventListener("change", (evt) => {
  selectedScenario = selectedFunction.scenarios.find(
    (scenario) => scenario.scenarioEndpoint === evt.target.value
  );
  render();
});

/*----- Intalization ------*/
fetchFunctions();

async function fetchFunctions() {
  const res = await fetch(`${API_URL}/functions`);
  functions = await res.json();
  console.log(functions);
  render();
}

/*----- Render ------*/
function render() {
  // defaulting inner HTML to blank text
  functionSelectEl.innerHTML = "";
  scenarioSelectEl.innerHTML = "";
  jsonPayloadEl.innerHTML = "";

  // defaulting selected options to first option if nothing has been selected
  selectedFunction ? selectedFunction : (selectedFunction = functions[0]);
  selectedScenario ? selectedScenario : (selectedScenario = functions[0].scenarios[0]);

  // for each function display an option
  functions.forEach((fun) => {
    if (fun.display) {
      const optionEl = document.createElement("option");
      optionEl.textContent = fun.functionName;
      optionEl.value = fun.functionEndpoint;
      functionSelectEl.append(optionEl);
      if (fun.functionEndpoint === selectedFunction.functionEndpoint)
        optionEl.selected = true;
    }
  });

  // if a new function is selected default to the first scenario of the new function
  if (!selectedFunction.scenarios.includes(selectedScenario)){
    selectedScenario = selectedFunction.scenarios[0]
  }

  // for each scenario display an option
  selectedFunction.scenarios.forEach((scenario) => {
    if (scenario.display) {
      const optionEl = document.createElement("option");
      optionEl.textContent = scenario.scenarioName;
      optionEl.value = scenario.scenarioEndpoint;
      scenarioSelectEl.append(optionEl);
      if (scenario.scenarioEndpoint === selectedScenario.scenarioEndpoint)
        optionEl.selected = true;
    }
  });

  // render sample payload for selected option
  jsonPayloadEl.textContent = JSON.stringify(
    selectedScenario.samplePayload,
    null,
    1
  );
}
