import authenticationService, { SignInParams } from "@/services/authentication-service";
import userService from "@/services/users-service";
import { Request, Response } from "express";
import httpStatus from "http-status";

export async function singInPost(req: Request, res: Response) {
  const { email, password } = req.body as SignInParams;

  try {
    const result = await authenticationService.signIn({ email, password });

    return res.status(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});
  }
}

export async function signInGitHub(req: Request, res: Response) {
  const { code } = req.query;
  if(!code)
    return res.status(httpStatus.BAD_REQUEST).send({ error: "no git code" });
  try {
    const { access_token } =  await authenticationService.getToken(code as string);
    console.log("acces token", access_token);
    const gitUser = await authenticationService.fetchUser(access_token as string);
    const userData = await userService.fetchUserByemail(gitUser.html_url);
    console.log ("USER DATA",  userData);
    if (!userData || userData === null) {
      await userService.createUser({ email: gitUser.html_url, password: gitUser.id.toString() } );
       
      const result = await authenticationService.signIn({ email: gitUser.html_url, password: gitUser.id.toString() });
      console.log(result);
      return res.sendStatus(httpStatus.OK).send(result);
    }

    const result = await authenticationService.signIn({ email: gitUser.html_url, password: gitUser.id.toString() });
    console.log("result dentro do signinwithGit", result);
    return res.sendStatus(httpStatus.OK).send(result);
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).send({});  
  }
}
