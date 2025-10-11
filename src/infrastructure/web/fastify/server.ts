import Fastify, {
  FastifyInstance,
  FastifyReply,
  FastifyRequest,
} from "fastify";
import { IServer } from "../../../application/interfaces";
import { AppRoutes } from "./routes";
import path from "path";
import fastifyStatic from "@fastify/static";

interface FastifyOptions {
  port: number;
  public_path?: string;
  routes: (fastify: FastifyInstance) => void | Promise<void>;
}

export class FastifyServer implements IServer {
  private app: FastifyInstance;
  private readonly port: number;
  private readonly publicPath: string;
  private readonly routes: (fastify: FastifyInstance) => void | Promise<void>;

  constructor(options: FastifyOptions) {
    const { port, public_path = "public", routes } = options;
    this.port = port;
    this.publicPath = public_path;
    this.routes = routes;
    this.app = Fastify({
      logger: {
        transport: {
          target: "pino-pretty",
          options: {
            colorize: true,
            translateTime: "HH:MM:ss",
            ignore: "pid,hostname",
          },
        },
      },
    });
  }

  async start() {
    //* Middlewares
    await this.app.register(fastifyStatic, {
      root: path.join(__dirname, `../../../../${this.publicPath}`),
      prefix: "/",
    });

    //* Routes
    this.app.register(AppRoutes.register, {
      prefix: "/api",
    });

    //* SPA fallback
    this.app.setNotFoundHandler((req: FastifyRequest, reply: FastifyReply) => {
      const indexPath = path.join(
        __dirname,
        `../../../${this.publicPath}/index.html`
      );
      reply.type("text/html").sendFile(indexPath);
    });

    //* Start server
    await this.app.listen({ port: this.port });
    this.app.log.info(`Server running on port ${this.port}`);
  }
}
