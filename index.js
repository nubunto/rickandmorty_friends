const koa = require('koa')
const logger = require('koa-logger')
const graphqlHTTP = require('koa-graphql')
const mount = require('koa-mount')
const { RickAndMortySchema } = require('./src/schemas.js')

const app = koa()

app.use(logger())
app.use(mount('/graphql', graphqlHTTP({
	schema: RickAndMortySchema,
	graphiql: true
})))

app.listen(8080)
console.log('GraphQL app listening on 127.0.0.1:8080/graphql')


