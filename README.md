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

## Todo, or Not?!

- [x] Basic session-based authentication (auth).
- [ ] Block everything GUI-reachable when a user submits a form, not just the form.
- [ ] Drizzle ORM and in-process file-based SQLite instead of in-memory SQLite.
- [ ] Add Astro View Transitions.
- [ ] Remove Lucia, or not. Kudos to [pilcrow](https://github.com/pilcrowOnPaper) for showing the way.
- [ ] Try useContext, or not. Initial ChatGPT stuff did not work, need to read more about this hook magic or advocate against it.
- [ ] Add real function, release on the VPS. Document DX.
- [ ] Add "Donate" button and hope this becomes something eventually.

Also to Think About:

- [ ] Testing routes with slow connections.
- [ ] Should X go to pages, fences inside a page, pages/api, or components (frontend)?
- [ ] return Astro.redirect('/') vs window.location.href = "/"; 
- [ ] CSRF protection.
- [ ] Bots.
- [ ] DDoS.
- [ ] Evil users. 
- [ ] Delegate communication to emails, or not? 
- [ ] Database: VPS or 3rd party, dev vs prod branches, safety caps.
- [ ] Async, pending, blocking, throttling and debouncing...

## Random Thoughts About the Stack

- Why Node.js instead of say Django or Laravel?

    No definitive answer here. A single language (TypeScript) on the both sides, and even React on the both sides, but this can get confusing, plus there is little convergence on a single framework on Node.js in the past ten years. The main argument here is that TypeScript is always better than TypeScript and something else. 
    
    The other reason for everything TypeScript is the serverless culture with delegation to 3rd party services. Vercel, Render, Cloudflare, AWS, Clerk, Convex, Turso, Supabase, Astro DB, analytics etc. Ship an MVP fast, worry about payments and technical debt later. Create demo web apps that use sponsored tech stack and release them as "open source indie hacker tutorials". Embrace gluing and communication, move up instead of lagging behind with control and precision?!

- React?

    We need composable components with an npm-like ecosystem: Forms, drag and drop, animation, rich editor component, chat widgets, tables, date pickers, responsive navbars... HTMX or web components are not enough, others do not have critical mass.

- Why Astro? 

    No good choices here. Astro is more similar to than different from Next.js. It also brings an obscure ".astro" syntax and semantics mixing HTML, JSX, TypeScript, with React or even Svelte and a bunch of others. I find .astro rather confusing, with no clear answer by the developers to "Why not just JSX?"
    
    Astro has its niche if you have a lot of .md and .mdx files and need to organize them as links, and you can afford spending quite some time with Astro.
    
    If you write a simple portfolio with React in Astro with a static mode, you will likely hit two problems. Firstly, everything will render correctly, but with React warnings visible with F12 in the browser console: [418](https://react.dev/errors/418?invariant=418), [423](https://react.dev/errors/423?invariant=423). Secondly, "npm run build" won't work out of the box and will most definitely need path adjustments as Astro supports only absolute paths which may be generated not the way some platrforms (such as github pages) use them.
    
    The third problem is that .astro components can call React, but React cannot call .astro. This makes it all shallow and quite restrictive. Take a look at this simple landing page example as "index.astro":
    
    ```jsx
    ---
    import SiteLayout from '../layouts/SiteLayout.astro';
    //import LandingPage from '../components/LandingPage';
    import Header from "../components/Header";
    import DX from "../components/DX";
    import Portfolio from "../components/Portfolio";
    import Contact from "../components/Contact";
    import Footer from "../components/Footer";
    ---

    <SiteLayout>
	    {/*<LandingPage client:load /> */}
	    <div class="bg-neutral">
		    <div class="min-h-screen gap-4 lg:gap-24 lg:w-3/5 mx-auto flex flex-col items-center text-base-content">
		      <Header client:load />
		      <DX />
		      <Portfolio />
		      <Contact />
		      <Footer />
		    </div>
	      </div>	
    </SiteLayout>
    ```
    
    One can see the JSX elements, but they are sprinkled with "class" instead of "className" and an extra Astro stuff like "client:load" which isolates an "island" which will get "hydrated" with Js. The only reason to hydrate it in my would be example is that somewhere inside, say, a React "<header>" component, there exists a button that runs some Js. I would want to use "client:load" only on that button, but I cannot do so as this is an Astro syntax and it cannot run in a React code of "<header>". As a consequence, the whole header will be hydrated, or it needs to be rewritten so that the button gets called from "index.astro".    
    
    On the other hand, there are no clear winners in this space. MERN is aging. Fastify or Nest are overengineered, unless you are into generators and plugins. Raw Hono and Vite + React will be more cumbersome than, say, Astro + React, and a lot less stable, also much less adopted. Perhaps Next.js, cough cough, is the best way at the moment, at least it uses only JSX and what is in React already.
 
- Why not just github/google/discord auth, Clerk etc.? 

    No good answers for authentication either. I would go for the 3rd party if we had one and only, but it does not exist. On the other hand, Clerk with or without 3rd party logins, or say, github/google logins begin to make sense to me now that I have tried to gain a "full control".

- React Hook Form? 

    ChatGPT generates vanilla Ts in no time and is on par or even shorter than React when it comes to complex forms. Less declarative, but also easier to debug. Minimal React is nice, but then we have the problem of agreement: "Plain React", or React Hook Form? React 19? Tanstack? Any combo of these?

- Lucia? It is briliant to get things going, but it comes with "adapters" and "middleware" which add an extra layer of "FP creativity". It also does not have much.

- Everything is still horrid and too low level. Generic types, rules of hooks, missing provider context, suspense pending stuff, "npm run dev" vs "npm run build". How does any of this help to build a form that gathers data and sends it to the server? Notice that this repo is just about "npm run dev" and SQLite runs in memory.

- Youtube programming video selection filter: Remove affiliated ones promoting sponsored 3rd party hell, and those who mostly promote their obsolete paid courses or jump from topic to topic superficially. Remove anything with good, but sadly obsolete tech: Countless old and new videos on Js, Douglas Crockford circa 2010, MERN, Next.js with pages or without them, SvelteKit, most of React too. Anything touching serverless with no payment caps and no real DDoS protection by default, AWS, GCP, Cloudflare, Vercel... Remove OO/FP architects and astronauts, type theorists, Zig, Rust, 10x engineering. Remove anything that does not document a complete product that has a purpose.  

## ChatGPT

It is extremely helpful, makes programming great again ;). It is not so good with:

- Configuration (logic and creativity will be done by machines, we will slave around broken paths and config mess). 

- Authentication (too big of a code, reaching stuff outside TypeScript).

- Styling (demands a lot of micromanagement, at best). 

- You have to know what to ask and make sure the answers fit into single-page chunks.

- The whole world is now using OpenAI servers, the load is unbearable at times.

Notice that even ChatGPT 3.5 is amazing, the only problem is that it somewhat pushes one to use vanilla Js/Ts when we kind of live in the era of React and UI libs. 

Web Dev Cody and some other gurus claim that the biggest impact so far in web development comes from Wordpress and "no code" solutions, not ChatGPT.

## Conclusions, or Even More Questions

1. I believe TypeScript, Vite, React, Tailwind present a certain progress over vanilla Js. They allow to pass around readable HTML with CSS and code in the syntax of JSX/React, not just references to some HTML ids. These are good ideas.

2. This progress is obscured by a huge mess created with metaframeworks which do not even solve authentication, emails, messaging, hosting. Instead, they only aim for routing, prerendering, and some kind of a "typed easier REST", solving none of this too well either. 

3. A lot of future directions, but no clear winner. Go for the newest Next.js and embrace evolving 3rd party mess without reliability? Or use the newest Next.js with something manual [Lucia v3 based](https://www.youtube.com/@ugurcodes/videos)? Stick to minimal frontend React with a non-TypeScript-based backend that has solved at least authentication? 

4. MERN is out of the equation because it has not solved authentication, and it is even slower than metaframeworks. Anything else Node.js related lacks critical mass, unless it is Next.js.

5. Which classical backend framework has the most tested complete modern authentication solution which is also free and open source, and used massively, and ideally written in a static language? If it does not exist, should I attempt to write one, in, say, Go? Or move on with, say, Clerk and Next.js? Go is not ideal, and it lacks critical mass too.

6. If only we could come up with the editor like Blender in computer graphics or Unity/Unreal in computer games...

7. None of this worried Thibault Duplessis of lichess.org fame. He built a needed service with [Scala and Js](https://lichess.org/source). It takes [$420K/year to run](https://www.reddit.com/r/datasets/comments/s5dwdd/cost_breakdown_to_run_a_chess_website_it_takes/) nowadays, donation-based. It is amazing what one can do with a variable and a simple for loop.

## Useful References

1. [Web Dev Cody: How much money did my channel earn this year. youtube, 2024](https://www.youtube.com/watch?v=qwXvW_fN_9k)

2. Lichess.org: [The Tech Stack](https://lichess.org/source), [Server Costs](https://docs.google.com/spreadsheets/d/1Si3PMUJGR9KrpE5lngSkHLJKJkb0ZuI4/preview)

2. [Web Dev Cody: How do server side authentication sessions work (express & cookies). youtube, 2023](https://www.youtube.com/watch?v=BgsQrOHNKeY&t=6s)

3. [Diona Rodrigues: Fetch API, do you really know how to handle errors? dev.to, 2023](https://dev.to/dionarodrigues/fetch-api-do-you-really-know-how-to-handle-errors-2gj0)

4. [Austin Shelby: react-hook-form and zod. youtube, 2022](https://www.youtube.com/watch?v=4zt1eadehKQ)
