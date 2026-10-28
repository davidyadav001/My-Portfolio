document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("contactForm");
  var status = document.getElementById("formStatus");

  if (!form || !status) {
    return;
  }

  form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) {
      return;
    }

    var fields = new FormData(form);
    var subject = encodeURIComponent(fields.get("subject"));
    var body = encodeURIComponent(
      "Name: " +
        fields.get("name") +
        "\nEmail: " +
        fields.get("email") +
        "\n\n" +
        fields.get("message")
    );

    window.location.href =
      "mailto:davidyadav9818@gmail.com?subject=" + subject + "&body=" + body;
    status.textContent =
      "Your email app should open now. If it does not, email davidyadav9818@gmail.com.";
  });
});
