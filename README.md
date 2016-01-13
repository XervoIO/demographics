demographics
============
A project stats API.

## Install

1. Clone
2. `npm install`

## Start

1. `npm start`

If running locally, start mongo or set `MONGO_URL` to an external database.

## Configuration Options

- `HOST`
- `MONGO_URL`
- `PORT`

## API
See [API documentation.](https://github.com/onmodulus/demographics/wiki/API)

### Getting Project Stats
1. Version: Look at `package.json` or run `cat package.json| grep version`
2. Lines of Code (loc): Run `cloc . --exclude_dir=node_modules,coverage`
3. Test Coverage: Will vary per project, but `npm test` will often work
4. Outdated Dependencies: Run `npm outdated -l`
