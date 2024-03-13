document.addEventListener("DOMContentLoaded", function() {
    // Get the modal
    var modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("openModal");

    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];

    // When the user clicks the button, open the modal
    btn.onclick = function() {
        modal.style.display = "block";
    }

    // When the user clicks on <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Get the form element
    var contactForm = document.getElementById("contactForm");

    // Submit form with AJAX
    contactForm.addEventListener("submit", function(event) {
        event.preventDefault();

        var formData = new FormData(contactForm);
        var xhr = new XMLHttpRequest();

        xhr.open("POST", "contact.php", true);
        xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

        xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
                if (xhr.status === 200) {
                    var response = JSON.parse(xhr.responseText);
                    alert(response.message);
                    if (response.success) {
                        // Reset the form if the email was sent successfully
                        contactForm.reset();
                        // Close the modal
                        modal.style.display = "none";
                        // Show thank you message
                        showThankYouMessage();
                    }
                } else {
                    alert("Oops! Something went wrong. Please try again later.");
                }
            }
        };

        xhr.send(new URLSearchParams(formData));
    });

    // Function to show thank you message
    function showThankYouMessage() {
        var thankYouMessage = document.createElement("div");
        thankYouMessage.innerHTML = "<h2>Thank You!</h2><p>Your message has been sent successfully.</p>";
        thankYouMessage.classList.add("thank-you-message");
        document.body.appendChild(thankYouMessage);

        setTimeout(function() {
            thankYouMessage.remove();
        }, 5000); // Remove the message after 5 seconds
    }
});
