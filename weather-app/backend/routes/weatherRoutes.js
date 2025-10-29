import express from "express";
import { getWeather } from "../controllers/weatherControllers.js";
const router = express.Router();

router.get("/:city", getWeather);

export default router;
