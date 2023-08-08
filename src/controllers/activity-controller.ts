import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activityService from "@/services/activity-service";

export async function getActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const activity = await activityService.getActivity(userId);
    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

export async function createActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const { roomId } = req.body;
  if (!roomId) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
  try {
    await activityService.createActivity(userId, Number(roomId));

    return res.sendStatus(httpStatus.OK);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}
