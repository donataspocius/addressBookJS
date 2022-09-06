let contacts = [];

document.querySelector("#input-data").addEventListener("submit", function (e) {
  e.preventDefault();
  let contactInput = Object.fromEntries(new FormData(e.target));
  contacts.push(contactInput);
  console.log(contacts);
  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  console.log(window.localStorage);
  // renderContacts();
});

function renderContacts(contactData) {
  if (document.body.querySelector("#outputContainer")) {
    document.body.querySelector("#outputContainer").remove();
  }

  let outputContainer = createElement("div", [
    { name: "id", value: "outputContainer" },
  ]);
  document.body.append(outputContainer);

  let fullName = createElement("div", [
    { name: "id", value: "contactData.fullName" },
  ]);
  let email = createElement("div", [{ name: "id", value: "email" }]);
  let address = createElement("div", [{ name: "id", value: "address" }]);
  let phone = createElement("div", [{ name: "id", value: "phone" }]);

  outputContainer.append(fullName, email, address, phone);
}

window.addEventListener("DOMContentLoaded", () => {
  let loadedData = JSON.parse(window.localStorage.getItem("contacts"));
  // console.log(...loadedData);
  // for (contact of loadedData) {
  //   console.log(contact.fullName);
  // }
  // console.log(...loadedData);
  // renderContacts(...loadedData);
});

function createElement(tag, props) {
  let newTag = document.createElement(tag);
  if (props && props.length) {
    props.forEach((prop) => {
      newTag[prop.name] = prop.value;
    });
  }
  return newTag;
}
