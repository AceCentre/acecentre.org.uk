// Webhook endpoint for WordPress to trigger revalidation
// Configure this URL in WordPress: https://acecentre.org.uk/api/webhook

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Check for webhook secret
  if (req.headers["x-webhook-secret"] !== process.env.WEBHOOK_SECRET) {
    return res.status(401).json({ message: "Invalid webhook secret" });
  }

  try {
    const { post_type, post_status, post_id } = req.body;

    // Define which paths to revalidate based on post type
    const pathsToRevalidate = [];

    if (post_type === "product") {
      pathsToRevalidate.push("/resources/all");
      pathsToRevalidate.push(`/resources/${req.body.post_name}`);
    } else if (post_type === "post") {
      pathsToRevalidate.push("/");
      pathsToRevalidate.push("/blog");
      pathsToRevalidate.push(`/blog/${req.body.post_name}`);
    } else if (post_type === "page") {
      pathsToRevalidate.push(`/${req.body.post_name}`);
    }

    // Revalidate all relevant paths
    const revalidationResults = [];
    for (const path of pathsToRevalidate) {
      try {
        await res.revalidate(path);
        revalidationResults.push({ path, success: true });
      } catch (error) {
        revalidationResults.push({
          path,
          success: false,
          error: error.message,
        });
      }
    }

    return res.json({
      message: "Revalidation triggered",
      results: revalidationResults,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    console.error("Webhook error:", err);
    return res.status(500).json({
      message: "Error processing webhook",
      error: err.message,
    });
  }
}
