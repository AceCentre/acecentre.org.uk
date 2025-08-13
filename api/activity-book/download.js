export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // For demo: always return the static sample PDF
    res.status(200).json({
      success: true,
      message: "Guide PDF generated successfully",
      downloadUrl: "/sample.pdf", // This file should exist in /public
      filename: "custom-guide.pdf",
    });
  } catch (error) {
    console.error("Error generating guide PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate guide PDF",
    });
  }
}
