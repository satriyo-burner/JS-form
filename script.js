const form = document.getElementById("registrationForm");

const fields = {
  fullName: document.getElementById("fullName"),
  email: document.getElementById("email"),
  password: document.getElementById("password"),
  confirmPassword: document.getElementById("confirmPassword"),
  extracurricular: document.getElementById("extracurricular")
};

const successMessage = document.getElementById("successMessage");

function showResult(field, isValid, message = "") {
  field.classList.toggle("is-valid", isValid);
  field.classList.toggle("is-invalid", !isValid);

  const feedback = field.parentElement.querySelector(".invalid-feedback");
  feedback.textContent = message;
}

function validateField(fieldName) {
  const field = fields[fieldName];
  const value = field.value.trim();
  let message = "";

  if (fieldName === "fullName") {
    if (value.length < 3) message = "Nama harus diisi minimal 3 karakter.";
  }

  if (fieldName === "email") {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(value)) message = "Masukkan alamat email yang valid.";
  }

  if (fieldName === "password") {
    if (value.length < 8) message = "Password minimal 8 karakter.";
  }

  if (fieldName === "confirmPassword") {
    if (value !== fields.password.value) message = "Konfirmasi password harus sama.";
  }

  if (fieldName === "extracurricular") {
    if (value === "") message = "Silakan pilih ekstrakurikuler.";
  }

  showResult(field, message === "", message);
  return message === "";
}

Object.keys(fields).forEach((fieldName) => {
  fields[fieldName].addEventListener("input", () => {
    validateField(fieldName);
    successMessage.classList.add("d-none");

    if (fieldName === "password" && fields.confirmPassword.value !== "") {
      validateField("confirmPassword");
    }
  });

  fields[fieldName].addEventListener("change", () => {
    validateField(fieldName);
    successMessage.classList.add("d-none");
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const isFormValid = Object.keys(fields).every(validateField);

  if (isFormValid) {
    successMessage.classList.remove("d-none");
    form.reset();

    Object.values(fields).forEach((field) => {
      field.classList.remove("is-valid", "is-invalid");
    });
  } else {
    successMessage.classList.add("d-none");
  }
});
