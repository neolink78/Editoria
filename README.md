# The Good Corner

## Development

Run app in watch mode:

```
docker compose build && docker compose watch
```

In parallel, follow log output with:

```
docker compose logs -f
```

### Setting web-app types after GraphQL

Generate query-specific types for web-app development:

```
cd web-app
npm run graphql-codegen
```

These types can then be used in Apollo queries and mutations.
