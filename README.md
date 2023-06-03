# Learning Webapps

A basic full-stack webapp to play around with. It has modern software developement in mind. This means it is unlike many applications that have not been created in the last 10 years or so. This is because it is cloud-first.

Eventually the plan is to deploy the repo to a cloud instance, using a CD pipeline. This way changes that pass CI and code review will always be deployed to production automatically... for the whole world to see. We are getting a little ahead of ourselfs though.

This readme is sectioned with general information about the application.

Requires:
- Node.js (https://nodejs.org/en)
    - Learn more: https://en.wikipedia.org/wiki/Web_server
- Docker (https://www.docker.com/)
    - Learn more: https://en.wikipedia.org/wiki/Containerization_(computing)

## Contributing to the repo
The magic of the internet and the nature of software is open-source, just like this repo. Anyone will access to the repo is encouraged to contribute to the source code. There are some things to note:

1. Main is locked. No one can push directly to main. You must open a branch, make changes on your branch, and then submit a pull request for review.
2. When submiting a pull request to main, github actions will trigger. This is an automated test run to make sure your not breaking anything, and that the tests pass still. Failing prs likely mean you didn't test, didn't update the tests, or did something very large (sometimes requiring this system to change). We call this system CI (continous integration) in software land. You can view the CI pipeline (code that does the CI) in the workflows folder. DO NOT TOUCH IT if you don't know what you are doing (like read something and test it in your own repo first), as the pipeline runs on cloud infra ($$$).
3. If your pr passes tests and is approved, it will get merged to main (by a repo admin) and then everyone will get your new changeset... yay.

This concept is basically https://docs.github.com/en/get-started/quickstart/github-flow with a little extra branch security built in.

Make sure to always pull/rebase from main when changes are made. This will save you a ton of headache later, and prevent merge conflicts https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/addressing-merge-conflicts/about-merge-conflicts

Please review git and github and make sure you have a decent understanding of both before trying to contribute. Messy commit histories are difficult to review and merge conflicts create extra work (often a lot).

## Run locally:
Note, to stop any running containers, use cntrl+c. Anytime you make a change, you must rebuild the container. Trying to rerun the container without rebuilding will result in no new changes being added.

To install required dependencies, go into the folder of the microservices and run:
`npm ci`

If you get an error, its likely there is something wrong with your installation of node or you skipped the above step and didnt install it.

### Client:
Commands must be ran inside client folder

#### Standalone: 
1. Run `npm start`
2. Once running, can be viewed at http://localhost:3000 though it should auto-open the browser

#### With docker: 
1. Make sure you have docker engine running 
2. Build the image `docker build -f Dockerfile -t client .`
3. Run the image `docker run -it -p 4001:3000 client`
4. Once running, can be viewed at http://localhost:4001/

### Server:
Commands must be ran inside server folder

#### Standalone: 
1. Run `npm start`
2. Once running, API endpoints can be accessed through http://localhost:3001<end_point> (ie. localhost:3001/ is the root endpoint)

#### With docker: 
1. Make sure you have docker engine running 
2. Build the image `docker build -f Dockerfile -t server .`
3. Run the image `docker run -it -p 4002:3001 server`
4. Once running, can be viewed at http://localhost:4001/

### Reverse Proxy
Commands must be ran inside server folder.
Can only be run with current setup using docker

1. Make sure you have docker engine running 
2. Build the image `docker build -f Dockerfile -t reverse-proxy .`
3. Run the image `docker run -it -p 4003:3002 reverse-proxy`
4. Once running, can be viewed at http://localhost:4002/
    - Note its just a proxy, so you wont see much

### Full Application:
This application uses docker-compose to spin up each microservice's docker container and then takes care of the network mapping for us. All you have to do to run it is `docker-compose up --build` from the root (not in any folder).

The idea here is that you can run each service individual while testing/developing, but you can also run the entire application (made up of microservices-- see 'Architecture' section for more info). When the application is run in full, the network setup is like so:

1. Front-End/Ui - http://localhost:3050/
2. Database Admin - http://localhost:8000/
    - This can be helpful when testing to make sure the things you are adding are actually going into the db. Username, password, and database are set in the docker-compose file under `common-variables`

Also note, things you add to the db persist, even after you stop the application. This is expected and intended behavior. In the case where a server dies (for lots of reasons), it is easy to resume the state of the application.

## Tests

There are 2 sets of tests, one for the client and one for the server. Currently, they are very basic tests, and just ensure core functionality is present. When adding new features, ALWAYS add new unit/integration/regression/etc tests.

More about testing: https://www.geeksforgeeks.org/types-software-testing/

To run Tests:
1. Ensure you are in the correct folder
2. Run `npm test` and you should get a test summary.
    - For server tests, make sure the server not is started or running before you run the tests. This may cause jest to hang or become a zombie process.

Both the client and server use `jest` as their testing framework of choice. The client tests also use the `react-scripts` library that supersets jest to work better within react.
