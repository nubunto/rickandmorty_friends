const co = require('co')
const pg = require('co-pg')(require('pg'))

const config = {
	connectionString: process.env.RM_PGSQL_CONNSTRING,
}

function* queryDB(query, args) {
	const [ client, done ] = yield pg.connectPromise(config.connectionString)
	const result = yield client.queryPromise(query, args)
	done()
	return result
}

const CharacterService = {
	getAll() {
		return co(function* () {
			const result = yield co(queryDB('SELECT id, name FROM character'))
			const characters = result.rows.map((character) => {
				return {
					id: character.id,
					name: character.name,
				}
			})
			return characters
		})
	},

	getOne(characterID) {
		return co(function* () {
			const result = yield co(queryDB('SELECT id, name FROM character WHERE id=$1', [characterID]))
			const { id, name } = result.rows[0]
			return {
				id,
				name,
			}
		})
	},

	getFriends(characterID) {
		return co(function* () {
			const result = yield co(queryDB('SELECT f.id, f.name FROM character c JOIN friend ff ON c.id = ff.character_id JOIN character f ON f.id = ff.friend_id WHERE c.id = $1', [characterID]))
			const friends = result.rows.map((friend) => {
				return {
					id: friend.id,
					name: friend.name,
				}
			})
			return friends
		})
	},

	createCharacter(character) {
		return co(function* () {
			const result = yield co(queryDB('INSERT INTO character (name) VALUES ($1) RETURNING id', [character.name]))
			const { id } = result.rows[0]
			return {
				id,
				name: character.name,
			}
		})
	},
}

module.exports = {
	CharacterService,
}
