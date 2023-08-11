import sessionRepository from "@/repositories/session-repository";
import userRepository from "@/repositories/user-repository";
import { exclude } from "@/utils/prisma-utils";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { invalidCredentialsError } from "./errors";
import axios from "axios";
import parseQueryString from "@/utils/parseQueryString";
import crypto, { verify } from "crypto";
import userService from "../users-service"; 

async function signIn(params: SignInParams): Promise<SignInResult> {
  const { email, password } = params;

  const user = await getUserOrFail(email);
  await validatePasswordOrFail(password, user.password);

  const token = await createSession(user.id);
  return {
    user: exclude(user, "password"),
    token
  };
}

async function signInWithGitHub(code: string) {
  const  GITHUB_ACESS_TOKEN_URL = "https://github.com/login/oauth/access_token";
  const { REDIRECT_URL, CLIENT_ID, CLIENT_SECRET } = process.env;
  console.log("code", code);
  const body = {
    code,
    grant_type: "authorization_code",
    redirect_uri: REDIRECT_URL,
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
  };
  try {
    const response = await axios.post(GITHUB_ACESS_TOKEN_URL, body, {
      headers: {
        "Content-type": "application/json"
      }
    });
    console.log("RESPONSE DA SIGNINWITHGIT", response);
    const { access_token } = parseQueryString(response.data);
    if(access_token) {
      const result = await fetchUser(access_token);
      return result;
    }
  }catch (error) {
    return error.message;
  }
}

async function fetchUser(token: string) {
  let createdUser = null;
  try {
    const response = await axios.get("http://api.github.com/user", {
      headers: {
        Authorization: `Bearer ${token}`
      } 
    });
    console.log("response na fetchUser", response);
    const user_password = generateStrongPassword();
    const userAlreadyRegistered = await userRepository.findByEmail(response.data.email);

    if (userAlreadyRegistered) {
      const token = await createSession(userAlreadyRegistered.id);

      const userObjct = {
        user: {
          id: userAlreadyRegistered.id,
          email: userAlreadyRegistered.email
        },
        token: token
      };
      console.log("SESSÃO CRIADA!", userObjct);
      return userObjct;
    }
    else {
      createdUser = await userService.createUser({ email: response.data.email, password: user_password });
    }
    if (createdUser) {
      const logged_user = await signIn({ email: createdUser.email, password: user_password });
      return logged_user;
    }
  } catch (error) {
    return error;
  }
}

function generateStrongPassword(length = 12) {
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789";
  const randomBytes = crypto.randomBytes(length);
    
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = randomBytes[i] % characters.length;
    password += characters.charAt(randomIndex);
  }

  return password;
}

async function getUserOrFail(email: string): Promise<GetUserOrFailResult> {
  const user = await userRepository.findByEmail(email, { id: true, email: true, password: true });
  if (!user) throw invalidCredentialsError();

  return user;
}

async function createSession(userId: number) {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET);
  await sessionRepository.create({
    token,
    userId,
  });

  return token;
}

async function validatePasswordOrFail(password: string, userPassword: string) {
  const isPasswordValid = await bcrypt.compare(password, userPassword);
  if (!isPasswordValid) throw invalidCredentialsError();
}

export type SignInParams = Pick<User, "email" | "password">;

type SignInResult = {
  user: Pick<User, "id" | "email">;
  token: string;
};

type GetUserOrFailResult = Pick<User, "id" | "email" | "password">;

const authenticationService = {
  signIn,
  signInWithGitHub,
  fetchUser,
};

export default authenticationService;
export * from "./errors";
