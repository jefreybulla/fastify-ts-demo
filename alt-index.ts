import fastify from "fastify"
import { Static, Type } from '@sinclair/typebox'

const server = fastify()


// with typebox you can declare Json schema and types only once
const UserSchema = Type.Object({
    name: Type.String(),
    // validate email format
    mail: Type.Optional(Type.String({ format: 'email' })),
})
type UserType = Static<typeof UserSchema>

const ReplySchema = Type.Object({
    success: Type.Boolean()
})
type ReplyType = Static<typeof ReplySchema>

server.get('/ping', async(request, reply) => {
    return 'pong\n'
})


server.post<{ Body: UserType, Reply: ReplyType}>(
    '/',
    {
      schema: {
        body: UserSchema,
        response: {200: ReplySchema}
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
