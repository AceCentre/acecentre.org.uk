Front-end for acecentre.org.uk built using NextJS. Sits on top of a wordpress backend (wpgraphl)

- [Development](#development)
  - [Setup](#setup)
  - [Running in Dev Mode](#running-in-dev-mode)
  - [Storybook](#storybook)
  - [Graphql](#graphql)
- [Contributing](#contributing)
- [Deployment](#deployment)
- [Tests](#tests)

## Development

### Setup

Before getting started make sure that you have the following installed:

* Node (LTS)
* Yarn (`npm i -g yarn`)

Make sure to install the dependencies using `yarn install`
   
### Running in Dev Mode

You can run the NextJS app by doing `yarn start`. You can then see the website at localhost:3000](http://localhost:3000).

### Storybook

[Storybook](https://storybook.js.org/) is an open source tool for developing UI components in isolation for React, Vue, Angular, and more. It makes building stunning UIs organized and efficient.

You can run storybook in dev mode by running `yarn storybook`. You can then see it running at [localhost:6006](http://localhost:6006).

You can see it deployed at [acecentreorguk.netlify.app/design-system/](https://acecentreorguk.netlify.app/design-system/)

### Graphql

The website is powered by Wordpress but uses [WPGraphql](https://www.wpgraphql.com/) to expose an API from wordpress. You can explore the API at our hosted graphql playground at [acecentreorguk.netlify.app/api/graphql](https://acecentreorguk.netlify.app/api/graphql)

## Contributing

If you want to contribute, open a PR so that the tests can run against your changes and we can view a preview before you change goes live.

## Deployment

This project uses the automation in Netlify to deploy the website. This means that every commit to the `main` branch will get published to the main site and every Pull Request will get a preview version.

## Tests

On every pull request we will run the following tests:

* Jest
* Cypress
* Lighthouse
* ESLint
