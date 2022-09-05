let contacts = [];

document.querySelector("#input-data").addEventListener("submit", function (e) {
  e.preventDefault();
  let contactInput = Object.fromEntries(new FormData(e.target));
  contacts.push(contactInput);
  window.localStorage.setItem("contacts", JSON.stringify(contacts));

  renderContacts();
});

function renderContacts() {
  // if ()
  let outputData = document.createElement("div");
  outputData.className = "outputContainer";
  document.body.append(outputData);
}

window.addEventListener("DOMContentLoaded", () => {
  let loadedData = JSON.parse(window.localStorage.getItem("contacts"));
  renderContacts();
});

// function createElement(tag, props) {
//   let newTag = document.createElement(tag);
//   if (props && props.length) {
//     newTag[props.name] = props.value;
//   }
//   return newTag;
// }
