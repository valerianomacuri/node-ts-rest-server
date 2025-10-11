import { envVars } from "./infrastructure/config";
import { AppRoutes } from "./infrastructure/web/express/routes";
import { todoRoutes } from "./infrastructure/web/express/routes/todo.routes";
import { Server } from "./infrastructure/web/server";

function main() {
  const server = new Server({
    port: envVars.PORT,
    public_path: envVars.PUBLIC_PATH,
    routes: AppRoutes.routes,
  });

  server.start();
}

main();
