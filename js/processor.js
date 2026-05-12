function processAssets(rows, config) {
  const map = new Map();

  rows.forEach(r => {
    const productId = r[config.productId];
    const url = r[config.url];

    if (!productId || !url) return;

    const width = parseInt(r[config.width] || 0);
    const height = parseInt(r[config.height] || 0);
    const title = (r[config.title] || "").toLowerCase();

    let type = "alternate";
    if (title.includes("hero")) type = "hero";
    else if (title.includes("front")) type = "front";
    else if (title.includes("life")) type = "lifestyle";

    const key = productId + "|" + type;
    const pixels = width * height;

    if (!map.has(key) || map.get(key).pixels < pixels) {
      map.set(key, {
        product_id: productId,
        asset_url: url,
        width,
        height,
        asset_type: type,
        pixels
      });
    }
  });

  return Array.from(map.values()).map(a => {
    delete a.pixels;
    return a;
  });
}
