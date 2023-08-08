import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivity, createActivity } from "../controllers/activity-controller";

const activityRouter = Router();

activityRouter
  .get("", authenticateToken, getActivity)
  .post("", authenticateToken, createActivity);

export { activityRouter };
