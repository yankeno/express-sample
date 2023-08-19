import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataSource } from "../orm/config/ormconfig";
import { User } from "~/orm/entities/user/User";
import { jwt_secret_key, jwt_refresh_key } from "~/orm/config/auth";
import { expiresInAccessToken, expiresInRefreshToken } from "~/constants/auth";
import { plainToInstance } from "class-transformer";
import { validationResult } from "express-validator";

const userRepo = dataSource.getRepository(User);

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;
    console.log(jwt_secret_key, jwt_refresh_key);
    const user = await userRepo.findOneOrFail({ where: { email: email } });
    if (!(await bcrypt.compare(password, user.password))) {
      throw new Error();
    }

    const accessToken = jwt.sign(
      { id: user.id, email: user.email },
      jwt_secret_key ? jwt_secret_key : "",
      {
        expiresIn: expiresInAccessToken,
      }
    );
    const refreshToken = jwt.sign(
      { id: user.id, email: user.email },
      jwt_refresh_key ? jwt_refresh_key : "",
      {
        expiresIn: expiresInAccessToken,
      }
    );
    return res.json({
      user: { email: user.email, id: user.id },
      accessToken,
      refreshToken,
    });
  } catch (error) {
    console.log(error);
    return res.status(401).send("Email or password is incorrect");
  }
};

export const refresh = async (req: express.Request, res: express.Response) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(400).send("No token provided");

  let decoded: any;
  try {
    decoded = jwt.verify(refreshToken, jwt_secret_key ? jwt_secret_key : "");
  } catch (error) {
    return res.status(401).send("Invalid token");
  }

  const token = jwt.sign(
    { id: decoded.id },
    jwt_secret_key ? jwt_secret_key : "",
    { expiresIn: expiresInRefreshToken }
  );
  return res.status(200).send({ accessToken: token });
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const userExists = await userRepo.findOne({ where: { email } });
    if (userExists) throw new Error("Account already exists");

    const user = {
      name,
      email,
      password,
    };
    const results = await userRepo.save(plainToInstance(User, user));
    return res.status(201).send(results);
  } catch (error: any) {
    console.log(error);
    return res.status(409).send({ message: error.message });
  }
};

export const user = async (req: express.Request, res: express.Response) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("bearer ")) {
    return res.status(401).send("Unauthorized");
  }

  const token = authHeader.split(" ")[1];
  try {
    const decoded: any = jwt.verify(
      token,
      jwt_secret_key ? jwt_secret_key : ""
    );
    const user = await userRepo.findOneOrFail({ where: { id: decoded.id } });
    console.log(user);
    return res.json({ user: { email: user.email, id: user.id } });
  } catch (error) {
    return res.status(401).send("Invalid token or user not found");
  }
};
