function loadImageWithTimeout(url, timeout = 3000) {
  return new Promise(resolve => {
    const img = new Image();
    const timer = setTimeout(() => resolve(null), timeout);

    img.onload = () => {
      clearTimeout(timer);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };

    img.onerror = () => {
      clearTimeout(timer);
      resolve(null);
    };

    img.src = url;
  });
}

async function extractAssets(rows, productIdColumn) {
  const map = new Map();
  const MAX_IMAGES = 300; // safety cap
  let imageCount = 0;

  for (const row of rows) {
    const productId = row[productIdColumn];
    if (!productId) continue;

    const seenUrls = new Set();

    for (const cell of Object.values(row)) {
      if (typeof cell !== "string" || !cell.includes("http")) continue;

      const urls = cell.split(/[|,]/).map(u => u.trim());

      for (const url of urls) {
        if (seenUrls.has(url)) continue;
        seenUrls.add(url);

        const lower = url.toLowerCase();

        let assetType;
        if (lower.match(/\.(jpg|jpeg|png|webp)$/)) assetType = "image";
        else if (lower.endsWith(".pdf")) assetType = "document";
        else continue;

        let imageRole = "";
        if (assetType === "image") {
          if (lower.includes("hero") || lower.includes("main")) imageRole = "hero";
          else if (lower.includes("front")) imageRole = "front";
          else if (lower.includes("rear") || lower.includes("back")) imageRole = "rear";
          else if (lower.includes("life") || lower.includes("inuse")) imageRole = "lifestyle";
          else imageRole = "alternate";
        }

        let width = "";
        let height = "";

        if (assetType === "image" && imageCount < MAX_IMAGES) {
          imageCount++;
          const size = await loadImageWithTimeout(url);
          if (size) {
            width = size.width;
            height = size.height;
          }
        }

        const key = `${productId}|${assetType}|${imageRole}`;
        const pixels = (width || 0) * (height || 0);

        if (!map.has(key) || map.get(key).pixels < pixels) {
          map.set(key, {
            product_id: productId,
            asset_url: url,
            asset_type: assetType,
            image_role: imageRole,
            width,
            height,
            pixels
          });
        }
      }
    }
  }

  return Array.from(map.values()).map(a => {
    delete a.pixels;
    return a;
  });
}
