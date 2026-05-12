# Product Asset Extractor

A generic, browser-based utility to normalize product images and documents from
CSV or Excel files into a clean, deterministic CSV format suitable for MDM,
PIM, or catalog ingestion.

This tool is **schema-agnostic** and works with product data from any vendor
by allowing users to map input columns at runtime.

---

## ✨ Key Features

- ✅ Accepts **CSV (.csv)** and **Excel (.xlsx)** input
- ✅ Outputs **CSV only**
- ✅ No backend or server required
- ✅ Runs entirely in the browser
- ✅ Vendor-agnostic (no hardcoded schemas)
- ✅ User-driven column mapping
- ✅ Deduplication using highest-resolution logic
- ✅ GitHub Pages deployable

---

## 🧠 How It Works

1. User uploads a CSV or Excel file
2. Tool reads the file in the browser
3. User maps:
   - Product identifier column
   - Asset URL column
   - Width and height columns
   - Optional asset title/name column
4. Tool processes assets:
   - Groups by product and asset type
   - Keeps highest-resolution asset per type
   - Classifies assets (hero, front, lifestyle, alternate)
5. Tool exports a normalized CSV

---

## 📥 Input Requirements

The input file can have **any structure**, as long as it contains:

- A product identifier (SKU, item number, etc.)
- A URL pointing to an image or document
- Optional width and height columns
- Optional asset name or title column for classification

The column names **do not need to follow any predefined schema**.

---

## 📤 Output Format

The output CSV has the following structure:

```csv
product_id,asset_url,width,height,asset_type
