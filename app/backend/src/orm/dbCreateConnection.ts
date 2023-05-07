import { dataSource } from "./config/ormconfig";

export const connectMysql = () => {
  console.log(dataSource);
  dataSource
    .initialize()
    .then(() =>
      console.log(`Successfully connected to database ${process.env.DB}`)
    )
    .catch((error) => console.log(error));
};
