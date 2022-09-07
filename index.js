let contacts = [];

document.querySelector("#input-data").addEventListener("submit", function (e) {
  e.preventDefault();
  let contactInput = Object.fromEntries(new FormData(e.target));
  contactInput.isFavorite = false;
  contactInput.isSelected = false;
  contactInput.contactId = Date.now();
  contacts.push(contactInput);

  window.localStorage.setItem("contacts", JSON.stringify(contacts));
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
      { name: "id", value: `id${contact.contactId}` },
    ]);
    let fullName = createElement("p", [{ name: "id", value: "fullName" }]);
    let email = createElement("p", [{ name: "id", value: "email" }]);
    let address = createElement("p", [{ name: "id", value: "address" }]);
    let phone = createElement("p", [{ name: "id", value: "phone" }]);
    let editBtn = createElement("button", [{ name: "id", value: "editBtn" }]);
    let deleteBtn = createElement("button", [
      { name: "name", value: `${contact.contactId}` },
    ]);
    // deleteBtn.setAttribute("id", `${contact.contactId}`);
    let favoriteBtn = createElement("button", [
      { name: "id", value: `${contact.contactId}` },
    ]);

    fullName.textContent = "Name: " + contact.fullName;
    email.textContent = "Email: " + contact.email;
    address.textContent = "Address: " + contact.address;
    phone.textContent = "Phone: " + contact.phone;
    editBtn.textContent = "Edit Info";
    deleteBtn.textContent = `Delete ${contact.fullName}`;
    favoriteBtn.textContent = "Make Favorite";

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteContact(e.target.name);
      console.log(e.target.name);
      renderContacts(contacts);
    });

    favoriteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addFavorite(e.target.id);
      renderContacts(contacts);
    });

    contactContainer.append(
      fullName,
      email,
      address,
      phone,
      editBtn,
      deleteBtn,
      favoriteBtn
    );

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

function deleteContact(contactId) {
  let indexToDel = contacts.findIndex((singleContact) => {
    return singleContact.contactId === Number(contactId);
  });
  contacts.splice(indexToDel, 1);
}

function addFavorite(contactId) {
  console.log(contactId);
  let indexToAdd = contacts.findIndex((singleContact) => {
    return singleContact.contactId === Number(contactId);
  });
  console.log("index is: ", indexToAdd);
  if (!contacts[indexToAdd].isFavorite) {
    contacts[indexToAdd].isFavorite = true;
    document.querySelector("#id1662488753354").style.backgroundColor = "green";
    console.log(document.querySelector("#id1662488753354"));
    // element.style.backgroundColor = "red"
  } else {
    contacts[indexToAdd].isFavorite = false;
  }
  console.log("is favorite? ", contacts[indexToAdd].isFavorite);
}
