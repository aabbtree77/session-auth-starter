> "There are no answers, only choices." - Stanisław Lem, Solaris, 1961

> To do a dull thing with style is preferable to doing a dangerous thing without it." - Charles Bukowski, 1972

## Introduction

This is a starter template for a web app with a session-based user name and password authentication, no email communication and password resets.

Node.js, TypeScript, React, Lucia v3. A web framework is Astro, but this might change.

The code is based on "Lucia Astro User Name Password" example provided in Lucia docs.

```sh
npm install
npm run dev
```

## Official "Lucia Astro UserName Password" Example

1. Clone [the demo](https://lucia-auth.com/tutorials/username-and-password/astro) sample code.

    cd to a folder and run `npm install`. 

2. Alternatively, 

    ```sh
    npm create astro@latest mini-auth
    cd mini-auth
    npx astro add node
    npm i lucia better-sqlite3 @types/better-sqlite3 @lucia-auth/adapter-sqlite
    ```

    Overwrite src folder with the one provided by [the git repo](https://github.com/lucia-auth/examples/tree/main/astro/username-and-password).

Run `npm run dev`, the demo will show an unstyled form expecting a username with length between 3 and 31 characters, and only lowercase letters, 0-9, -, and _. Password no shorter than 6 characters.

## Modifications

So far, I have continued with

1. Tailwind CSS:

    ```sh
    npx astro add tailwind
    npm i @tailwindcss/typography daisyui@latest
    ```
    
    Adjust `tailwind.config.mjs` with `typography` and `daisyui` as in [robbins23 daisyui-admin...](https://github.com/robbins23/daisyui-admin-dashboard-template/blob/master/tailwind.config.js) or now here.
    
2. React:

    ```sh
    npx astro add react
    npm i react-hook-form @hookform/resolvers @heroicons/react
    ```
    
3. Adding forms with a proper handling of errors around fetch, redirects, and styling. 

    Styling takes a lot of iterations, do not discount it.

There is still a lot to do, like blocking everything GUI-reachable when a user submits a form, not just the form. Turn an in-memory SQLite
to an in-process file-based SQLite managed with, say, Drizzle ORM. CSRF protection and all sorts of other protections.

The weakest link in this whole technology stack is a metaframework, and I do not find Astro to be a solid React metaframework to begin with. This warrants a discussion.

## Why Do We Need a Metaframework? 

The problem is React, and the desire to reuse it on the server side without yet another obscure server side templating. This creates huge problems and perpetual server-client blending games. It is a popular problem, and it might make things better eventually when it becomes solved, not now. 

If we do not need templates on the server side, only do DB stuff and respond with json messages to fetch API POST/GET requests received from the frontend by some advanced router library (Express, Hono), a metaframework is not needed.

Rendering React on the server side with routers and libs manually is kind of ugly. 

Typically, one must first convert a React component to a string, e.g. 

```jsx
import { renderToString } from 'react-dom/server';
const htmlString = renderToString(<MyReactComp />);
```
    
However, it is then not enough to simply respond with HTML inside, say, Hono:

```jsx
app.get('/', (ctx) => {
return ctx.html(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup Form</title>
  </head>
  <body>
    <div id="root">${htmlString}</div>
  </body>
</html>
```

The HTML part needs to load all the aux transpiler stuff and do "Js hydration". Since JSX needs to become Js, we now must stringify the React component the second time:
    
```jsx
return ctx.html(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Signup Form</title>
  </head>
  <body>
    <div id="root">${htmlString}</div>
    <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    <script type="text/babel">
      const { useState } = React;
      const MyReactComp = ${MyReactComp.toString()};
      ReactDOM.hydrate(React.createElement(MyReactComp), document.getElementById('root'));
    </script>
  </body>
</html>
`);
```
    
Obviously this is very ugly, esp. if you want to use components inside components with all the props and state and async codes. This is the problem that Next.js, Remix, SvelteKit, and nowadays Astro, have been solving.

Astro can indeed serve as a React metaframework, as one can see even in this github repo. It hides a lot of that stringification complexity, and as a user all I need is minimal "*.astro" files inside pages as routes, "*.ts" files inside "pages/api" for the json response routes, and "components" which will have React spread on the server and client. The spreading will be controlled with special Astro annotations inside "*.astro" files, such as "<SignupPage client:load />" which is no longer JSX.

In addition, the spreading/blending is done by choosing one of the three major [Astro rendering modes](https://docs.astro.build/en/basics/rendering-modes/): "static" (SSG), "server" (SSR), or "hybrid". For example, I set "output: 'server'" inside "astro.config.mjs". 

Each of these modes comes with a few further Astro annotations that control rendering. This is well explained by [Coding in Public, 2023](https://www.youtube.com/watch?v=aIHRjloFASU).

## Doubts About Astro

I will list a few cons about Astro that come from my experience.

1. SSG mode produces annoying React errors which are actually just warnings: [418](https://react.dev/errors/418?invariant=418), [423](https://react.dev/errors/423?invariant=423). Not a big deal, but shows some problems with design.  

2. "npm run build" produces only absolute paths controlled with "site" and "base", which is not enough, esp. if you want to use github pages. Manual editing will be needed, which is not a good DX.

3. Most essentially, why "*.astro", why not just JSX/TypeScript? Should I write any component in Astro or React?

This is so confusing:

```astro
<div class="min-h-screen gap-4 lg:gap-24 lg:w-3/5 mx-auto flex flex-col items-center text-base-content">
    <Header client:load />
</div>
```

"class" comes from HTML, but wraps a JSX/React component which would demand "className" above it in a proper JSX. Moreover, "client:load" annotation inside what looks to be a JSX syntax. Imagine passing props with all sorts of components inside components and the hell these "markups inside markups" will produce. 

The whole server-client blending problem space is a counterproductive jungle that works only in shallow cases. Keep React on the front side. Use Express or Hono to connect it to DB via the REST API, or some paid 3rd party. Do not render React on the server at all, do not worry about "typed REST" or removing REST. React for the SPA. Routing on the client side?

TBC...

## References

1. [Web Dev Cody: How much money did my channel earn this year. youtube, 2024](https://www.youtube.com/watch?v=qwXvW_fN_9k)

2. Lichess.org: [Technology Stack](https://lichess.org/source), [Server Costs](https://docs.google.com/spreadsheets/d/1Si3PMUJGR9KrpE5lngSkHLJKJkb0ZuI4/preview)

2. [Web Dev Cody: How do server side authentication sessions work (express & cookies). youtube, 2023](https://www.youtube.com/watch?v=BgsQrOHNKeY&t=6s)

3. [Diona Rodrigues: Fetch API, do you really know how to handle errors? dev.to, 2023](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0)

4. [Austin Shelby: react-hook-form and zod. youtube, 2022](https://www.youtube.com/watch?v=4zt1eadehKQ)
