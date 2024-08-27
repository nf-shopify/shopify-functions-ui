/*----- Global Variables ------*/
console.log("It's alive");
const API_URL = "https://functions-api.shopifydemo.shop";
//const API_URL = "http://localhost:8000";

/*----- State ------*/

//functions data returned from server
let functionsData;
//currently selected function
let selectedFunction;
//currently selected scenario
let selectedScenario;
// request payload
let requestPayload;

//functions option selector
const functionSelectEl = document.querySelector("select.function-type");
//scenario option selector
const scenarioSelectEl = document.querySelector("select.function-scenario");
//JSON payload text area
const requestPayloadEl = document.querySelector("textarea.request-payload");
//server response text area
const responsePayloadEl = document.querySelector("textarea.response-payload");
//submit button
const submitBtn = document.querySelector("button.submit");

/*----- Event Handlers ------*/
functionSelectEl.addEventListener("change", (evt) => {
  selectedFunction = functionsData.find(
    (fun) => fun.functionEndpoint === evt.target.value
  );
  selectedScenario = selectedFunction.scenarios[0];
  render();
});

scenarioSelectEl.addEventListener("change", (evt) => {
  selectedScenario = selectedFunction.scenarios.find(
    (scenario) => scenario.scenarioEndpoint === evt.target.value
  );
  render();
});

requestPayloadEl.addEventListener("selectionchange", (evt) => {
  requestPayload = evt.target.value;
  //console.log(requestPayload);
});

submitBtn.addEventListener("click", handleFormSubmit);

/*----- Intalization ------*/
fetchFunctions();

async function fetchFunctions() {
  const res = await fetch(`${API_URL}/functions`);
  functionsData = await res.json();
  //console.log(functionsData);
  render();
}

/*----- Render ------*/
function render() {
  // defaulting inner HTML to blank text
  functionSelectEl.innerHTML = "";
  scenarioSelectEl.innerHTML = "";
  requestPayloadEl.innerHTML = "";

  // defaulting selected options to first option if nothing has been selected
  if (!selectedFunction) selectedFunction = functionsData[0];
  if (!selectedScenario) selectedScenario = selectedFunction.scenarios[0];
  requestPayload = selectedScenario.samplePayload;

  // for each function display an option
  functionsData.forEach((fun) => {
    if (fun.display) {
      const optionEl = document.createElement("option");
      optionEl.textContent = fun.functionName;
      optionEl.value = fun.functionEndpoint;
      functionSelectEl.append(optionEl);
      if (fun.functionEndpoint === selectedFunction.functionEndpoint)
        optionEl.selected = true;
    }
  });

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
  requestPayloadEl.value = JSON.stringify(requestPayload, null, 1);
}

/*----- Functions ------*/
async function handleFormSubmit(evt) {
  evt.preventDefault();
  jsonBody = requestPayloadEl.value;
  const res = await fetch(
    `${API_URL}/${selectedFunction.functionEndpoint}/${selectedScenario.scenarioEndpoint}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: jsonBody ,
    }
  );
  jsonRes = await res.json();
  responsePayloadEl.textContent = JSON.stringify(jsonRes, null, 1);
  render();
}
