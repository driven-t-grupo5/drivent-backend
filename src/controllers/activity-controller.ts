import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";
import activityService from "@/services/activity-service";

// Obtém detalhes de uma atividade para um usuário autenticado
export async function getActivity(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const activity = await activityService.getActivity(userId);
    return res.status(httpStatus.OK).send(activity);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

// Obtém detalhes de uma atividade com base na data para um usuário autenticado
export async function getActivityByDate(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const date = req.query.date as string;
  try {
    const activity = await activityService.getActivity(userId, new Date(date));
    return res.send(activity);
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

// Obtém datas disponíveis para atividades para um usuário autenticado
export async function getDates(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const days = await activityService.getDates(userId);
    return res.status(httpStatus.OK).send(days);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

// Obtém locais disponíveis para atividades para um usuário autenticado
export async function getVenues(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const locations = await activityService.getVenues(userId);
    return res.status(httpStatus.OK).send(locations);
  } catch (error) {
    return res.sendStatus(httpStatus.INTERNAL_SERVER_ERROR);
  }
}

//Posts
// export async function createActivity(req: AuthenticatedRequest, res: Response) {
// };
