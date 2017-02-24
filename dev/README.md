## Build Containers ##
The development environment consists of several images that need to
be built first.
```
docker-compose build
```
This will take a few minutes, but afterwards you should have all the
tools you need.

## Code Generation ##
Generate aptly API SDK in `src/app/aptly/gen` from `swagger.yaml`
```
docker-compose run --rm code-gen
```

## Unit Tests ##
Run the unit tests
```
docker-compose run --rm test
```
