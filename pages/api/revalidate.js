// API route for manual revalidation
// Usage: POST /api/revalidate?secret=YOUR_SECRET&path=/resources/all

export default async function handler(req, res) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATE_SECRET) {
    return res.status(401).json({ message: "Invalid token" });
  }

  try {
    const path = req.query.path || "/";

    // Revalidate the specific path
    await res.revalidate(path);

    return res.json({
      revalidated: true,
      path: path,
      timestamp: new Date().toISOString(),
    });
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).json({
      message: "Error revalidating",
      error: err.message,
    });
  }
}
