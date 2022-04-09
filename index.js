<html lang="en">
  <head>
    <link rel="stylesheet" href="./style.css" />
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>zsha</title>
  </head>
  <body>
    <div class="container" onclick="showPopup()">
      <span class="mailto" title="click to copy">z@adhamov.com</span>
    </div>
    <span class="popup" id="popup">Email copied to clipboard.</span>
  </body>

  <script>
    const span = document.querySelector(".mailto");

    span.onclick = function () {
      document.execCommand("copy");
    };

    span.addEventListener("copy", function (event) {
      event.preventDefault();
      if (event.clipboardData) {
        event.clipboardData.setData("text/plain", span.textContent);
      }
    });

    function removePopupClass() {
      let popup = document.getElementById("popup");
      popup.classList.remove("show");
    }

    function showPopup() {
      let popup = document.getElementById("popup");
      popup.classList.toggle("show");
      setTimeout(() => {removePopupClass()}, 1800);
    }
  </script>
</html>
