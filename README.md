> There are no answers, only choices. - Stanisław Lem, Solaris, 1961

## Introduction

This is a starter template for a web app with a session-based user name and password authentication, no emails and password resets at the moment or in the nearest future.

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

## Some Choices

- React components instead of .astro components whenever possible. Many reasons.

- React Hook Form and Zod validation. Not essential, but let it be.

- Styling with Tailwind and daisyUI dark theme.

## Todo

- [x] Basic session-based authentication (auth).
- [] Block everything GUI-reachable when a user submits a form, not just the form.
- [] Drizzle ORM and in-process file-based SQLite instead of in-memory SQLite.
- [] Add Astro View Transitions.
- [] Remove Lucia, or not. Kudos to [pilcrow](https://github.com/pilcrowOnPaper) for showing the way.
- [] Try useContext, or not. Initial ChatGPT stuff did not work, need to read more about this hook magic or advocate against it.
- [] Add real function, release on the VPS. Document DX.
- [] Add "Donate" button and hope this becomes something eventually.

Also to Think About:

- [] Testing routes with slow connections.
- [] Should X go to pages, fences inside a page, pages/api, or components (frontend)?
- [] return Astro.redirect('/') vs window.location.href = "/"; 
- [] CSRF protection.
- [] Bots.
- [] DDoS.
- [] Evil users. 
- [] Delegate communication to emails, or not? 
- [] Database: VPS or 3rd party, dev vs prod branches, safety caps.
- [] Async, pending, blocking, throttling and debouncing...

## Random Thoughts About the Stack

- Why Node.js instead of say Django or Laravel?

    A single language (TypeScript) on the both sides, and even React on the both sides, though this can get confusing, and TypeScript is a big complex language. The main argument here is that TypeScript is always better than TypeScript and something else. 
    
    The shit hits the fan with transpilers, Js libs, generic types, the type "any", no doubt. In FP, most of the things are async callback caboodles, and type annotations are very far away from a business domain. Js is so much simpler, yet no typo protection whatsoever.

- React?

    We need composable components written in Ts with an npm-like ecosystem: Forms, drag and drop, animation, rich editor component, chat widgets, tables, date pickers, responsive navbars... HTMX is not enough, others do not have critical mass. Still, it is not entirely clear whether components really demand React.

- Why Astro? 

    No good choices here. Astro is more similar to than different from Next.js with pages router. The latter is being retired, so I consider Astro as a more solid and up to date continuation of this way. Astro brings one serious disadvantage though: It adds .astro files in addition to Jsx and TypeScript.
    
    On the other hand, newer Next.js is a messy moving platform, while using a combo of, say, raw Hono and Vite + React will be more cumbersome than Astro + React.
 
- Why not just github/google/discord auth, Clerk etc.? 

    I would go for the 3rd party if we had one and only, but it does not exist.

- React Hook Form? 

    ChatGPT generates vanilla Ts in no time and is on par or even shorter than React when it comes to complex forms. Less declarative, but also easier to debug. Minimal React is nice, but then we have the problem of agreement: Tanstack, React 19, React Hook Form, obscure metaframework solutions, while there is only one vanilla Ts. Except that we also have ES5, ES6, JsDoc, and every repo will impose its own way without React. What a mess.

- Lucia? It is briliant to get things going, but comes with "adapters" and "middleware" which add an extra layer of "FP creativity".

- Everything is still horrid and too low level. Generic types, rules of hooks, missing provider context, suspense my ass. One million ways to shoot yourself in a foot. On the other hand, we get less "locked in" on the server side as components help to port stuff to any other metaframework.

- Youtube programming video selection filter: Remove affiliated ones promoting sponsored 3rd party hell, and those who mostly promote their obsolete paid courses or jump from topic to topic superficially. Remove anything with good, but sadly obsolete tech: Countless old and new videos on Js, Douglas Crockford circa 2010, MERN, Next.js with pages or without them, SvelteKit, most of React too. Anything touching serverless with no payment caps and no real DDoS protection by default, AWS, GCP, Cloudflare, Vercel... Remove OO/FP architects and astronauts, type theorists, Zig, Rust, 10x engineering. Remove anything that does not document a complete product that has a purpose.  

## ChatGPT

It is extremely helpful, makes programming great again ;). It is not so good with:

- Configuration (logic and creativity will be done by machines, we will slave around the rest). 

- Authentication (too big of a code also reaching stuff outside TypeScript).

- Styling (demands a lot of micromanagement, at best). 

- You have to know what to ask and make sure the answers fit into single-page chunks.

- The whole world is now using OpenAI servers, the load is unbearable at times.

Notice that even ChatGPT 3.5 is amazing, the only problem is that it somewhat pushes one to use vanilla Js/Ts when we kind of live in the era of a moving React and moving UI libs. Big expensive deep nets cannot reliably catch up with this way, unlike with vanilla Js/Ts.

I agree with Web Dev Cody and some other gurus that the biggest impact so far in web development comes from Wordpress and "no code" solutions. 

If only we could come up with the editor like Blender in computer graphics or Unity/Unreal in computer games...

## Useful References

1. [Web Dev Cody: How much money did my channel earn this year. youtube, 2024](https://www.youtube.com/watch?v=qwXvW_fN_9k)

2. [Web Dev Cody: How do server side authentication sessions work (express & cookies). youtube, 2023](https://www.youtube.com/watch?v=BgsQrOHNKeY&t=6s)

3. [Diona Rodrigues: Fetch API, do you really know how to handle errors? dev.to, 2023](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0)

4. [Austin Shelby: react-hook-form and zod. youtube, 2022](https://www.youtube.com/watch?v=4zt1eadehKQ)
