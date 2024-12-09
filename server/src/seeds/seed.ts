import db from "../config/connection.js";
import Question from "../models/Question.js";
import cleanDB from "./cleanDb.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// Resolve the current directory in ESModule
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read from the source directory
const questionsPath = path.resolve(__dirname, "../../src/seeds/pythonQuestions.json");

db.once("open", async () => {
  try {
    await cleanDB("Question", "questions");

    // Load JSON data manually
    const pythonQuestions = JSON.parse(fs.readFileSync(questionsPath, "utf-8"));

    await Question.insertMany(pythonQuestions);

    console.log("Questions seeded successfully!");
  } catch (error) {
    if (error instanceof Error) {
      console.error("Error seeding questions:", error.message);
    } else {
      console.error("Error seeding questions:", error);
    }
    process.exit(1);
  } finally {
    process.exit(0);
  }
});



