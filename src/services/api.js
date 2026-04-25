export const generateCoverLetter = async (jobDescription) => {
  const response = await fetch("https://meghadev.app.n8n.cloud/webhook/9ac1e28e-1182-43d3-a8b8-880ab37d41a7", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      job_description: jobDescription
    })
  });

  return response.json();
};