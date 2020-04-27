# Dev.to clone built with NuxtJS

> An articles aggregation app using [DEV.TO](https://dev.to) public [API](https://docs.dev.to/api/), demonstrating capabilities of [NuxtJS](https://nuxtjs.org) new [fetch()](https://nuxtjs.org/api/pages-fetch)

See [live mode](https://dev-clone.nuxtjs.app/).

[![Edit dev-to-clone-nuxt](https://codesandbox.io/static/img/play-codesandbox.svg)](https://codesandbox.io/s/github/bdrtsky/nuxt-dev-to-clone/tree/master/?fontsize=14&hidenavigation=1&theme=dark)

## What You’ll Learn

- use `$fetchState` for showing nice placeholders while data is fetching on the client side

- use `keep-alive` and `activated` hook to efficiently cache API requests on pages that have already been visited

- reuse the `fetch` hook with `this.$fetch()`

- set `fetchOnServer` value to control when we need to render our data on the server side or not

- find a way to handle errors from `fetch` hook.

## Getting Started

```sh
# clone the project
git clone https://github.com/bdrtsky/nuxt-dev-to-clone.git

# install dependencies
npm install

# start the project
npm run dev

# go to http://localhost:3000
```

Read full article: https://nuxtjs.org/blog/build-dev-to-clone-with-nuxt-new-fetch

<p align="center">
  <img src="https://raw.githubusercontent.com/bdrtsky/nuxt-dev-to-clone/master/static/demo.gif">
</p>
