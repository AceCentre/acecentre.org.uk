export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const { templateIds, userName } = req.body;

    console.log("Bulk download request:", { templateIds, userName });

    // Forward the request to the backend server
    const backendResponse = await fetch(
      "http://localhost:4000/api/activity-book/bulk-download",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          templateIds,
          userName: userName || "User",
        }),
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error("Backend error:", errorData);
      return res.status(backendResponse.status).json(errorData);
    }

    const data = await backendResponse.json();
    console.log("Backend response:", data);

    res.status(200).json(data);
  } catch (error) {
    console.error("Error in bulk download API:", error);
    res.status(500).json({
      error: "Failed to create bulk download",
      details: error.message,
    });
  }
}
