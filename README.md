> "Astroturfing: the deceptive practice of presenting an orchestrated marketing or public relations campaign in the guise of unsolicited comments from members of the public." 
>
> — *Oxford Languages*

*Edit (March 2025): This stack is no longer viable. [Better Auth](https://www.youtube.com/watch?v=QhA55R4u6uk&ab_channel=NevtheDev) is a new hot thing.*

## Introduction

This is a "starter template" for the CRUD with a session-based authentication. It is based on ["Lucia Astro User Name Password" example](https://github.com/lucia-auth/examples/tree/main). Node.js, TypeScript, React, Lucia v3, Astro, daisyUI. It is an MPA (multi-page application).

```sh
npm install
npm run dev
```

The sole reason for this code is to check whether Astro is the way (it is not). Kudos to [pilcrow](https://github.com/pilcrowOnPaper) for sharing complete examples with multiple authentication methods and multiple frameworks.

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

The weakest link in this whole technology stack is the metaframework.

## Doubts About Astro

Astro can serve as React metaframework, but it is not particularly good at it:

1. The whole code base is now infected with "*.astro" which React cannot call.

2. Routing/redirecting is still a mess:

    * Astro.redirect("/user"),
    
    * window.location.href = "/user",
    
    * Astro.locals.user with some env.d.ts weirdness, 
    
    * HTML links inside React components,
    
    * fetch with double await and manual error handling...

    This is not necessarily the problem created by Astro, but I just wish there was *send(address, data)* and *data = receive(address)* instead of all this "gardening".

3. Astro allows writing HTML, JSX, and "JSX-forked", which is confusing:

    ```astro
    <div class="min-h-screen gap-4 lg:gap-24 lg:w-3/5 mx-auto flex flex-col items-center text-base-content">
        <Header client:load />
    </div>
    ```

    Notice "class" instead of "className" and the "client:load" annotation inside what looks to be a JSX component.

4. The SSG mode produces annoying React errors (warnings): [418](https://react.dev/errors/418?invariant=418), [423](https://react.dev/errors/423?invariant=423).

5. "npm run build" creates only absolute paths controlled with "site" and "base", which is not enough, esp. if you want to use github pages. Manual editing will be needed.

6. [Problems with nested scopes.](https://whoisryosuke.com/blog/2022/blog-refresh-2022#astro-nomical-issues)

Ultimately, Astro does avoid passing around React code as strings. Pairing it with Lucia v3, one can set up a minimal authentication demo. However, there is a lot of Astro and Lucia magic which makes coding like cobbling up obscure 3rd party services. The code patterns are unlikely to be portable or universal.

**Status:** Abandoned all the metaframeworks entirely in favor of a hard split between [backend](https://github.com/aabbtree77/auth-starter-backend) (something minimal like Express or Hono, router-mostly, manual auth rewritten from scratch), and [frontend](https://github.com/aabbtree77/auth-starter-frontend) (Vite + React), which is essentially a single-page application (React router at the frontend). Better have less automation, but more stability and understanding what is really going on.

## References

1. [Vercel completes $250 mln Series E round at $3.25 bln valuation, 2024](https://www.reuters.com/technology/vercel-completes-250-mln-series-e-round-325-bln-valuation-2024-05-16/)

2. [Web Dev Cody: How much money did my channel earn this year. youtube, 2024](https://www.youtube.com/watch?v=qwXvW_fN_9k)

3. Lichess.org: [Technology Stack](https://lichess.org/source), [Server Costs](https://docs.google.com/spreadsheets/d/1Si3PMUJGR9KrpE5lngSkHLJKJkb0ZuI4/preview)

4. [Web Dev Cody: Serverless might bankrupt you. youtube, 2024](https://www.youtube.com/watch?v=G5yNGd6sO-4)

5. [Web Dev Cody: How do server side authentication sessions work (express & cookies). youtube, 2023](https://www.youtube.com/watch?v=BgsQrOHNKeY&t=6s)

6. [Diona Rodrigues: Fetch API, do you really know how to handle errors? dev.to, 2023](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0)

7. [Austin Shelby: react-hook-form and zod. youtube, 2022](https://www.youtube.com/watch?v=4zt1eadehKQ)

