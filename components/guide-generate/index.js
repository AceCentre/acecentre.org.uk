// Placeholder components - replace with real implementation from launchpad app when ready

export const GuidePage = ({
  resource,
  guideTemplate,
  // attachedResources, // Will be used when connecting to launchpad app
  // relatedResources, // Will be used when connecting to launchpad app
}) => {
  return (
    <div style={{ padding: "2rem", maxWidth: "800px", margin: "0 auto" }}>
      <h1>{resource?.name || "Activity Book"}</h1>
      <p>{resource?.description || "Activity book content coming soon..."}</p>

      {guideTemplate && (
        <div>
          <h2>{guideTemplate.title}</h2>
          {guideTemplate.sections?.map((section, index) => (
            <div key={index} style={{ marginBottom: "2rem" }}>
              {section.heading && <h3>{section.heading}</h3>}
              <p>{section.body}</p>
              {section.image && (
                <img
                  src={section.image}
                  alt={section.heading || "Activity book image"}
                  style={{ maxWidth: "100%", height: "auto" }}
                />
              )}
            </div>
          ))}
        </div>
      )}

      <div
        style={{
          marginTop: "3rem",
          padding: "1rem",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <p>
          <strong>Note:</strong> This activity book functionality is under
          development. The full interactive features will be available soon.
        </p>
      </div>
    </div>
  );
};

export const GuideGenerate = () => {
  return (
    <div style={{ padding: "2rem", textAlign: "center" }}>
      <h2>Activity Book Generator</h2>
      <p>Custom activity book generation coming soon...</p>
      <p>
        This will connect to the launchpad application for full functionality.
      </p>
    </div>
  );
};
