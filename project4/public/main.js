window.onload = () =>{
  console.log(document.body);
  loadBlessings();
};

const loadBlessings = async () => {
  const response = await fetch("/all-blessings");
  const data = await response.json();

  displayArea.innerHTML = "";

  for (let b of data.blessings) {
    const heading = document.createElement("h3");
    heading.textContent = b;
    displayArea.appendChild(heading);
  }
};
