> "There are no answers, only choices." - Stanisław Lem, Solaris, 1961

> "To do a dull thing with style is preferable to doing a dangerous thing without it." - Charles Bukowski, 1972

> "The narrowest path is always the holiest." - Depeche Mode, 1993 

## Introduction

This is a starter template for a CRUD web app with a session-based authentication. It is based on ["Lucia Astro User Name Password" example](https://github.com/lucia-auth/examples/tree/main). Node.js, TypeScript, React, Lucia v3, Astro.

```sh
npm install
npm run dev
```

The sole reason for this code is to practice web development with a metaframework. Kudos to [pilcrow](https://github.com/pilcrowOnPaper) for sharing complete examples with multiple authentication methods and multiple frameworks.

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

    Overwrite the src folder with the one provided by [the git repo](https://github.com/lucia-auth/examples/tree/main/astro/username-and-password).

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

The weakest link in this whole technology stack is a metaframework.

## Doubts About Astro

Astro can serve as a React metaframework, but it is not particularly good at it:

1. The whole code base is now infected with "*.astro" which React cannot call.

2. Yet another templating language.

3. With React, Astro feels like JSX forked:

    ```astro
    <div class="min-h-screen gap-4 lg:gap-24 lg:w-3/5 mx-auto flex flex-col items-center text-base-content">
        <Header client:load />
    </div>
    ```

    Here "class" comes from HTML, but wraps a JSX/React component which would demand "className" above it in the JSX proper. The "client:load" annotation inside what looks to be a JSX syntax. This is good only when writing everything in "*.astro" with a few independent React pieces. Otherwise it will be very confusing.

4. The SSG mode produces annoying React errors (warnings): [418](https://react.dev/errors/418?invariant=418), [423](https://react.dev/errors/423?invariant=423).

5. "npm run build" creates only absolute paths controlled with "site" and "base", which is not enough, esp. if you want to use github pages. Manual editing will be needed.

Ultimately, Astro does avoid passing around React code as strings, and is easy to use with a shallow heterogeneous component interaction. However, we want everything TypeScript, not "*.astro". That is the whole point of Node.js and "the JavaScript community", is it not?!

Metaframeworks are also very confusing as React is fundamentally a client side library being pushed to a server without the browser environment (unlike, say, the Electron desktop GUI technology).

## Conclusion

I do not find metaframeworks solving the backend templating problem at all. They are a gigantic waste of time, still figuring out [how to submit a form](https://github.com/withastro/roadmap/blob/actions/proposals/0046-actions.md). This is interesting if you are into FP and compiler theory revolving around applied immutable trees with a state, ["lifting" and "hoisting"](https://www.youtube.com/watch?v=VdDJbrh23zo), or even ["network dissolving"](https://www.youtube.com/watch?v=cgxtLOYE2TE). Sadly, this is not a real stuff.

I think the most reliable productive stack for CRUD apps is a React SPA with Vite and a router such as Express or Hono. MERN in vanilla Js (no TypeScript, no React), with ChatGPT 3.5, can also be a king in dependable code. TBC...

## References

1. [Vercel completes $250 mln Series E round at $3.25 bln valuation, 2024](https://www.reuters.com/technology/vercel-completes-250-mln-series-e-round-325-bln-valuation-2024-05-16/)

1. [Web Dev Cody: How much money did my channel earn this year. youtube, 2024](https://www.youtube.com/watch?v=qwXvW_fN_9k)

2. Lichess.org: [Technology Stack](https://lichess.org/source), [Server Costs](https://docs.google.com/spreadsheets/d/1Si3PMUJGR9KrpE5lngSkHLJKJkb0ZuI4/preview)

2. [Web Dev Cody: How do server side authentication sessions work (express & cookies). youtube, 2023](https://www.youtube.com/watch?v=BgsQrOHNKeY&t=6s)

3. [Diona Rodrigues: Fetch API, do you really know how to handle errors? dev.to, 2023](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0)

4. [Austin Shelby: react-hook-form and zod. youtube, 2022](https://www.youtube.com/watch?v=4zt1eadehKQ)
