<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $targetDir = "uploads/";
    $targetFile = $targetDir . basename($_FILES["pdf-file"]["name"]);
    $uploadOk = 1;
    $fileType = strtolower(pathinfo($targetFile, PATHINFO_EXTENSION));

    // Check if file is PDF
    if($fileType != "pdf") {
        echo "Sorry, only PDF files are allowed.";
        $uploadOk = 0;
    }

    // Check file size (5MB max)
    if ($_FILES["pdf-file"]["size"] > 5000000) {
        echo "Sorry, your file is too large.";
        $uploadOk = 0;
    }

    // Upload file if all checks pass
    if ($uploadOk == 1) {
        if (move_uploaded_file($_FILES["pdf-file"]["tmp_name"], $targetFile)) {
            echo "The file ". htmlspecialchars(basename($_FILES["pdf-file"]["name"])). " has been uploaded.";
        } else {
            echo "Sorry, there was an error uploading your file.";
        }
    }
}
?><form id="pdf-upload-form" action="upload.php" method="post" enctype="multipart/form-data">
    <label for="pdf-file">Select PDF file to upload:</label>
    <input type="file" name="pdf-file" id="pdf-file" accept=".pdf" required>
    <button type="submit">Upload PDF</button>