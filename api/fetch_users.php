<?php

require_once '../config/connection.php';

// Retrieve data from the third-party API
$json = file_get_contents("https://randomuser.me/api/?results=10");
$data = json_decode($json, true);

// Check if the API returned any results
if (!isset($data['results'])) {
    echo "Error: Unable to retrieve results from API";
    exit();
}


// Build multi-row INSERT statement
$insertQuery = "INSERT INTO users (name, age, country, email, profile_pic) VALUES ";

// Iterate on users and build the SQL query
foreach ($data['results'] as $user) {
    // mysqli_real_escape_string used to:
    $name = mysqli_real_escape_string($conn, $user['name']['first'] . ' ' . $user['name']['last']);
    $age = mysqli_real_escape_string($conn, $user['dob']['age']);
    $country = mysqli_real_escape_string($conn, $user['location']['country']);
    $email = mysqli_real_escape_string($conn, $user['email']);
    $profile_pic = mysqli_real_escape_string($conn, $user['picture']['large']);

    $insertQuery .= "('$name', $age, '$country', '$email', '$profile_pic'),";
}

// Remove the trailing comma
$insertQuery = rtrim($insertQuery, ",");

// Insert the data into the database
if (mysqli_query($conn, $insertQuery)) {
    echo "Records inserted successfully.";
} else {
    echo "Error inserting records: " . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);