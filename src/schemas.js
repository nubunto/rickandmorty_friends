const { CharacterService } = require('./services.js')
const {
	GraphQLInt,
	GraphQLString,
	GraphQLList,
	GraphQLObjectType,
	GraphQLNonNull,
	GraphQLInputObjectType,
	GraphQLSchema,
} = require('graphql')

const Character = new GraphQLObjectType({
	name: 'CharacterSchema',
	description: 'Defines a Rick and Morty character',
	fields: () => ({
		id: { type: GraphQLInt }, 
		name: { type: GraphQLString },
		friends: {
			type: new GraphQLList(Character),
			resolve: (character) => {
				return CharacterService.getFriends(character.id)
			}
		}
	})
})

const Query = new GraphQLObjectType({
	name: 'RootQuery',
	fields: () => ({
		characters: {
			type: new GraphQLList(Character),
			resolve: () => {
				return CharacterService.getAll()
			}
		},
		character: {
			type: Character,
			args: {
				id: { type: GraphQLInt }
			},
			resolve: (root, { id }) => {
				return CharacterService.getOne(id)
			}
		}
	})
})

const CharacterInput = new GraphQLInputObjectType({
	name: 'CharacterInput',
	fields: () => ({
		name: { type: new GraphQLNonNull(GraphQLString) },
	})
})

const Mutation = new GraphQLObjectType({
	name: 'MutationSchema',
	fields: () => ({
		createCharacter: {
			type: Character,
			description: 'Creates a new character',
			args: {
				character: { type: CharacterInput },
			},
			resolve: (root, { character }) => {
				return CharacterService.createCharacter(character)
			}
		}
	})
})

const Schema = new GraphQLSchema({
	query: Query,
	mutation: Mutation,
})

module.exports = {
	RickAndMortySchema: Schema,
}
