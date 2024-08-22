console.log("It's alive");

async function fetchTest() {
    const res = await fetch("http://localhost/");
    data = await res.json();
    console.log(data)
    console.log(PORT);
    console.log(process.env.PORT)
  }

  fetchTest()
