export default async function handler(req, res) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    // Forward the request to the backend server
    const backendResponse = await fetch(
      "http://localhost:4000/api/activity-book/gears",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!backendResponse.ok) {
      const errorData = await backendResponse.json();
      console.error("Backend error:", errorData);
      return res.status(backendResponse.status).json(errorData);
    }

    const data = await backendResponse.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching gears:", error);
    res.status(500).json({
      error: "Failed to fetch gears",
      details: error.message,
    });
  }
}
