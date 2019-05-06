$(document).ready(function() {
  $("#edit").click(function(e) {
    e.preventDefault()
    $(".form-group input").attr("disabled", false);
  });
});