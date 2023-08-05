import express from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { dataSource } from "../orm/config/ormconfig";
import { User } from "~/orm/entities/user/User";
import { jwt_secret_key } from "~/orm/config/auth";
import { plainToInstance } from "class-transformer";
import { validationResult } from "express-validator";

const userRepo = dataSource.getRepository(User);

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password }: { email: string; password: string } = req.body;

    const user = await userRepo.findOneOrFail({ where: { email: email } });
    if (!(await bcrypt.compare(password, user.password))) {
      console.log("comparison fail");
      throw new Error();
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      jwt_secret_key ? jwt_secret_key : "",
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return res.json({ user: { email: user.email, id: user.id }, token });
  } catch (error) {
    console.log(error);
    return res.status(401).send("Email or password is incorrect");
  }
};

export const logout = async (req: express.Request, res: express.Response) => {};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).send({ errors: errors.array() });
    }
    const { name, email, password } = req.body;
    const userExists = await userRepo.findOne({ where: { email } });
    if (userExists) throw new Error("Email already exists");

    let user = {
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
