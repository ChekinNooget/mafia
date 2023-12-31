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
] 

notes: [
  user: [
    role: "awef"
    notes: "awef"
    align: "awef"
    alive: true
  ]
  user[
    etc
  ]
  ....
  game info: [

  ]
]*/
var peopleList = [];
var idList = [];
var filetypeList = [];
var currentlyLoadedUser = 0;
var hoverCurrentlyLoadedUser = 1434; //probably error if 1434 users but i doubt that'll ever happen
var tempCurrentlyLoadedUser = 0;
var data;
var notesData;
if (localStorage.getItem("playerlist") != null) {
  var temp = [];
  var originalTemp = JSON.parse(localStorage.getItem("playerlist"));
  originalTemp = originalTemp.trim().split("\n");
  for (let i = 0; i < originalTemp.length; i++) {
    if (originalTemp[i] != "" && originalTemp.indexOf(originalTemp[i]) == i) {
      temp.push(originalTemp[i]);
    }
  }
  var newPlayerlistStorage = "";
  for (let i = 0; i < temp.length; i++) {
    newPlayerlistStorage = newPlayerlistStorage + temp[i] + "\n";
  }
  newPlayerlistStorage = newPlayerlistStorage.trim();
  localStorage.setItem("playerlist", JSON.stringify(newPlayerlistStorage));
  for (let i = 0; i < temp.length; i++) {
    if (temp[i].includes(" ")) {
      peopleList.push(temp[i].split(" ")[0]);
      if (temp[i].split(" ").length >= 2) {
        idList.push(temp[i].split(" ")[1]);
      } else {
        idList.push("0");
      }
      if (temp[i].split(" ").length >= 3) {
        filetypeList.push(temp[i].split(" ")[2]);
      } else {
        filetypeList.push("png");
      }
    } else {
      peopleList.push(temp[i]);
      idList.push("0");
      filetypeList.push("png");
    }
  }
} else {
  peopleList = [
    "aayr",
    "Technodoggo",
    "aidan0626",
    "lucaswujc",
    "Aminecraftbear",
  ];
  idList = ["501245", "532454", "519740", "554808", "977249"];
  filetypeList = ["png", "png", "jpg", "jpg", "jpg"];
  localStorage.setItem(
    "playerlist",
    JSON.stringify(`aayr 501245 png
Technodoggo 532454 png
aidan0626 519740 jpg
lucaswujc 554808 jpg
Aminecraftbear 977249 jpg`)
  );
}
document.querySelector(".userlist-textarea").value = JSON.parse(
  localStorage.getItem("playerlist")
);
if (localStorage.getItem("scumreads") != null) {
  data = JSON.parse(localStorage.getItem("scumreads"));
  var temp = peopleList.length - data.length;
  if (data.length < peopleList.length) {
    for (let i = 0; i < temp; i++) {
      data.push([[], []]);
    }
  }
} else {
  data = [];
  for (let i = 0; i < peopleList.length; i++) {
    data[i] = [[], []];
  }
  localStorage.setItem("scumreads", JSON.stringify(data));
}
if (localStorage.getItem("notes") != null) {
  notesData = JSON.parse(localStorage.getItem("notes"));
  if (notesData.length - 1 < peopleList.length) {
    var temp = peopleList.length - notesData.length;
    notesData.pop();
    for (let i = 0; i < temp + 1; i++) {
      notesData.push(["", "", "none", true]);
    }
    notesData.push("");
  }
} else {
  notesData = [];
  for (let i = 0; i < peopleList.length; i++) {
    notesData.push(["", "", "none", true]);
  }
  notesData.push("");
  localStorage.setItem("notes", JSON.stringify(notesData));
}

var temp = "";
temp = "";
var userWrap = document.querySelector(".user-wrap");
for (let i = 0; i < peopleList.length; i++) {
  if (filetypeList[i] != "png" && filetypeList[i] != "jpg") {
    filetypeList[i] = "png";
  }
  temp =
    temp +
    `<img style="background-image: url(https://avatar.artofproblemsolving.com/avatar_${idList[i]}.${filetypeList[i]})" class="user user${i}" onclick="clickUser('${peopleList[i]}')" onmouseover="hoverUser('${peopleList[i]}')" onmouseout="unHoverUser('${peopleList[i]}')"/>`;
}
userWrap.innerHTML = temp;
document.querySelector(".align-dropdown").value = "none";
document.querySelector(".game-info-textarea").value =
  notesData[notesData.length - 1];
renderUserData(peopleList[tempCurrentlyLoadedUser]);

function userlistChange() {
  var userlistTextarea = document.querySelector(".userlist-textarea");
  localStorage.setItem("playerlist", JSON.stringify(userlistTextarea.value));
  location.reload();
  //create div, split by space for user id, etc
}

function addScumreadWho() {
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.appendChild(createScumDropdown());
  data[tempCurrentlyLoadedUser][0].push(peopleList[tempCurrentlyLoadedUser]);
  renderNamesInDropdown();
}
function removeScumreadWho() {
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.removeChild(scumreadUsers.lastChild);
  data[tempCurrentlyLoadedUser][0].pop();
  renderNamesInDropdown();
}
function addTownreadWho() {
  var townChildreadUsers = document.querySelector(
    ".user-info-townread-who-users"
  );
  townChildreadUsers.appendChild(createTownDropdown());
  data[tempCurrentlyLoadedUser][1].push(peopleList[tempCurrentlyLoadedUser]);
  renderNamesInDropdown();
}
function removeTownreadWho() {
  var scumreadUsers = document.querySelector(".user-info-townread-who-users");
  scumreadUsers.removeChild(scumreadUsers.lastChild);
  data[tempCurrentlyLoadedUser][1].pop();
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
        (e) => e !== peopleList[tempCurrentlyLoadedUser]
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
  data[tempCurrentlyLoadedUser][type][
    Array.prototype.indexOf.call(temp.parentElement.children, temp)
  ] = temp.value; //data equals position of child in parent's children
  renderNamesInDropdown();
}

function renderUserData(user) {
  tempCurrentlyLoadedUser = 0;
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
  if (notesData[tempCurrentlyLoadedUser][2] != "") {
    document.querySelector(".align-dropdown").value =
      notesData[tempCurrentlyLoadedUser][2];
  } else {
    document.querySelector(".align-dropdown").value = "none";
  }

  document.querySelector(".alive-check").checked =
    notesData[tempCurrentlyLoadedUser][3];

  for (let i = 0; i < notesData.length - 1; i++) {
    var temp = document.querySelector(`.user${i}`);
    if (notesData[i][3] == false) {
      temp.setAttribute("src", "cross.png");
      temp.style.opacity = "0.5";
    } else {
      temp.setAttribute(
        "src",
        "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs="
      );
      temp.style.opacity = "1";
    }
  }

  var userButtons = document.querySelectorAll(".user");
  //background colorssss
  //not selected
  for (let i = 0; i < userButtons.length; i++) {
    if (notesData[i][2] == "town") {
      userButtons[i].style.backgroundColor = "#70f567";
    } else if (notesData[i][2] == "mafia") {
      userButtons[i].style.backgroundColor = "#ff8f8f";
    } else if (notesData[i][2] == "third") {
      userButtons[i].style.backgroundColor = "#ff9efc";
    } else if (notesData[i][2] == "other") {
      userButtons[i].style.backgroundColor = "#b4a3ff";
    } else {
      userButtons[i].style.backgroundColor = "#bdbdbd";
    }
  }
  //hovered
  if (notesData[tempCurrentlyLoadedUser][2] == "town") {
    userButtons[tempCurrentlyLoadedUser].style.backgroundColor = "#34de28";
  } else if (notesData[tempCurrentlyLoadedUser][2] == "mafia") {
    userButtons[tempCurrentlyLoadedUser].style.backgroundColor = "#ff4229";
  } else if (notesData[tempCurrentlyLoadedUser][2] == "third") {
    userButtons[tempCurrentlyLoadedUser].style.backgroundColor = "#cf00c4";
  } else if (notesData[tempCurrentlyLoadedUser][2] == "other") {
    userButtons[tempCurrentlyLoadedUser].style.backgroundColor = "#4e26ff";
  } else {
    userButtons[tempCurrentlyLoadedUser].style.backgroundColor = "#777777";
  }
  //selected
  if (notesData[currentlyLoadedUser][2] == "town") {
    userButtons[currentlyLoadedUser].style.backgroundColor = "#00750c";
  } else if (notesData[currentlyLoadedUser][2] == "mafia") {
    userButtons[currentlyLoadedUser].style.backgroundColor = "#b51500";
  } else if (notesData[currentlyLoadedUser][2] == "third") {
    userButtons[currentlyLoadedUser].style.backgroundColor = "#570054";
  } else if (notesData[currentlyLoadedUser][2] == "other") {
    userButtons[currentlyLoadedUser].style.backgroundColor = "#14006e";
  } else {
    userButtons[currentlyLoadedUser].style.backgroundColor = "#454545";
  }

  var fullUserlist = document.querySelector(".userlist-full");
  var temp = "";
  for (let i = 0; i < peopleList.length; i++) {
    temp =
      temp +
      `<div class="userlist-user userlist-user${i}">
            <div class="aops-font userlist-icon">w</div>
            <div class="userlist-username" >${peopleList[i]}</div>
          </div>`;
  }
  fullUserlist.innerHTML = temp;
  var userlistNames = document.querySelectorAll(".userlist-username");
  var userlistIcons = document.querySelectorAll(".userlist-icon");
  for (let i = 0; i < peopleList.length; i++) {
    if (notesData[i][3] == false) {
      userlistNames[i].style.textDecorationLine = "line-through";
    }
    if (notesData[i][2] == "town") {
      userlistIcons[i].style.color = "#00750c";
    } else if (notesData[i][2] == "mafia") {
      userlistIcons[i].style.color = "#b51500";
    } else if (notesData[i][2] == "third") {
      userlistIcons[i].style.color = "#570054";
    } else if (notesData[i][2] == "other") {
      userlistIcons[i].style.color = "#14006e";
    } else {
      userlistIcons[i].style.color = "#454545";
    }
    if (notesData[i][0] != "") {
      userlistNames[i].title = notesData[i][0];
    }
  }
  document.querySelector(
    `.userlist-user${currentlyLoadedUser}`
  ).style.fontWeight = "900";

  generateScumreadBy();
  generateTownreadBy();
  renderNamesInDropdown();
}
/*:root {
  --none: #bdbdbd;
  --none-select: #454545;
  --town: #d0f07a;
  --town-select: #00750c;
  --scum: #ff8f8f;
  --scum-select: #8a0000;
  --third: #ff9efc;
  --third-select: #570054;
} */

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
      if (data[i][0].includes(peopleList[tempCurrentlyLoadedUser])) {
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
      if (data[i][1].includes(peopleList[tempCurrentlyLoadedUser])) {
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
  notesData[tempCurrentlyLoadedUser][0] =
    document.querySelector(".role-input").value;
  notesData[tempCurrentlyLoadedUser][1] =
    document.querySelector(".notes-input").value;
  notesData[tempCurrentlyLoadedUser][2] =
    document.querySelector(".align-dropdown").value;
  notesData[tempCurrentlyLoadedUser][3] =
    document.querySelector(".alive-check").checked;
  document.querySelector(".alive-check").checked =
    notesData[tempCurrentlyLoadedUser][3];
  notesData[notesData.length - 1] = document.querySelector(
    ".game-info-textarea"
  ).value;
  localStorage.setItem("notes", JSON.stringify(notesData));
  renderUserData();
}

function importChange() {
  if (
    document.querySelector(".import-textarea").value.includes("-| awef 1434")
  ) {
    var temp = document
      .querySelector(".import-textarea")
      .value.split("-| awef 1434");
    localStorage.setItem("playerlist", JSON.parse(temp[0]));
    localStorage.setItem("scumreads", JSON.parse(temp[1]));
    localStorage.setItem("notes", JSON.parse(temp[2]));
    location.reload();
  } else {
    document.querySelector(".files-header").textContent =
      "It looks like your data is invalid!";
  }
}
function exportData() {
  var temp = "";
  temp =
    temp + JSON.stringify(localStorage.getItem("playerlist")) + "-| awef 1434";
  temp =
    temp + JSON.stringify(localStorage.getItem("scumreads")) + "-| awef 1434";
  temp = temp + JSON.stringify(localStorage.getItem("notes"));
  var area = document.querySelector(".import-textarea");
  area.value = temp;
}
