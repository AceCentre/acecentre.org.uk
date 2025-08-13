export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  const { templateId } = req.body;

  if (!templateId) {
    return res.status(400).json({ message: "templateId is required" });
  }

  try {
    // Call the backend GraphQL mutation to generate the guide PDF
    const response = await fetch("http://localhost:4000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: `
          mutation GenerateGuide($templateId: String!) {
            generateGuide(templateId: $templateId) {
              success
              message
              fileLocation
            }
          }
        `,
        variables: {
          templateId: templateId,
        },
      }),
    });

    const result = await response.json();

    if (result.errors) {
      console.error("GraphQL errors:", result.errors);
      return res.status(500).json({
        success: false,
        message: "Failed to generate PDF",
        error: result.errors[0].message,
      });
    }

    const { success, message, fileLocation } = result.data.generateGuide;

    if (success && fileLocation) {
      // Fetch the PDF from the backend
      const pdfRes = await fetch(fileLocation);
      if (!pdfRes.ok) {
        return res.status(500).json({
          success: false,
          message: "Failed to fetch PDF from backend",
        });
      }
      const pdfBuffer = await pdfRes.arrayBuffer();
      res.setHeader("Content-Type", "application/pdf");
      res.setHeader(
        "Content-Disposition",
        `attachment; filename=${templateId}.pdf`
      );
      res.send(Buffer.from(pdfBuffer));
      return;
    } else {
      res.status(500).json({
        success: false,
        message: message || "Failed to generate PDF",
      });
    }
  } catch (error) {
    console.error("Error generating guide PDF:", error);
    res.status(500).json({
      success: false,
      message: "Failed to generate guide PDF",
      error: error.message,
    });
  }
}
