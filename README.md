# Aptly Web UI #
Web interface for the swiss army knife of Debian repository management.


## Purpose ##
The aptly API is great for scripting. With a UI, it can also be great for
convenient administration.


## Project Goals ##
The initial goal is complete coverage of API functionality and simple views
implementing the basic aptly workflows.

 * Repositories
 * Snapshots
 * Publishes
 * File Upload/Import

Ongoing and longer term, the goals are:

 * Following aptly core and API development
 * Designing workflows aimed at simplifying administration
 * Complimenting scripted repository automation


## Status ##
Still very much in the 'stake' phase. De-risking and familiarizing with the
chosen tools.

- [X] Full API specified
- [X] Automated Typescript API generation
- [-] CRUD Repositories
- [ ] CRUD Snapshots
- [ ] CRUD Publishes
- [-] CRUD Files
- [ ] Package view
- [ ] Package search
- [ ] Snapshot merging
- [ ] Snapshot diffing


## Development ##
The development environment is specified in dev/docker-compose.yaml. It consists
of three containers:

 * ui: A webpack development server responsible for automating the build on
 * api: The aptly API server
 * gateway: A nginx server used for mitigating CORS issues

Install docker:
```
TODO: Fill this is. Or go look it up. There are plenty of resources on this.
```

Install docker-compose:
```
pip install docker-compose
```

Run development environment:
```
cd dev/ && docker-compose up
```

Compose will bring up the environment and expose the following
services.

 * http://localhost/ => webpack development HTTP server
 * http://localhost/api => aptly API server

TODO:

 * Makefile as entry point for development tasks
 * Automate the initial npm install of dependencies


## Personal Goals ##
Become acquainted with Swagger, Typescript, and Material design.
