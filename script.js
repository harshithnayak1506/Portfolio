document.addEventListener("DOMContentLoaded", function () {
  emailjs.init("OPkvkyDtKI3P_kgpH");

  const form = document.getElementById("contact-form");
  const sendBtn = document.getElementById("send-btn");
  const btnText = document.getElementById("btn-text");
  const btnLoader = document.getElementById("btn-loader");

  const showToast = (message, isError = false) => {
    const toast = document.getElementById("toast");
    toast.textContent = message;
    toast.className = `toast show${isError ? " error" : ""}`;
    setTimeout(() => {
      toast.className = "toast";
    }, 4000);
  };

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      showToast("Please fill out all fields.", true);
      return;
    }

    // Show loader
    btnText.style.display = "none";
    btnLoader.style.display = "inline-block";

    emailjs.sendForm("service_oq5eiaq", "template_x3y6z0o", form)
      .then(function () {
        showToast(`Thank you, ${name}! Message sent successfully.`);
        form.reset();
      }, function (error) {
        console.error("EmailJS error:", error);
        showToast("Failed to send message. Please try again.", true);
      })
      .finally(() => {
        btnText.style.display = "inline";
        btnLoader.style.display = "none";
      });
  });
});
