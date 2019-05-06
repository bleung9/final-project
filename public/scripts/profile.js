$(document).ready(function() {
  $("button").click(function(e) {
    e.preventDefault()
    $(".form-group input").attr("disabled", false);
  });
});