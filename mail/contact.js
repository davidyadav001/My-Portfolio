$(function () {
  // For Netlify Forms, we need to handle the form submission differently
  if ($("#contactForm").attr("data-netlify") === "true") {
    // Remove the validation that prevents form submission
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
      preventSubmit: false,
      submitError: function ($form, event, errors) {},
      submitSuccess: function ($form, event) {
        // Don't prevent the default form submission - let Netlify handle it
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
  } else {
    // Original PHP backend code for non-Netlify hosting
    $("#contactForm input, #contactForm textarea").jqBootstrapValidation({
      preventSubmit: true,
      submitError: function ($form, event, errors) {},
      submitSuccess: function ($form, event) {
        event.preventDefault();
        var name = $("input#name").val();
        var email = $("input#email").val();
        var subject = $("input#subject").val();
        var message = $("textarea#message").val();

        $this = $("#sendMessageButton");
        $this.prop("disabled", true);

        $.ajax({
          url: "mail/contact.php",
          type: "POST",
          data: {
            name: name,
            email: email,
            subject: subject,
            message: message,
          },
          cache: false,
          success: function () {
            $("#success").html("<div class='alert alert-success'>");
            $("#success > .alert-success")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-success").append(
              "<strong>Your message has been sent. </strong>"
            );
            $("#success > .alert-success").append("</div>");
            $("#contactForm").trigger("reset");
          },
          error: function () {
            $("#success").html("<div class='alert alert-danger'>");
            $("#success > .alert-danger")
              .html(
                "<button type='button' class='close' data-dismiss='alert' aria-hidden='true'>&times;"
              )
              .append("</button>");
            $("#success > .alert-danger").append(
              $("<strong>").text(
                "Sorry " +
                  name +
                  ", it seems that our mail server is not responding. Please try again later!"
              )
            );
            $("#success > .alert-danger").append("</div>");
            $("#contactForm").trigger("reset");
          },
          complete: function () {
            setTimeout(function () {
              $this.prop("disabled", false);
            }, 1000);
          },
        });
      },
      filter: function () {
        return $(this).is(":visible");
      },
    });
  }

  $('a[data-toggle="tab"]').click(function (e) {
    e.preventDefault();
    $(this).tab("show");
  });
});

$("#name").focus(function () {
  $("#success").html("");
});
