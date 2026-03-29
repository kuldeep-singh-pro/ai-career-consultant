import pdfParse from "pdf-parse";
import { BadRequest, InternalServerError } from "../errorHandler/httpError";

export const extractTextFromPdf = async (
  buffer: Buffer
): Promise<string> => {
  if (!buffer) {
    throw new BadRequest("PDF buffer missing");
  }

  const data = await pdfParse(buffer);

  if (!data?.text) {
    throw new InternalServerError("Unable to extract text from PDF");
  }

  return data.text;
};