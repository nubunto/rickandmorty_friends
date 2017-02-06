# Rick And Morty friends database

To run this project, first create the tables necessary:

```sql
CREATE TABLE character (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL
)

CREATE TABLE friend (
  id SERIAL PRIMARY KEY,
  friend_id INTEGER REFERENCES character (id),
  character_id INTEGER REFERENCES character (id)
)
```

Then, export a env variable described in your code:

`$ export RM_PGSQL_CONNSTRING=postgres://YOUR_PG_USER:YOUR_PG_PASSWORD@your-postgres-instance-address/your-database`

Now, run your code using Node:

`$ node .`

You're done!
