function loadFile(file, callback) {
  const ext = file.name.split(".").pop().toLowerCase();

  if (ext === "csv") {
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: res => callback(res.data, res.meta.fields)
    });
  }

  if (ext === "xlsx") {
    const reader = new FileReader();
    reader.onload = e => {
      const wb = XLSX.read(e.target.result, { type: "binary" });
      const sheet = wb.Sheets[wb.SheetNames[0]];
      const csv = XLSX.utils.sheet_to_csv(sheet);

      Papa.parse(csv, {
        header: true,
        skipEmptyLines: true,
        complete: res => callback(res.data, res.meta.fields)
      });
    };
    reader.readAsBinaryString(file);
  }
}
``
