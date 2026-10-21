/*
  FILE: script.js
  This is the JavaScript file. JavaScript makes the page DO things.
  This file does 3 small jobs:
    1. Writes the current year in the footer.
    2. Switches between light mode and dark mode.
    3. Checks the contact form and opens the email app.

  How to read this file:
  - "const" saves a value with a name. Example: const age = 20;
  - "function" is a small block of steps that has a name.
  - document.getElementById("x") finds the HTML element that has id="x".
  - addEventListener("click", ...) means: "when the user clicks, do this".
  - Text after two slashes (//) is a comment. The computer ignores it.
*/


// ============ 1. SHOW THE CURRENT YEAR IN THE FOOTER ============

// Find the <span id="year"> in the HTML
const yearSpan = document.getElementById("year");

// new Date() is today's date. getFullYear() gives only the year, like 2026.
yearSpan.textContent = new Date().getFullYear();


// ============ 2. DARK MODE BUTTON ============

// Find the button and the page body
const themeButton = document.getElementById("theme-button");
const pageBody = document.body;

// This function changes the button text to match the current mode.
function updateButtonText() {
  if (pageBody.classList.contains("dark")) {
    themeButton.textContent = "Light mode";   // we are in dark mode now
  } else {
    themeButton.textContent = "Dark mode";    // we are in light mode now
  }
}

// When the page opens, check if the visitor chose dark mode last time.
// localStorage is a small box in the browser that remembers things.
// "try" is used because some browsers can block localStorage.
try {
  if (localStorage.getItem("theme") === "dark") {
    pageBody.classList.add("dark");
  }
} catch (error) {
  // If it is blocked, we do nothing. The page just stays in light mode.
}
updateButtonText();

// When the button is clicked: turn dark mode on or off.
themeButton.addEventListener("click", function () {
  // toggle adds the class "dark" if it is missing, and removes it if it is there.
  pageBody.classList.toggle("dark");
  updateButtonText();

  // Save the choice, so the page remembers it next time.
  try {
    if (pageBody.classList.contains("dark")) {
      localStorage.setItem("theme", "dark");
    } else {
      localStorage.setItem("theme", "light");
    }
  } catch (error) {
    // If saving is blocked, we do nothing.
  }
});


// ============ 3. CONTACT FORM ============

// Find the form and the empty message paragraph
const contactForm = document.getElementById("contact-form");
const formMessage = document.getElementById("form-message");

// My email address. The form opens an email to this address.
const myEmail = "syedabdulqadirgilani7860@gmail.com";

// When the visitor clicks "Send message":
contactForm.addEventListener("submit", function (event) {
  // Stop the page from reloading (the normal behavior of a form).
  event.preventDefault();

  // Read what the visitor typed. trim() removes extra spaces at the start and end.
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const message = document.getElementById("message").value.trim();

  // Check that nothing is empty.
  if (name === "" || email === "" || message === "") {
    formMessage.textContent = "Please fill in all the boxes.";
    return;   // stop here, do not go further
  }

  // Make the email subject and body.
  // encodeURIComponent changes special letters so they are safe inside a link.
  const subject = encodeURIComponent("Message from " + name);
  const body = encodeURIComponent(message + "\n\nFrom: " + name + " (" + email + ")");

  // Show a friendly message.
  formMessage.textContent = "Thank you, " + name + "! Your email app is opening.";

  // Open the visitor's email app with everything filled in.
  window.location.href = "mailto:" + myEmail + "?subject=" + subject + "&body=" + body;

  // Clear the form boxes.
  contactForm.reset();
});
