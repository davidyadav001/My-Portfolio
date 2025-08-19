$(function () {
  // Simple form validation and success handling for Netlify Forms
  $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
    preventSubmit: false, // Allow form to submit naturally to Netlify
    submitError: function ($form, event, errors) {
      // Handle validation errors
      console.log("Form validation errors:", errors);
    },
    submitSuccess: function ($form, event) {
      // Form is valid and will submit to Netlify
      var $this = $("#sendMessageButton");
      $this.prop("disabled", true);

      // Show success message
      $("#success").html("<div class='alert alert-success'>");
      $("#success > .alert-success")
        .html(
          "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
        )
        .append("</button>");
      $("#success > .alert-success").append(
        "<strong>Your message has been sent successfully! </strong>"
      );
      $("#success > .alert-success").append("</div>");

      // Reset form and re-enable button after a delay
      setTimeout(function () {
        $("#contactForm").trigger("reset");
        $this.prop("disabled", false);
      }, 2000);
    },
    filter: function () {
      return $(this).is(":visible");
    },
  });

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});
