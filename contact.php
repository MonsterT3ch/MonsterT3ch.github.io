<?php
// Check if the form is submitted using POST method
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Get form data using $_POST superglobal
    $name = $_POST["name"];
    $email = $_POST["email"];
    $message = $_POST["message"];

    // Set up recipient email
    $to = "monstert3ch@outlook.com"; // Change this to your email address

    // Email subject
    $subject = "New Contact Form Submission from Precision Code Studio";

    // Email body
    $body = "Name: $name\n";
    $body .= "Email: $email\n";
    $body .= "Message:\n$message";

    // Email headers
    $headers = "From: $name <$email>";

    // Attempt to send the email
    if (mail($to, $subject, $body, $headers)) {
        // Email sent successfully
        $response = array("success" => true, "message" => "Thank you! Your message has been sent.");
    } else {
        // Email sending failed
        $response = array("success" => false, "message" => "Oops! Something went wrong. Please try again later.");
    }

    // Send JSON response back to JavaScript
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    // If it's not a POST request, redirect back to the form page
    header("Location: getting-started.html");
    exit();
}
?>
