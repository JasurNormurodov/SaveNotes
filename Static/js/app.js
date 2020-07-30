const dayTime = document.getElementById("dayTimeIcon");
const listNotes = document.getElementById("notes-list");

//The settings of theme are located at the top for better performance of page onload.
const storedTheme = localStorage.getItem("dayTime");
if (storedTheme) {
  dayTimeChange(storedTheme);
}
//Change Theme
dayTime.addEventListener("click", () => {
  localStorage.setItem("dayTime", dayTime.dataset.icon); //change the value of daytime in localStorage
  dayTimeChange(dayTime.dataset.icon);
});

function dayTimeChange(currentTheme) {
  if (currentTheme === "day") {
    dayTime.dataset.icon = "night";
    document.getElementById("body").className = "day";
    document.querySelector("nav").className =
      "header navbar fixed-top w-100 p-0 navbar-expand-md bg-white navbar-light";
    listNotes.style.color = "black";
    dayTime.className = "fa fa-lg fa-moon-o text-primary";
  } else if (currentTheme === "night") {
    dayTime.dataset.icon = "day";
    document.getElementById("body").className = "night";
    document.querySelector("nav").className =
      "header navbar p-0 fixed-top navbar-expand-md bg-black navbar-dark";
    listNotes.style.color = "#fffff0";
    dayTime.className = "fa fa-lg fa-sun text-warning";
  }
}

const getUserInfo = () => {
  let responseStatus;
  fetch("/user")
    .then((response) => {
      responseStatus = response.status;
      return response.json();
    })
    .then((json) => {
      const imgUrl = json.image;
      const fullName = json.displayName;
      const email = json.email;
      const profile = document.getElementById("profile");
      const profileMobile = document.querySelector(".sidebarMenuInner");

      profile.querySelector("img").src = imgUrl;
      profileMobile.querySelector("img").src = imgUrl;
      profile.querySelector("span").textContent = fullName;
      document.getElementById("full-name-mobile").textContent = fullName;
      document.getElementById("email").textContent = email;
      document.getElementById("emailMobile").textContent = email;
      if (responseStatus >= 400) {
        console.log("Something went wrong with getting gmail`s imgage");
        profileMobile.querySelector("img").src = "/images/user.svg";
        profile.querySelector("img").src = "/images/user.svg";
      }
    });
};

getUserInfo();

const noteElement = document.getElementById("note-template");
const form = document.querySelector("#new-note-form form");
const languageBtn = document.getElementById("language");
const outBtns = document.querySelectorAll(".fa-sign-out-alt");
const emptyBg = document.getElementById("emptyBg");
//For next version
// const settingsBtns = document.querySelectorAll(".fa-cog");
// const aboutBtns = document.querySelectorAll(".fa-info-circle");

let user;
let i;

//Language switcher
const English = {
  CHOOSE_LANGUAGE: "Choose a language:",
  LANGUAGE_IMG: "images/uk.svg",
  ADD_NOTE: "Add Note",
  EDITED: "Edited:",
  CREATED: "Created:",
  NOT_EDITED: "Not edited",
  LOGOUT: " Log Out",
  SEARCH: "Search for...",
  ADD_NEW_NOTE: "Add Note",
  TITLE: "Title",
  ENTER_TITLE: "Enter a title",
  NOTE: "Note",
  ENTER_NOTE: "Enter note",
  ADD_BTN: "Add",
  CANCEL_BTN: "Cancel",
  //For next version
  // SETTINGS: " Settings (soon)",
  // ABOUT: " About (soon)",
};
const Russian = {
  LANGUAGE_IMG: "images/russia.svg",
  CHOOSE_LANGUAGE: "Выберите язык:",
  ADD_NOTE: "Добавить",
  EDITED: "Изменена:",
  CREATED: "Создана:",
  NOT_EDITED: "Не изменена",
  LOGOUT: " Выйти",
  SEARCH: "Искать...",
  ADD_NEW_NOTE: "Добавить Заметку",
  TITLE: "Заглавие",
  ENTER_TITLE: "Введите заглавие",
  NOTE: "Заметка",
  ENTER_NOTE: "Введите заметку",
  ADD_BTN: "Добавить",
  CANCEL_BTN: "Отменить",
  //For next version
  // SETTINGS: " Настройки (скоро)",
  // ABOUT: " Информация (скоро)",
};
const Uzbek = {
  LANGUAGE_IMG: "images/uzbekistan.svg",
  CHOOSE_LANGUAGE: "Tilni tanlang:",
  ADD_NOTE: "Qo`shish",
  EDITED: "O`zgargan:",
  CREATED: "Yaratilgan:",
  NOT_EDITED: "O`zgarmagan",
  LOGOUT: " Chiqish",
  SEARCH: "Izlash...",
  ADD_NEW_NOTE: "Eslatma Qo`shish",
  TITLE: "Sarlavha",
  ENTER_TITLE: "Sarlavhani kiriting",
  NOTE: "Eslatma",
  ENTER_NOTE: "Eslatmani kiriting",
  ADD_BTN: "Qo`shish",
  CANCEL_BTN: "Bekor qilish",
  //For next version
  // SETTINGS: " Sozlamalar(tez kunda)",
  // ABOUT: " Ma`lumot (tez kunda)",
};
let languagePack = English;

//Take a language from localStorage
const storedLanguage = localStorage.getItem("language");
if (storedLanguage) {
  console.log(storedLanguage);
  langSwitcher(storedLanguage);
}

function langSwitcher(language) {
  if (language === "en") {
    languagePack = English;
  } else if (language === "ru") {
    languagePack = Russian;
  } else if (language === "uz") {
    languagePack = Uzbek;
  }

  tranlatePage(language);
  translateNotes();
}
function tranlatePage(language) {
  languageBtn.alt = language;
  localStorage.setItem("language", language);
  languageBtn.src = languagePack.LANGUAGE_IMG;
  document.querySelector(".language-label").textContent =
    languagePack.CHOOSE_LANGUAGE;
  document.querySelector(".add-note").innerHTML = `${languagePack.ADD_NOTE} <i
  class="fas fa-feather-alt fa-lg text-white"></i>`;
  for (i = 0; i < 2; i++) {
    // settingsBtns[i].nextSibling.textContent = languagePack.SETTINGS;
    // aboutBtns[i].nextSibling.textContent = languagePack.ABOUT;
    outBtns[i].nextSibling.textContent = languagePack.LOGOUT;
  }

  //New note modal
  document.querySelector("h1").textContent = languagePack.ADD_NEW_NOTE;
  document.getElementById("enterTitle").textContent = languagePack.TITLE;
  document.getElementById("title").placeholder = languagePack.ENTER_TITLE;
  document.getElementById("enterNote").textContent = languagePack.NOTE;
  document.getElementById("content").placeholder = languagePack.ENTER_NOTE;
  document.querySelector(".addBtn").textContent = languagePack.ADD_BTN;
  document.querySelector(".cancelBtn").textContent = languagePack.CANCEL_BTN;
}

function translateNotes() {
  const posts = document.querySelectorAll(".collapsible-group");

  for (elem of posts) {
    const editedDate = elem.querySelector(".editedDate").textContent;
    if (
      editedDate === English.NOT_EDITED ||
      editedDate === Russian.NOT_EDITED ||
      editedDate === Uzbek.NOT_EDITED
    ) {
      //checking if it has been edited before or not
      elem.querySelector(".editedDate").textContent = languagePack.NOT_EDITED;
      elem.querySelector(".editedDateContent").textContent =
        languagePack.NOT_EDITED;
    }

    elem.querySelector("#editedTitleLabel").textContent = languagePack.EDITED;
    elem.querySelector("#editedContentLabel").textContent = languagePack.EDITED;
    elem.querySelector("#createdTitleLabel").textContent = languagePack.CREATED;
    elem.querySelector(
      "#createdContentLabel"
    ).textContent = ` | ${languagePack.CREATED}`;
  }
}
document
  .querySelector(".language-content")
  .addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      langSwitcher(event.target.closest("a").id);
      // alert('langSwitcherTirggered')
    }
  });

//Progress bar under navbar
window.onscroll = () => {
  let winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  let height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  let scrolled = (winScroll / height) * 100;
  if (scrolled > 20) {
    document.querySelector(".to-top").classList.remove("d-none");
  } else {
    document.querySelector(".to-top").classList.add("d-none");
  }
  document.getElementById("myBar").style.width = scrolled + "%";
};

//Add note form
// Get the modal
const modal = document.getElementById("new-note-form");

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

//Giving a index to notes
function reIndexing() {
  const notesArray = document.querySelectorAll(".collapsible-group");
  let indexNumber = 1;
  for (note of notesArray) {
    if (note.style.display === "none") {
      continue;
    }
    const index = note.querySelector(".index");
    index.textContent = indexNumber;
    indexNumber++;
  }
}

function sendHttpRequest(method, url, data) {
  return fetch(url, {
    method: method,
    body: data,
  })
    .then((response) => {
      if (response.status >= 200 && response.status < 300) {
        return response.json();
      } else {
        return response.json().then((errData) => {
          console.log(errData);
          throw new Error("Something went wrong -server-side!");
        });
      }
    })
    .catch((error) => {
      console.log(error);
      throw new Error("Something went wrong!");
    });
}

async function fetchPosts() {
  try {
    const responseData = await sendHttpRequest("GET", "/db/notes");
    const listOfNotes = responseData;
    for (const note of listOfNotes) {
      const noteEl = document.importNode(noteElement.content, true);
      noteEl.querySelector(".title").value = note.title;
      noteEl.querySelector(".noteBody").textContent = note.body;
      noteEl.querySelector(".collapsible-group").id = note.noteID;
      noteEl.querySelector(".createdDate").textContent = note.createdDate;
      noteEl.querySelector(".createdDateContent").textContent =
        note.createdDate;
      noteEl.querySelector(".editedDate").textContent =
        note.editedTime === "Not edited"
          ? languagePack.NOT_EDITED
          : note.editedTime;
      noteEl.querySelector(".editedDateContent").textContent =
        note.editedTime === "Not edited"
          ? languagePack.NOT_EDITED
          : note.editedTime;

      listNotes.append(noteEl);
    }
    updateEventHandlers();
    translateNotes();
  } catch (error) {
    console.log(error);
  }
}
function updateEventHandlers() {
  reIndexing();
  makingContentEditable();
  search();
  updateBgImage(listNotes.childElementCount);

}
function createPost(title, content, id) {
  const note = JSON.stringify({
    title: title,
    body: content,
    noteID: id,
    createdDate: getCurrentDate(),
  });
  fetch("/db/notes", {
    method: "POST",
    body: note,
    headers: {
      "Content-type": "application/json; charset=UTF-8",
    },
  });

  updateEventHandlers();
}
fetchPosts();
form.addEventListener("submit", (event) => {
  event.preventDefault();
  let enteredTitle = event.currentTarget.querySelector("#title").value;
  let enteredContent = event.currentTarget.querySelector("#content").value;
  const randomId = Math.random();
  createPost(enteredTitle, enteredContent, randomId);
  const noteEl = document.importNode(noteElement.content, true);
  noteEl.querySelector(".title").value = enteredTitle;
  noteEl.querySelector(".noteBody").textContent = enteredContent;
  noteEl.querySelector(".collapsible-group").id = randomId;
  noteEl.querySelector(".createdDate").textContent = getCurrentDate();
  noteEl.querySelector(".createdDateContent").textContent = getCurrentDate();
  noteEl.querySelector(".editedDate").textContent = languagePack.NOT_EDITED;
  noteEl.querySelector(".editedDateContent").textContent =
    languagePack.NOT_EDITED;
  noteEl.querySelector("#editedTitleLabel").textContent = languagePack.EDITED;
  noteEl.querySelector("#createdTitleLabel").textContent = languagePack.CREATED;
  noteEl.querySelector("#editedContentLabel").textContent = languagePack.EDITED;
  noteEl.querySelector("#createdContentLabel").textContent =
    languagePack.CREATED;

  listNotes.append(noteEl);
  modal.style.display = "none";
  updateEventHandlers();
  event.currentTarget.querySelector("#title").value = null;
  event.currentTarget.querySelector("#content").value = null;
});
let titleReserver; //used while saving changes in title
listNotes.addEventListener("click", (event) => {
  const post = event.target.closest(".collapsible-group");
  const title = post.querySelector(".title");

  if (event.target.classList.contains("fa-trash")) {
    if (!confirm(`Do you want to delete this note?\n\n${title.value}`)) {
      return;
    }
    fetch(`/db/notes/${post.id}`, {
      method: "DELETE",
    });
    post.style.display = "none";
    post.dataset.status = "deleted";
    reIndexing();
    updateBgImageNoteDeleted();
  }
  //edit a title
  else if (event.target.classList.contains("fa-edit")) {
    event.target.className = "fas fa-save fa-lg";
    title.removeAttribute("readonly");
    title.classList.remove("outline-none");
    title.focus();
    titleReserver = title.value;
  }
  //save the changes on title
  else if (event.target.classList.contains("fa-save")) {
    event.target.className = "fas fa-edit fa-lg";
    title.setAttribute("readonly", "");
    title.classList.add("outline-none");

    if (titleReserver !== title.value) {
      post.querySelector(".editedDate").textContent = getCurrentDate();
      post.querySelector(".editedDateContent").textContent = getCurrentDate();
      fetch(`/db/notes/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({
          title: title.value,
          editedTime: getCurrentDate(),
        }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
    }
  } else if (event.target.classList.contains("saveBtn")) {
    let content = post.querySelector("textarea").value;
    event.target.parentElement.className =
      "d-none col-1 offset-10 editBtn mb-2";
    post.querySelector(".editedDate").textContent = getCurrentDate();
    post.querySelector(".editedDateContent").textContent = getCurrentDate();

    fetch(`/db/notes/${post.id}`, {
      method: "PUT",
      body: JSON.stringify({
        body: content,
        editedTime: getCurrentDate(),
      }),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });
  }
  //collapse the notes
  else if (event.target.closest(".collapsible")) {
    event.target.closest(".collapsible").classList.toggle("active");
    const content = event.target.closest(".collapsible").nextElementSibling;
    let contentText = content.querySelector("textarea");
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      contentText.style.height = "1px";
      contentText.style.height = 10 + contentText.scrollHeight + "px";
      content.style.maxHeight = 35 + contentText.scrollHeight + "px";
    }
  }
});

//Edited date
//Date operations
function getCurrentDate() {
  let date = new Date();
  let cHours = date.getHours().toString();
  let cMinutes = date.getMinutes().toString();
  let cDate = date.getDate().toString();
  let cMonth = (date.getMonth() + 1).toString();
  return `${cHours.length === 1 ? `0${cHours}` : cHours}:${
    cMinutes.length === 1 ? `0${cMinutes}` : cMinutes
  } ${cDate.length === 1 ? `0${cDate}` : cDate}.${
    cMonth.length === 1 ? `0${cMonth}` : cMonth
  }.${(date.getFullYear() % 1000) % 100}`;
}

//Search
function search() {
  const input = document.getElementById("search");
  const inputBox = document.getElementById("input-box");
  let titleList = document.querySelectorAll(".title");
  let noteBodyList = document.querySelectorAll(".noteBody");
  let notes = document.querySelectorAll(".collapsible-group");
  input.addEventListener("keyup", search);
  function search() {
    let textValue, filter;

    filter = input.value.toUpperCase();

    for (i = 0; i < notes.length; i++) {
      title = titleList[i];
      noteBody = noteBodyList[i];
      textValue = title.value + noteBody.value;
      if (
        textValue.toUpperCase().indexOf(filter) > -1 &&
        notes[i].dataset.status !== "deleted"
      ) {
        notes[i].style.display = "";
      } else {
        notes[i].style.display = "none";
      }
    }
  }
  input.addEventListener("focus", () => {
    inputBox.className = "col-lg-9 col-6 col-sm-8 pr-0";
    inputBox.querySelector("i").style.display = "none";
    input.style.width = "100%";
    input.placeholder = languagePack.SEARCH;
  });
  input.addEventListener("focusout", () => {
    if (input.value === "") {
      inputBox.className = "col-2 col-sm-1 pr-0 pl-lg-4 pl-0 pl-sm-0 pl-xl-5";
      inputBox.querySelector("i").style.display = "initial";
      input.style = "d-none";
    }
  });
}
let currenContentReserve; //used to check if note has been changed
//Making notes editable and chek the changes
function makingContentEditable() {
  let contentsGroup = document.querySelectorAll("p textarea");
  for (const content of contentsGroup) {
    content.addEventListener("focusin", () => {
      currenContent = content.value;
      content.addEventListener("input", () => {
        if (content.value !== currenContent) {
          let btnGroup = content.parentElement.nextElementSibling;
          //making save and undo buttons visible in content
          btnGroup.className =
            "d-flex col-md-1 col-3 offset-md-10 offset-6 offset-sm-9 editBtn mb-2";
          content.parentElement.className = "mb-0";
          content.style.height = "1px";
          content.style.height = 10 + content.scrollHeight + "px";
          content.closest(".content").style.maxHeight =
            85 + content.scrollHeight + "px";
          btnGroup.querySelector(".undoBtn").addEventListener("click", () => {
            content.value = currenContent;
            content.parentElement.nextElementSibling.className = "d-none";
            content.style.height = "1px";
            content.style.height = 10 + content.scrollHeight + "px";
            content.closest(".content").style.maxHeight =
              35 + content.scrollHeight + "px";
          });
        } else if (content.value === currenContent) {
          content.parentElement.nextElementSibling.className = "d-none";
        }
      });
    });
  }
}
// const notess=document.getElementById('notes-list');
// const notess2=document.getElementsByClassName('collapsible-group');
// const notess3=document.querySelectorAll('.collapsible-group');

function updateBgImage(notesNumber) {
  // const notesList=document.getElementById('notes-list');
  // console.log(notesList)
  // console.log(notesList.childElementCount)
  if (notesNumber !== 0) {
    emptyBg.classList.add("d-none");
  } else {
    emptyBg.classList.remove("d-none");
  }
}
// updateBgImage(notesList.childElementCount);
function updateBgImageNoteDeleted() {
  const notesList = document.querySelectorAll("#notes-list .collapsible-group");
  let notesNum = 0;
  for (notes of notesList) {
    if (notes.dataset.status === "deleted") {
      continue;
    }
    notesNum++;
  }
  updateBgImage(notesNum);
}
