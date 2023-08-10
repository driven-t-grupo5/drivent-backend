import { Request } from "express";

export type AuthenticatedRequest = Request & JWTPayload;

export type JWTPayload = {
  userId: number;
};

export type ApplicationError = {
  name: string;
  message: string;
};

export type ViaCEPAddress = {
  logradouro: string,
  complemento: string,
  bairro: string,
  localidade: string,
  uf: string,

};

//Regra de Negócio
export type AddressEnrollment = {
  logradouro: string,
  complemento: string,
  bairro: string,
  cidade: string,
  uf: string,
  error?: string

}

export type RequestError = {
  status: number,
  data: object | null,
  statusText: string,
  name: string,
  message: string,
};

export type GetActivitiesByDateParams = {
  year: string,
  month: string,
  day: string,
};

export interface GetActivitiesByDateRequest extends AuthenticatedRequest {
  params: GetActivitiesByDateParams
}

export type EnrollUserToActivityParams = {
  activityId: string,
};

export interface EnrollUserToActivityRequest extends AuthenticatedRequest {
  params: EnrollUserToActivityParams
}
