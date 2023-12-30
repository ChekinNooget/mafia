var dataModal = document.querySelector(".userlist-modal");
var fileModal = document.querySelector(".files-modal");
var overlay = document.querySelector(".overlay");
var openDataBtn = document.querySelector(".data-open");
var openFileBtn = document.querySelector(".file-open");
var closeModalBtn = document.querySelectorAll(".btn-close");

// close modal function
const closeModal = function () {
  dataModal.classList.add("hidden");
  fileModal.classList.add("hidden");
  overlay.classList.add("hidden");
};

// close the modal when the close button and overlay is clicked
for (let i = 0; i < closeModalBtn.length; i++) {
  closeModalBtn[i].addEventListener("click", closeModal);
}
overlay.addEventListener("click", closeModal);

// close modal when the Esc key is pressed
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !dataModal.classList.contains("hidden")) {
    closeModal();
  }
});

// open modal function
const openModal = function () {
  dataModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
}; // open modal function
const openFile = function () {
  fileModal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openDataBtn.addEventListener("click", openModal);
openFileBtn.addEventListener("click", openFile);
