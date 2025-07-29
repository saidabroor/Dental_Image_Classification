// Mock AI analysis function - replace with actual AI model integration
export const analyzeToothImage = async (
  file: File
): Promise<{
  result: "healthy" | "caries";
  confidence: number;
}> => {
  // Simulate API call delay
  await new Promise((resolve) =>
    setTimeout(resolve, 2000 + Math.random() * 2000)
  );

  // Mock analysis - in real implementation, this would call your AI model
  const mockResults = [
    { result: "healthy" as const, confidence: 0.92 },
    { result: "healthy" as const, confidence: 0.87 },
    { result: "caries" as const, confidence: 0.89 },
    { result: "healthy" as const, confidence: 0.94 },
    { result: "caries" as const, confidence: 0.76 },
  ];

  // Return random result for demo purposes
  return mockResults[Math.floor(Math.random() * mockResults.length)];
};
