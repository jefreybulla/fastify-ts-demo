"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fastify_1 = __importDefault(require("fastify"));
const server = (0, fastify_1.default)();
server.get('/ping', async (request, reply) => {
    return 'pong\n';
});
server.get('/auth', {
    preValidation: (request, reply, done) => {
        const { username, password } = request.query;
        done(username !== 'admin' ? new Error('Must be admin') : undefined);
    }
}, async (request, reply) => {
    const customerHeader = request.headers['h-Custom'];
    const { username, password } = request.query;
    console.log(`username: ${username} - pass: ${password}`);
    // types allows the following
    reply.code(200).send({ success: true, message: 'logged in!' });
    // but this gives a type error on the following
    //reply.code(200).send('uh-oh');
    // it even works for wildcards
    //reply.code(404).send({ error: 'Not found' })
});
server.get('/users/:userId', async (request, reply) => {
    const userId = request.params.userId;
    console.log(`you are requesting userId: ${userId}`);
    reply.code(200).send({ success: true, message: `requested userID: ${userId}`, test: '123' });
});
server.listen({ port: 8080 }, (err, address) => {
    if (err) {
        console.log(err);
        process.exit(1);
    }
    console.log(`Server listening at ${address}`);
});
