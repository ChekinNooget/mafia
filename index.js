/* data: [
    user: [
        scumreadwho: [
            awef, awef, awef
        ]
        scumreadby:[
            awef, awef, awef
        ]
    ]
    user: [
        scumreadwho: [
            awef, awef, awef
        ]
        scumreadby:[
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
var currentlyLoadedUser = 0;
var data;
if (localStorage.getItem("scumreads") != null) {
  data = JSON.parse(localStorage.getItem("scumreads"));
} else {
  data = [];
  for (let i = 0; i < peopleList.length; i++) {
    data[i] = [];
  }
}
var temp = "";
temp = "";
var userWrap = document.querySelector(".user-wrap");
for (let i = 0; i < peopleList.length; i++) {
  temp =
    temp +
    `<div class="user" onclick="clickUser('${peopleList[i]}')">${peopleList[i]}</div>`;
}
userWrap.innerHTML = temp;
clickUser(peopleList[currentlyLoadedUser]);

function addScumreadWho() {
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.appendChild(createDropdown());
  data[currentlyLoadedUser].push(peopleList[currentlyLoadedUser]);
  renderNamesInDropdown();
}
function removeScumreadWho() {
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.removeChild(scumreadUsers.lastChild);
  data[currentlyLoadedUser].pop();
  renderNamesInDropdown();
}
function renderNamesInDropdown() {
  //this function remakes all of the options in the selector to refresh it
  console.log(JSON.stringify(data));
  if (
    document.querySelector(".user-info-scumread-who-users").childElementCount <=
    0
  ) {
    document.querySelector(".user-info-scumread-who-remove").disabled = true;
  } else {
    document.querySelector(".user-info-scumread-who-remove").disabled = false;
  }
  var dropdown = document.querySelectorAll(".user-info-scumread-dropdown");
  for (let i = 0; i < dropdown.length; i++) {
    var temp = "";
    for (let j = 0; j < peopleList.length; j++) {
      var tempPeopleList = peopleList.filter(
        (e) => e !== peopleList[currentlyLoadedUser]
      );
      tempPeopleList.unshift("Choose someone");
      console.log(JSON.stringify(data));
      if (data[currentlyLoadedUser][i] == tempPeopleList[j]) {
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
  saveData();
}

function changeDropdown(returnedChild) {
  var temp = document.querySelector(`.a${returnedChild.toString()}`);
  data[currentlyLoadedUser][
    Array.prototype.indexOf.call(temp.parentElement.children, temp)
  ] = temp.value; //data equals position of child in parent's children
  renderNamesInDropdown();
}

function clickUser(user) {
  currentlyLoadedUser = peopleList.indexOf(user);
  var scumreadUsers = document.querySelector(".user-info-scumread-who-users");
  scumreadUsers.innerHTML = "";
  for (let i = 0; i < data[currentlyLoadedUser].length; i++) {
    scumreadUsers.append(createDropdown());
  }
  generateScumreadBy();
  renderNamesInDropdown();
}
function generateScumreadBy() {
  var temp = "";
  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].length; j++) {
      if (data[i].includes(peopleList[currentlyLoadedUser])) {
        temp =
          temp + `<li class="user-info-scumread-by-user">${peopleList[i]}</li>`;
      }
      break;
    }
  }
  document.querySelector(".user-info-scumread-by-users").innerHTML = temp;
}
function saveData() {
  localStorage.setItem("scumreads", JSON.stringify(data));
}

function createDropdown() {
  var scumChild = document.createElement("select");
  var trash = document.querySelector(".trash");
  var temp = Math.floor(Math.random() * 9999);
  trash.appendChild(scumChild);
  scumChild.outerHTML = `<select class="user-info-scumread-dropdown a${temp}" name="user-info-scumread-dropdown" onchange="changeDropdown(${temp})"></select>`;
  try {
    return trash.firstChild;
  } finally {
    trash.innerHTML = "";
  }
}
