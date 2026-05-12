let rows = [];

const fileInput = document.getElementById("fileInput");
const productIdSection = document.getElementById("productIdSection");
const productIdColumn = document.getElementById("productIdColumn");
const processBtn = document.getElementById("processBtn");
const statusText = document.getElementById("statusText");

fileInput.addEventListener("change", e => {
  statusText.textContent = "Loading file...";
  loadFile(e.target.files[0], (data, columns) => {
    rows = data;
    populateProductId(columns);
    productIdSection.classList.remove("hidden");
    statusText.textContent = "File loaded. Select product identifier.";
  });
});

function populateProductId(columns) {
  productIdColumn.innerHTML = "<option value=''>-- Select --</option>";
  columns.forEach(c => {
    const o = document.createElement("option");
    o.value = c;
    o.textContent = c;
    productIdColumn.appendChild(o);
  });
}

processBtn.addEventListener("click", async () => {
  const productIdCol = productIdColumn.value;
  if (!productIdCol) return;

  statusText.textContent = "Detecting assets and resolutions...";
  const assets = await extractAssets(rows, productIdCol);
  exportCSV(assets);
  statusText.textContent = "CSV generated and downloaded.";
});
