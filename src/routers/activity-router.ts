/*
import { Router } from "express";
import { authenticateToken } from "@/middlewares";
import { getActivity, getActivityByDate, getDates, getVenues, createActivity} from "../controllers/activity-controller";

const activityRouter = Router();

activityRouter
  .get("", authenticateToken, getActivity)   // Rota para obter detalhes de uma atividade para um usuário autenticado
  .get("/:year-:month-:day", authenticateToken, getActivityByDate)   // Rota para obter detalhes de uma atividade com base na data para um usuário autenticado
  .get("/dates", authenticateToken, getDates)  // Rota para obter datas disponíveis para atividades para um usuário autenticado
  .get("/venues", authenticateToken, getVenues);   // Rota para obter locais disponíveis para atividades para um usuário autenticado

  //Posts
  
  // .post("", authenticateToken, createActivity);

export { activityRouter };
*/

