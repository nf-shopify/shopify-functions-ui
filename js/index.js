console.log("It's alive");
const API_URL = "https://functions-api.shopifydemo.shop";

async function fetchFunctions() {
  const res = await fetch(`${API_URL}/functions`);
  functionsData = await res.json();
  console.log(functionsData);
}

fetchFunctions();
