import { Example } from "../orm/entities/example/Example";
import { dataSource } from "../orm/config/ormconfig";
import express from "express";

const repo = dataSource.getRepository(Example);

export const findAll = async (req: express.Request, res: express.Response) => {
  const examples = await repo.find();
  return res.send({
    message: "find all",
    data: examples,
  });
};

export const findById = async (req: express.Request, res: express.Response) => {
  try {
    const example = await repo.findOneOrFail({
      where: {
        id: Number(req.params.id),
      },
    });
    return res.send({
      message: "find by id",
      data: example,
    });
  } catch {
    return res.status(404).send({
      message: "not found",
      data: null,
    });
  }
};

export const store = async (req: express.Request, res: express.Response) => {
  const hoge = await repo.create({
    description: req.body.description,
  });
  await repo.save(hoge);
  return res.send({
    message: "successfully created record",
    data: hoge,
  });
};

export const edit = async (req: express.Request, res: express.Response) => {
  await repo.update(
    { id: Number(req.params.id) },
    { description: req.body.description }
  );
  return res.send({
    message: "successfully updated record",
    data: null,
  });
};

export const destroy = async (req: express.Request, res: express.Response) => {
  await repo.softDelete(req.params.id);
  return res.send({
    message: "successfully deleted record",
    data: null,
  });
};

export const count = async (req: express.Request, res: express.Response) => {
  const count = await repo.count({});
  return res.send({
    message: "number of examples records",
    data: count,
  });
};
