import { prisma } from "@/config";

const activityRepository = {

  // Obtém detalhes de uma atividade
  async getActivity() {
    // Exemplo de formato de retorno:
    // {
    //   "id": 1,
    //   "name": "Palestra X",
    //   "venue": "Auditório Lateral",
    //   "availableTickets": 27,
    //   "date": "2023-10-22T09:00:00.000Z"
    //   "startTime": "09:00",
    //   "endTime": "10:00"
    // }
  },

  // Obtém detalhes de uma atividade com base na data
  async getActivityByDate() {
    // Exemplo de formato de retorno:
    // {
    //   "id": 1,
    //   "name": "Palestra X",
    //   "venue": "Auditório Lateral",
    //   "availableTickets": 27,
    //   "date": "2023-10-22T09:00:00.000Z"
    //   "startTime": "09:00",
    //   "endTime": "10:00"
    // }
  },

  // Obtém datas disponíveis para atividades
  async getDates() {
    // Exemplo de formato de retorno:
    // {
    //   "dates": [
    //     "2023-10-22",
    //     "2023-10-23",
    //     "2023-10-24"
    //   ]
    // }
  },

  // Obtém locais disponíveis para atividades
  async getVenues() {
    // Exemplo de formato de retorno:
    // {
    //   "venues": [
    //     "Auditório Principal",
    //     "Auditório Lateral",
    //     "Sala de Workshop"
    //   ]
    // }
  },

  //Posts
  // As funções de criação de atividades estão comentadas por enquanto
  // async createActivity(hotelId: number) {
  // };

};

export default activityRepository;
