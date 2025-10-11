import "dotenv/config";
import { get } from "env-var";

export const envVars = {
  PORT: get("PORT").required().asPortNumber(),
  PUBLIC_PATH: get("PUBLIC_PATH").default("public").asString(),
};
