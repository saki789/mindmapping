const canvas = document.getElementById("canvas");
const svgns = "http://www.w3.org/2000/svg";

let isDrawing = false;
let startX = 0;
let startY = 0;
let nodes = [];

canvas.addEventListener("mousedown", startDrawing);
canvas.addEventListener("mousemove", draw);
canvas.addEventListener("mouseup", stopDrawing);
canvas.addEventListener("mouseout", stopDrawing);

function startDrawing(e) {
  isDrawing = true;
  startX = e.offsetX;
  startY = e.offsetY;
}

function draw(e) {
  if (!isDrawing) return;
  const line = document.createElementNS(svgns, "line");
  line.setAttribute("x1", startX);
  line.setAttribute("y1", startY);
  line.setAttribute("x2", e.offsetX);
  line.setAttribute("y2", e.offsetY);
  line.setAttribute("stroke", "#000");
  canvas.appendChild(line);
}

function stopDrawing() {
  isDrawing = false;
}

function addNode() {
  const node = document.createElementNS(svgns, "circle");
  const centerX = Math.random() * canvas.clientWidth;
  const centerY = Math.random() * canvas.clientHeight;
  node.setAttribute("cx", centerX);
  node.setAttribute("cy", centerY);
  node.setAttribute("r", "30");
  node.setAttribute("fill", "#4caf50");
  node.addEventListener("click", () => {
    const connections = document.querySelectorAll("line");
    for (const connection of connections) {
      if (
        connection.getAttribute("x1") === centerX.toString() &&
        connection.getAttribute("y1") === centerY.toString()
      ) {
        canvas.removeChild(connection);
      }
    }
    canvas.removeChild(node);
  });
  canvas.appendChild(node);
}
