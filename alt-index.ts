import fastify from "fastify"
import { Static, Type } from '@sinclair/typebox'

const server = fastify()


const User = Type.Object({
    name: Type.String(),
    // validate email format
    mail: Type.Optional(Type.String({ format: 'email' })),
})
type UserType = Static<typeof User>

const Reply = Type.Object({
    success: Type.Boolean()
})

type ReplyType = Static<typeof Reply>

server.get('/ping', async(request, reply) => {
    return 'pong\n'
})


server.post<{ Body: UserType, Reply: ReplyType}>(
    '/',
    {
      schema: {
        body: User,
        response: {200: Reply}
      },
    },
    (request, reply) => {
      // The `name` and `mail` types are automatically inferred
      const { name, mail } = request.body;
      console.log(`name: ${name} mail: ${mail}`)
      reply.status(200).send({ success: true });
    }
  )


server.listen({ port: 3000}, (err, address) => {
    if(err){
        console.log(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})
