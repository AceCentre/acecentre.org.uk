async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { download_file } = req.query;

  if (!download_file) {
    return res
      .status(400)
      .json({ message: "download_file parameter is required" });
  }

  try {
    // Use WooCommerce REST API with hardcoded credentials for now
    const config = require("../../lib/config");
    const baseUrl =
      config.baseUrl ||
      process.env.BACKEND_URL ||
      "https://backend.acecentre.org.uk";

    // Hardcoded credentials from your .env.local file
    const consumerKey = "ck_0d2fc394365e0ee6d9b79a5a569985381e878f5e";
    const consumerSecret = "cs_e6f08efbaf01c3e01c8b5de98e9a77d97ffa9a46";

    const productId = parseInt(download_file);
    if (Number.isNaN(productId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid download_file id" });
    }

    const wcResp = await fetch(
      `${baseUrl}/wp-json/wc/v3/products/${productId}`,
      {
        headers: {
          Authorization: `Basic ${Buffer.from(
            `${consumerKey}:${consumerSecret}`
          ).toString("base64")}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!wcResp.ok) {
      return res.status(wcResp.status).json({
        success: false,
        message: `WooCommerce REST error: ${wcResp.status}`,
      });
    }

    const wcProduct = await wcResp.json();

    // Validate downloadable and free (price 0) products only
    const priceNumber = parseFloat(
      wcProduct.price || wcProduct.regular_price || 0
    );
    const isFree = !Number.isNaN(priceNumber) && priceNumber === 0;
    const isDownloadable = !!wcProduct.downloadable;

    if (!isDownloadable) {
      return res
        .status(400)
        .json({ success: false, message: "Product is not downloadable" });
    }

    if (!isFree) {
      return res.status(403).json({
        success: false,
        message: "Downloads for paid products are not available here",
      });
    }

    const downloads = Array.isArray(wcProduct.downloads)
      ? wcProduct.downloads
      : [];
    if (downloads.length === 0 || !downloads[0].file) {
      return res.status(404).json({
        success: false,
        message: "No download files available for this product",
      });
    }

    const fileUrl = downloads[0].file;

    // Stream the file to force a download with the correct headers
    const fileResponse = await fetch(fileUrl);

    if (!fileResponse.ok) {
      return res.status(500).json({
        success: false,
        message: "Failed to fetch file from WordPress",
      });
    }

    const arrayBuffer = await fileResponse.arrayBuffer();

    // Infer filename and content type
    const urlParts = fileUrl.split("?")[0].split("/");
    const rawName = urlParts[urlParts.length - 1] || "download";
    const ext = rawName.includes(".")
      ? rawName.split(".").pop().toLowerCase()
      : "bin";

    const contentTypes = {
      pdf: "application/pdf",
      zip: "application/zip",
      mp4: "video/mp4",
      mp3: "audio/mpeg",
      doc: "application/msword",
      docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      png: "image/png",
      jpg: "image/jpeg",
      jpeg: "image/jpeg",
    };

    const contentType = contentTypes[ext] || "application/octet-stream";

    res.setHeader("Content-Type", contentType);
    res.setHeader("Content-Disposition", `attachment; filename="${rawName}"`);
    res.setHeader("Content-Length", arrayBuffer.byteLength);
    res.send(Buffer.from(arrayBuffer));
  } catch (error) {
    console.error("Error handling download:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
}

export default handler;
