import { FastifyInstance } from "fastify";
import { TodoRoutes } from "./todo.routes";

export class AppRoutes {
  static async register(fastify: FastifyInstance) {
    fastify.register(
      async (instance) => {
        TodoRoutes.register(instance);
      },
      { prefix: "/todos" }
    );
  }
}
