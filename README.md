> There are no answers, only choices. - Stanisław Lem, Solaris, 1961

## Introduction

This is a starter template for a web app with a session-based user name and password authentication, no email communication and password resets.

The complete tech stack: Node.js, TypeScript, Astro, React, Lucia v3, SQLite, and Drizzle ORM (the latter not yet).

The code is based on "Lucia Astro User Name Password" example provided in Lucia docs. If you want to start with it instead, I provide a few details in the next section, otherwise skip it and see my adjustments. 

## Setup "Lucia Astro UserName Password" Demo

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
    
3. Adding forms with proper handling of errors around fetch, redirects, and styling. 

    Styling takes a lot of iterations, do not discount it.

## Doubts About Astro

There is a lot to do, like blocking everything GUI-reachable when a user submits a form, not just the form. Turn an in-memory SQLite
to an in-process file-based SQLite managed with, say, Drizzle ORM. CSRF protection and all sorts of other protections.

The only problem is that I do not find Astro to be a good React metaframework. I have encountered React warnings: [418](https://react.dev/errors/418?invariant=418), [423](https://react.dev/errors/423?invariant=423), absolute paths, very confusing ".astro" syntax (is this part HTML, or JSX, or neither). "client:load" annotations allowed only in ".astro" files. 

## The Best Way to CRUD?

Embrace Next.js with paid 3rd party services, or build more slowly with full control by starting with just a router?

We have already got a few good pieces. Typescript as a single static language for FE and BE. Node.js on a VPS. Minimal React (Vite, perhaps no client side routing at all) solves templating. Lucia v3 shows the way to proceed with authentication. 

The rest is not so clear to me. It could be Drizzle ORM with its studio to manage SQLite on a self hosted VPS, or on Turso. Or Mongo DB, self-hosted or Atlas? 

The only horror story here is a web framework or a metaframework, all these server-client blending games. It should be something light, a router like Express or Hono, allowing to trace requests and debug code when things go wrong, higher level magic is not worth it.

Stack 1: MERN + Atlas + VPS + Custom Lucia v3 inspired Auth, Vanilla JavaScript, Tailwind, no React, ChatGPT 3.5.

or

Stack 2: Hono + Drizzle + SQLite + VPS + Lucia v3, TypeScript, Tailwind, minimal React, Vite, ChatGPT 4o.

The second stack is not that much better. TypeScript will catch typos, but will also add complexity irrelevant to business logic. React will give more readable structure and all the libs, but this is again, an extra layer and compiler which does not help that much with forms or custom landing page carousels.

TBC...

## References

1. [Web Dev Cody: How much money did my channel earn this year. youtube, 2024](https://www.youtube.com/watch?v=qwXvW_fN_9k)

2. Lichess.org: [Technology Stack](https://lichess.org/source), [Server Costs](https://docs.google.com/spreadsheets/d/1Si3PMUJGR9KrpE5lngSkHLJKJkb0ZuI4/preview)

2. [Web Dev Cody: How do server side authentication sessions work (express & cookies). youtube, 2023](https://www.youtube.com/watch?v=BgsQrOHNKeY&t=6s)

3. [Diona Rodrigues: Fetch API, do you really know how to handle errors? dev.to, 2023](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0)

4. [Austin Shelby: react-hook-form and zod. youtube, 2022](https://www.youtube.com/watch?v=4zt1eadehKQ)
