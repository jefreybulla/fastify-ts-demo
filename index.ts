import fastify from "fastify"

const server = fastify()

server.get('/ping', async(request, reply) => {
    return 'pong\n'
})

server.get<{
    Querystring: IQuerystring,
    Headers: IHeaders,
    Reply: IReply
  }>('/auth', {
    preValidation: (request, reply, done) => {
      const { username, password } = request.query
      done(username !== 'admin' ? new Error('Must be admin') : undefined) 
    }},
    async (request, reply) => {
    const customerHeader = request.headers['h-Custom']

    const { username, password } = request.query
    console.log(`username: ${username} - pass: ${password}`)

    // types allows the following
    reply.code(200).send({ success: true, message: 'logged in!'})
    // but this gives a type error on the following
    //reply.code(200).send('uh-oh');
    // it even works for wildcards
    //reply.code(404).send({ error: 'Not found' })
  })

server.listen({ port: 8080}, (err, address) => {
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})





interface IBody {
}

interface IQuerystring {
    username: string
    password: string
}

interface IParams {
    userId: string
}


interface IHeaders {
'h-Custom': string;
}

interface IReply {
200: { success: boolean, message?: string };
302: { url: string };
'4xx': { error: string };
}