# Project Description

# Included Functionality

All functional rquirements described at the bottom of the readme are included. To implement the requirements the following are included:

- View in scrollable list using react-virtualization: This allows 150 pokemon to be loaded but not rendered until
  they are scrolled into views, improving performance.
- Adding/removing pokemon per profile using checkboxes, creating a more intuitive user experience.
- Error handling and an ErrorBondary are used to raise and display possible errors from remote api calls as well as display validation related to the user selection of pokemon.

# Frameworks and Libraries

TIn addition to the default libraries already part of the project, the project uses react-redux and react-virtualization with React.memo and useMemo.

# Project setup

- Seeding pokemon: There is a server endpoint to seed 151 pokemon into the database using a remote pokemon api.
  The endpoint for this is: curl -X POST http://localhost:3000/api/seed/pokemon

- Profile creation: This can be using the POST profiles endpoint: curl -X POST http://localhost:3000/api/profiles \
  -H "Content-Type: application/json" \
  -d '{"username": "ashketchum", "email": "ash@pallet.com"}'

- Security note: It was necessary to add a cors setup script with the client Vite URL( default http:/localhost:4200) to the Nestjs setup in order to allow the UI to communicate to the server. This will need to be updated if a dfferent client URL is used.

# Future Improvements

Given time limitations, elements necessary for a production application are out of scope for this project but would be
included if more time was available. These include:

- Unit Testing: There is currently to unit testing. The reliability of the application could be improved by adding testing of the functional components
  that mimics user behavior using jest/React Testing Library, for example testing user selections in the UI. For the
  api requests, mock data can be used to simulate responses and check validation behavior. End-to-end testing can also be considered using Cypress or something similar.

- Styling/UI: The styling and UI could be improved through more extensive use of CSS.

- Security: There is currently no authentication for accessing the application. Assuming this should not be public accessible, some type of authentication should be considered in a production environment. A third-party solution like AWS Cognito could be used. Also, the proxy api's used have no security to ensure it is a valid user and request. After a user is authenticated, javascript web tokens is a reliable and straightforward practice that could be used to authorize and passed as a header in each request.

- Logging: The application can use more robust logging of errors to monitor production performance and troubleshoot errors. AWS Cloudwatch is a basic out-of-the box practice that
  could be used in AWS hosting environment.




# Initial Requirements and Project Description

# Chorus Interview

## About this Interview

Welcome to Chorus Engineering's Interview project!

We're looking for engineers who are experienced, passionate, and obsessed with strong systems and high productivity.

In order to facilitate this, we are providing an interview project that mirrors the technical stack that used
here at Chorus.

**You, the interviewee, have the power to decide if this is the technology that you want to work on!**

The goal of this interview is to identify strengths through a take home project, followed by
a 1 hour pairing session that will extend your work by creating features together.

## Tech Stack

- React UI
- Emotion CSS
- Typescript
- Node/NestJS Backend
- NX Monorepo
- Github Actions CI
- PostgreSQL Database
- Docker / Docker Desktop

## Prerequisites

Package Manager: pnpm 8.15.8

Node: 20.14.0 (LTS)

Docker

## Instructions

### Install Preqresuites

1. [Install nvm](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating)

Use this command to install node and npm comes with it.

```bash
nvm install --lts
```

2. Install pnpm

```bash
npm i -g pnpm@8.15.8
```

3. [Install Docker / Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Getting and Running the Repository

**The Hiring Manager will send you a link to this repository.**

Clone this repository, and run the commands below to get started.

1. Run `pnpm install`
2. Run `pm2 start`

> Note: The API and React server will automatically watch for changes.

You can manage start/stop using `pm2`.

Use `pm2 logs` to see the logs from all processes.

Use `pm2 stop all` to stop the servers.

Use `pm2 delete all` to delete the entry from the pm2 process list.

### Connecting to the Database

Use whatever tool you'd like to connect to the database.

[We recommend DataGrip.](https://www.jetbrains.com/datagrip/)

Here are the connection details below.

- **Database**: pokemon
- **Username**: admin
- **Password**: admin
- **Host**: localhost
- **Port**: 5432

## Prompt

Lets make a Pokémon Team builder!

We want to create a way to select 6 Pokémon to be on our team.

The UI should allow the user to:

1. View a list of the first 150 Pokémon
2. Select from the list of Pokémon
3. Submit the Pokémon that we have selected to the backend.

**It does not have to be a beautiful UX experience. We're aiming for functional.**

### Completion Criteria

Database Requirements

- There should be a Profile table
- There should be a Pokémon table
- There should be a relationship between Pokémon and Profiles.

UI Requirements

- Show a list of the first 150 Pokémon
- Show selectable Profiles
- Select a profile, and choose up to 6 Pokémon.

API Requirements

- Return pokemon
- Create Profiles
- Handle receiving Pokémon related to Profiles

## Submission Criteria

All of your work should be located in a Github Repo.

Ensure your repo is public, and submit the URL back to the hiring manager.

### Troubleshooting

> I can't execute pm2!

pm2 is part of the devDependencies, so when you install the dependencies, you should be able to
execute the binary from node_modules.

Either use `pnpm pm2` or add `node_modules/.bin` to your `PATH`.

> The requirements are confusing. I'm stuck.

Contact the hiring manager, and inform them of the situation. Be specific and clear about your concerns or issues.
