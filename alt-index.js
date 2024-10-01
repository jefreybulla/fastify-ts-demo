"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const typebox_1 = require("@sinclair/typebox");
const server = (0, fastify_1.default)();
const User = typebox_1.Type.Object({
    name: typebox_1.Type.String(),
    // validate email format
    mail: typebox_1.Type.Optional(typebox_1.Type.String({ format: 'email' })),
});
/* interface IReply {
    200: { success: boolean, message?: string };
    302: { url: string };
    '4xx': { error: string };
} */
const Reply = typebox_1.Type.Object({
    success: typebox_1.Type.Boolean()
});
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});
server.post('/', {
    schema: {
        body: User,
        response: { 200: Reply }
    },
}, (request, reply) => {
    // The `name` and `mail` types are automatically inferred
    const { name, mail } = request.body;
    console.log(`name: ${name} mail: ${mail}`);
    reply.status(200).send({ success: true });
});
server.listen({ port: 3000 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
