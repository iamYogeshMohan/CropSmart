const cameraInput = document.getElementById('camera-input');
const analysisResult = document.getElementById('analysis-result');
const healthStatus = document.getElementById('health-status');
const previewContainer = document.getElementById('scan-preview');

cameraInput.addEventListener('change', function (event) {
    if (event.target.files.length > 0) {
        const file = event.target.files[0];

        // Show Image Preview
        if (previewContainer) {
            const reader = new FileReader();
            reader.onload = function (e) {
                previewContainer.innerHTML = `<img src="${e.target.result}" style="width:100%; border-radius:10px; margin-bottom:1rem; max-height:200px; object-fit:cover;">`;
            }
            reader.readAsDataURL(file);
        }

        // Show loading state
        analysisResult.style.display = 'block';
        healthStatus.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Analyzing image...';

        // Mock processing delay
        setTimeout(() => {
            const results = [
                { status: "Healthy Crop", color: "green", icon: "fa-check-circle" },
                { status: "Leaf Blight Detected", color: "red", icon: "fa-exclamation-triangle" },
                { status: "Nitrogen Deficiency", color: "orange", icon: "fa-leaf" }
            ];

            // Randomly select a result for demo
            const randomResult = results[Math.floor(Math.random() * results.length)];

            healthStatus.innerHTML = `
                <strong style="color: ${randomResult.color}; font-size:1.1rem;">
                    <i class="fas ${randomResult.icon}"></i> ${randomResult.status}
                </strong>
                <p style="margin-top:0.5rem; font-size:0.9rem;">
                    Suggested Action: ${getSuggestion(randomResult.status)}
                </p>
            `;
        }, 2000); // 2 second delay
    }
});

function getSuggestion(status) {
    if (status.includes("Healthy")) return "Continue current maintenance.";
    if (status.includes("Blight")) return "Apply fungicide and improve air circulation.";
    if (status.includes("Deficiency")) return "Add nitrogen-rich fertilizer or compost.";
    return "Consult a local expert.";
}
