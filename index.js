let contacts = [];

document.querySelector("#input-data").addEventListener("submit", function (e) {
  e.preventDefault();
  let contactInput = Object.fromEntries(new FormData(e.target));
  contactInput.isFavorite = false;
  contactInput.isSelected = false;
  contacts.push(contactInput);

  window.localStorage.setItem("contacts", JSON.stringify(contacts));
  console.log("my CONTACTS here", contacts);
  renderContacts(contacts);
});

function renderContacts(data) {
  if (document.body.querySelector("#outputContainer")) {
    document.body.querySelector("#outputContainer").remove();
  }
  let outputContainer = createElement("div", [
    { name: "id", value: "outputContainer" },
  ]);
  data.forEach((contact) => {
    let contactContainer = createElement("div", [
      { name: "id", value: "contactContainer" },
    ]);
    let fullName = createElement("p", [{ name: "id", value: "fullName" }]);
    let email = createElement("p", [{ name: "id", value: "email" }]);
    let address = createElement("p", [{ name: "id", value: "address" }]);
    let phone = createElement("p", [{ name: "id", value: "phone" }]);
    let editBtn = createElement("button", [{ name: "id", value: "editBtn" }]);

    fullName.textContent = "Name: " + contact.fullName;
    email.textContent = "Email: " + contact.email;
    (address.textContent = "Address: "), contact.address;
    phone.textContent = "Phone: " + contact.phone;
    editBtn.textContent = "Edit Info";

    contactContainer.append(fullName, email, address, phone, editBtn);
    outputContainer.append(contactContainer);
  });
  document.body.append(outputContainer);
}

window.addEventListener("DOMContentLoaded", () => {
  if (window.localStorage.getItem("contacts")) {
    let loadedData = JSON.parse(window.localStorage.getItem("contacts"));
    console.log(loadedData);
    contacts = loadedData;
    renderContacts(loadedData);
  }
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
