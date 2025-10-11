import { envVars } from "./infrastructure/config";
import { AppRoutes as ExpressRoutes } from "./infrastructure/web/express/routes";
import { ExpressServer } from "./infrastructure/web/express/server";
import { AppRoutes as FastifyRoutes } from "./infrastructure/web/fastify/routes";
import { FastifyServer } from "./infrastructure/web/fastify/server";

function main() {
  // const server = new ExpressServer({
  //   port: envVars.PORT,
  //   public_path: envVars.PUBLIC_PATH,
  //   routes: ExpressRoutes.routes,
  // });

  const server = new FastifyServer({
    port: envVars.PORT,
    public_path: envVars.PUBLIC_PATH,
    routes: FastifyRoutes.register,
  });

  server.start();
}

main();
