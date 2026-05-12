let rows = [];

const fileInput = document.getElementById("fileInput");
const mappingSection = document.getElementById("mappingSection");

fileInput.addEventListener("change", e => {
  loadFile(e.target.files[0], (data, columns) => {
    rows = data;
    populateSelectors(columns);
    mappingSection.classList.remove("hidden");
  });
});

function populateSelectors(columns) {
  ["productIdColumn", "urlColumn", "widthColumn", "heightColumn", "titleColumn"]
    .forEach(id => {
      const select = document.getElementById(id);
      select.innerHTML = "<option value=''>-- Select --</option>";
      columns.forEach(c => {
        const o = document.createElement("option");
        o.value = c;
        o.textContent = c;
        select.appendChild(o);
      });
    });
}

document.getElementById("processBtn").addEventListener("click", () => {
  const config = {
    productId: productIdColumn.value,
    url: urlColumn.value,
    width: widthColumn.value,
    height: heightColumn.value,
    title: titleColumn.value
  };

  const output = processAssets(rows, config);
  exportCSV(output);
});
