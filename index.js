let contacts = [];

document.querySelector("#input-data").addEventListener("submit", function (e) {
  e.preventDefault();
  let contactInput = Object.fromEntries(new FormData(e.target));
  contactInput.isFavorite = false;
  contactInput.isSelected = false;
  contactInput.contactId = Date.now();
  contacts.push(contactInput);

  updateLocalStorage(contacts);
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

    contact.isFavorite
      ? (contactContainer.style.backgroundColor = "green")
      : (contactContainer.style.backgroundColor = "none");

    contactContainer.style.border = "1px solid";
    contactContainer.style.marginBottom = "15px";
    // contactContainer.style.backgroundColor = "azure";

    deleteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      deleteContact(e.target.name);
      console.log(e.target.name);
      updateLocalStorage(contacts);
      renderContacts(contacts);
    });

    favoriteBtn.addEventListener("click", (e) => {
      e.preventDefault();
      addFavorite(e.target.id);
      renderContacts(contacts);

      // updateLocalStorage(contacts);
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
  contacts[indexToAdd].isFavorite
    ? (contacts[indexToAdd].isFavorite = false)
    : (contacts[indexToAdd].isFavorite = true);

  console.log("is favorite? ", contacts[indexToAdd].isFavorite);
}

function updateLocalStorage(data) {
  window.localStorage.setItem("contacts", JSON.stringify(data));
}

document.querySelector("#searchBtn").addEventListener("click", function (e) {
  e.preventDefault();
  doSearch();
});

function doSearch() {
  let searchInput = document.querySelector("input[name=search]");

  if (document.querySelector("#searchInfo")) {
    document.querySelector("#searchInfo").remove();
  }

  if (searchInput.value) {
    let searchResult = contacts.filter((el) => {
      return el.fullName.toLowerCase() === searchInput.value.toLowerCase();
    });
    renderContacts(searchResult);

    let searchInfo = document.createElement("div");
    searchInfo.setAttribute("id", "searchInfo");
    searchInfo.textContent = `Found ${searchResult.length} contacts`;
    document.querySelector(".searchContainer").append(searchInfo);
  } else {
    renderContacts(contacts);
  }
}
