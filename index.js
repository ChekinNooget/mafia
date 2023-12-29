/* scumreadData: [
    user: [
        scumreadwho: [
            awef, awef, awef
        ]
        townreadwho:[
            awef, awef, awef
        ]
    ]
    user: [
        scumreadwho: [
            awef, awef, awef
        ]
        townreadwho:[
            awef, awef, awef
        ]
    ]
] */
var peopleList = [
  "aayr",
  "Technodoggo",
  "aidan0626",
  "lucaswujc",
  "Aminecraftbear",
];
var idList = ["501245", "532454", "519740", "554808", "977249"];
var currentlyLoadedUser = 0;
var hoverCurrentlyLoadedUser = 1434; //probably error if 1434 users but i doubt that'll ever happen
var data;
var notesData;
if (localStorage.getItem("scumreads") != null) {
  data = JSON.parse(localStorage.getItem("scumreads"));
} else {
  data = [];
  for (let i = 0; i < peopleList.length; i++) {
    data[i] = [[], []];
  }
}
if (localStorage.getItem("notes") != null) {
  notesData = JSON.parse(localStorage.getItem("notes"));
} else {
  notesData = [];
  for (let i = 0; i < peopleList.length; i++) {
    notesData.push(["", ""]);
  }
}
var temp = "";
temp = "";
var userWrap = document.querySelector(".user-wrap");
for (let i = 0; i < peopleList.length; i++) {
  temp =
    temp +
    `<img src="https://avatar.artofproblemsolving.com/avatar_${idList[i]}.png" class="user" onclick="clickUser('${peopleList[i]}')" onmouseover="hoverUser('${peopleList[i]}')" onmouseout="unHoverUser('${peopleList[i]}')"/>`;
}
userWrap.innerHTML = temp;
renderUserData(peopleList[currentlyLoadedUser]);

function addScumreadWho() {
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.appendChild(createScumDropdown());
  data[currentlyLoadedUser][0].push(peopleList[currentlyLoadedUser]);
  renderNamesInDropdown();
}
function removeScumreadWho() {
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.removeChild(scumreadUsers.lastChild);
  data[currentlyLoadedUser][0].pop();
  renderNamesInDropdown();
}
function addTownreadWho() {
  var townChildreadUsers = document.querySelector(
    ".user-info-townread-who-users"
  );
  townChildreadUsers.appendChild(createTownDropdown());
  data[currentlyLoadedUser][1].push(peopleList[currentlyLoadedUser]);
  renderNamesInDropdown();
}
function removeTownreadWho() {
  var scumreadUsers = document.querySelector(".user-info-townread-who-users");
  scumreadUsers.removeChild(scumreadUsers.lastChild);
  data[currentlyLoadedUser][1].pop();
  renderNamesInDropdown();
}
function renderNamesInDropdown() {
  //this function remakes all of the options in the selector to refresh it
  if (
    document.querySelector(".user-info-scumread-who-users").childElementCount <=
    0
  ) {
    document.querySelector(".user-info-scumread-who-remove").disabled = true;
  } else {
    document.querySelector(".user-info-scumread-who-remove").disabled = false;
  }
  if (
    document.querySelector(".user-info-townread-who-users").childElementCount <=
    0
  ) {
    document.querySelector(".user-info-townread-who-remove").disabled = true;
  } else {
    document.querySelector(".user-info-townread-who-remove").disabled = false;
  }
  iterateDropdowns(
    document.querySelectorAll(".user-info-scumread-dropdown"),
    0
  );
  iterateDropdowns(
    document.querySelectorAll(".user-info-townread-dropdown"),
    1
  );

  saveData();
}

function iterateDropdowns(dropdown, whatRead) {
  for (let i = 0; i < dropdown.length; i++) {
    var temp = "";
    for (let j = 0; j < peopleList.length; j++) {
      var tempPeopleList = peopleList.filter(
        (e) => e !== peopleList[currentlyLoadedUser]
      );
      tempPeopleList.unshift("Choose someone");
      if (data[currentlyLoadedUser][whatRead][i] == tempPeopleList[j]) {
        temp =
          temp +
          `<option value="${tempPeopleList[j]}" selected=true">${tempPeopleList[j]}</option>`;
      } else {
        temp =
          temp +
          `<option value="${tempPeopleList[j]}">${tempPeopleList[j]}</option>`;
      }
    }
    dropdown[i].innerHTML = temp;
  }
}

function changeDropdown(returnedChild, type) {
  var temp = document.querySelector(`.a${returnedChild.toString()}`);
  data[currentlyLoadedUser][type][
    Array.prototype.indexOf.call(temp.parentElement.children, temp)
  ] = temp.value; //data equals position of child in parent's children
  renderNamesInDropdown();
}

function renderUserData(user) {
  var tempCurrentlyLoadedUser = 0;
  if (hoverCurrentlyLoadedUser != 1434) {
    tempCurrentlyLoadedUser = hoverCurrentlyLoadedUser;
  } else {
    tempCurrentlyLoadedUser = currentlyLoadedUser;
  } //hover functionality

  document.querySelector(".username").innerHTML =
    peopleList[tempCurrentlyLoadedUser];

  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.innerHTML = "";
  for (let i = 0; i < data[tempCurrentlyLoadedUser][0].length; i++) {
    scumreadUsers.append(createScumDropdown());
  }
  var townreadUsers = document.querySelector(".user-info-townread-who-users");
  townreadUsers.innerHTML = "";
  for (let i = 0; i < data[tempCurrentlyLoadedUser][1].length; i++) {
    townreadUsers.append(createTownDropdown());
  }
  document.querySelector(".role-input").value =
    notesData[tempCurrentlyLoadedUser][0];
  document.querySelector(".notes-input").value =
    notesData[tempCurrentlyLoadedUser][1];
  var userButtons = document.querySelectorAll(".user");
  for (let i = 0; i < userButtons.length; i++) {
    userButtons[i].style.backgroundColor = "lightgrey";
  }
  userButtons[tempCurrentlyLoadedUser].style.backgroundColor = "grey";
  generateScumreadBy();
  generateTownreadBy();
  renderNamesInDropdown();
}

function clickUser(user) {
  currentlyLoadedUser = peopleList.indexOf(user);
  renderUserData();
}

function hoverUser(user) {
  hoverCurrentlyLoadedUser = peopleList.indexOf(user);
  renderUserData();
}
function unHoverUser(user) {
  hoverCurrentlyLoadedUser = 1434;
  renderUserData();
}

function generateScumreadBy() {
  var temp = "";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][0].length; j++) {
      if (data[i][0].includes(peopleList[currentlyLoadedUser])) {
        temp =
          temp + `<li class="user-info-scumread-by-user">${peopleList[i]}</li>`;
      }
      break;
    }
  }
  document.querySelector(".user-info-scumread-by-users").innerHTML = temp;
}

function generateTownreadBy() {
  var temp = "";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i][1].length; j++) {
      if (data[i][1].includes(peopleList[currentlyLoadedUser])) {
        temp =
          temp + `<li class="user-info-townread-by-user">${peopleList[i]}</li>`;
      }
      break;
    }
  }
  document.querySelector(".user-info-townread-by-users").innerHTML = temp;
}

function saveData() {
  localStorage.setItem("scumreads", JSON.stringify(data));
}

function createScumDropdown() {
  var scumChild = document.createElement("select");
  var trash = document.querySelector(".trash");
  var temp = Math.floor(Math.random() * 9999);
  trash.appendChild(scumChild);
  scumChild.outerHTML = `<select class="user-info-scumread-dropdown a${temp}" name="user-info-scumread-dropdown" onchange="changeDropdown(${temp}, 0)"></select>`;
  try {
    return trash.firstChild;
  } finally {
    trash.innerHTML = "";
  }
}
function createTownDropdown() {
  var townChild = document.createElement("select");
  var trash = document.querySelector(".trash");
  var temp = Math.floor(Math.random() * 9999);
  trash.appendChild(townChild);
  townChild.outerHTML = `<select class="user-info-townread-dropdown a${temp}" name="user-info-townread-dropdown" onchange="changeDropdown(${temp}, 1)"></select>`;
  try {
    return trash.firstChild;
  } finally {
    trash.innerHTML = "";
  }
}

/* NOTESSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSSS */

function notesChange() {
  notesData[currentlyLoadedUser][0] =
    document.querySelector(".role-input").value;
  notesData[currentlyLoadedUser][1] =
    document.querySelector(".notes-input").value;
  localStorage.setItem("notes", JSON.stringify(notesData));
}
