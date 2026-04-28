import * as pdfjsLib from "pdfjs-dist";

// 👇 import worker correctly for Vite
import pdfWorker from "pdfjs-dist/build/pdf.worker?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = pdfWorker;

export const extractTextFromPDF = async (file) => {
  try {
    const arrayBuffer = await file.arrayBuffer();

    const pdf = await pdfjsLib.getDocument({
      data: arrayBuffer,
    }).promise;

    let text = "";

    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();

      const pageText = content.items.map((item) => item.str).join(" ");
      text += pageText + "\n";
    }

    return text;
  } catch (error) {
    console.error("Error extracting PDF:", error);
    return "";
  }
};