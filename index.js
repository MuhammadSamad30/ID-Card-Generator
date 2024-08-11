document.getElementById('idForm').addEventListener('submit', function(e) {
    e.preventDefault();
    updatePreview();
});

document.getElementById('imageUpload').addEventListener('change', function(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImage').src = e.target.result;
    }
    reader.readAsDataURL(file);
});

document.getElementById('downloadPDF').addEventListener('click', function() {
    generatePDF();
});

function updatePreview() {
    document.getElementById('previewName').textContent = document.getElementById('name').value;
    document.getElementById('previewAge').textContent = document.getElementById('age').value;
    document.getElementById('previewRollNumber').textContent = document.getElementById('rollNumber').value;
}

function generatePDF() {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Get the values from the preview
    const name = document.getElementById('previewName').textContent;
    const age = document.getElementById('previewAge').textContent;
    const rollNumber = document.getElementById('previewRollNumber').textContent;
    const imgData = document.getElementById('previewImage').src;

    // Add image
    if (imgData) {
        doc.addImage(imgData, 'PNG', 10, 10, 50, 50); // Adjust dimensions as needed
    }

    // Add text
    doc.setFontSize(12);
    doc.text(`Name: ${name}`, 70, 20);
    doc.text(`Age: ${age}`, 70, 30);
    doc.text(`Roll Number: ${rollNumber}`, 70, 40);

    // Save the PDF
    doc.save('ID_Card.pdf');
}
