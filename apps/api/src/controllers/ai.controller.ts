import { Request, Response } from "express";
import { getCareerAdvice } from "../ai/usecases/careerAdvice.usecase";

export const askCareer = async (req: Request, res: Response) => {
  try {
    const { prompt } = req.body;

    const result = await getCareerAdvice(prompt);

    res.json({
      success: true,
      data: result,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "AI error",
    });
  }
};