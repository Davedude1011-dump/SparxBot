// Retrieve the canvas element and set its width and height
const canvas = document.getElementById("whiteboard");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const context = canvas.getContext("2d");

let isDrawing = false;
let isErasing = false;
let lastX = 0;
let lastY = 0;
let brushSize = 3;

// Create a crosshair element
const crosshair = document.createElement("div");
crosshair.style.position = "fixed";
crosshair.style.top = "0";
crosshair.style.left = "0";
crosshair.style.pointerEvents = "none";
crosshair.style.border = "1px solid black";
crosshair.style.borderRadius = "50%";
crosshair.style.transform = "translate(-50%, -50%)";
document.body.appendChild(crosshair);

// Function to update the crosshair position
function updateCrosshairPosition(x, y) {
  crosshair.style.top = `${y}px`;
  crosshair.style.left = `${x}px`;
}

// Function to update the crosshair size
function updateCrosshairSize() {
  const size = isErasing ? brushSize * 10 : brushSize;
  crosshair.style.width = `${size}px`;
  crosshair.style.height = `${size}px`;
}

// Function to draw on the canvas
function draw(e) {
  if (!isDrawing && !isErasing) return;

  if (isDrawing) {
    // Draw
    context.beginPath();
    context.moveTo(lastX, lastY);
    context.lineTo(e.clientX, e.clientY);
    context.lineWidth = brushSize;
    context.strokeStyle = "black";
    context.stroke();
  } else if (isErasing) {
    // Erase
    context.clearRect(
      e.clientX - brushSize * 5,
      e.clientY - brushSize * 5,
      brushSize * 10,
      brushSize * 10
    );
  }

  // Update last position
  lastX = e.clientX;
  lastY = e.clientY;

  // Update crosshair position
  updateCrosshairPosition(e.clientX, e.clientY);
}

// Function to handle mouse button presses
function handleMouseDown(e) {
  if (e.button === 0) {
    isDrawing = true;
    lastX = e.clientX;
    lastY = e.clientY;
    draw(e); // Draw a dot immediately on mousedown
  } else if (e.button === 2) {
    isErasing = true;
    updateCrosshairSize(); // Update crosshair size on eraser activation
  }
}

// Function to handle mouse button releases
function handleMouseUp() {
  isDrawing = false;
  isErasing = false;
  updateCrosshairSize(); // Reset crosshair size on eraser deactivation
}

// Function to handle middle click for navigation and canvas reset
function handleMiddleClick(e) {
  if (e.button === 1) {
    e.preventDefault();
    // Reset the canvas
    context.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Function to handle the click event on the canvas
function handleCanvasClick(e) {
  if (e.button === 0) {
    // Draw a dot at the clicked position
    context.beginPath();
    context.arc(e.clientX, e.clientY, brushSize / 2, 0, 2 * Math.PI);
    context.fillStyle = "black";
    context.fill();
  }
}

// Event listeners
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mousedown", handleMouseDown);
canvas.addEventListener("mouseup", handleMouseUp);
canvas.addEventListener("click", handleCanvasClick);
document.addEventListener("contextmenu", (e) => e.preventDefault());
document.addEventListener("mousedown", handleMiddleClick);

// Resize canvas when the window is resized
window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

// Update crosshair size initially and on window resize
updateCrosshairSize();
window.addEventListener("resize", updateCrosshairSize);

// Update crosshair position on mousemove
document.addEventListener("mousemove", (e) => {
  updateCrosshairPosition(e.clientX, e.clientY);
});


// Function to save the canvas drawing to local storage
function saveDrawing() {
    const drawingData = canvas.toDataURL(); // Get the data URL of the canvas
    localStorage.setItem("savedDrawing", drawingData); // Save the data URL to local storage
  }
  
  // Function to load the saved drawing from local storage
  function loadDrawing() {
    const savedDrawing = localStorage.getItem("savedDrawing"); // Get the saved data URL from local storage
    if (savedDrawing) {
      const image = new Image();
      image.onload = function () {
        context.clearRect(0, 0, canvas.width, canvas.height); // Clear the canvas
        context.drawImage(image, 0, 0); // Draw the saved image on the canvas
      };
      image.src = savedDrawing;
    }
  }
  
  // Event listener to save the drawing when the window is unloaded
  window.addEventListener("beforeunload", saveDrawing);
  
  // Load the saved drawing on page load
  loadDrawing();