import pdfParse from "pdf-parse";

export const extractTextFromPdf = async (
  buffer: Buffer
): Promise<string> => {
  if (!buffer) {
    throw new Error("PDF buffer missing");
  }

  const data = await pdfParse(buffer);

  if (!data?.text) {
    throw new Error("Unable to extract text from PDF");
  }

  return data.text;
};