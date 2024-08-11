# create-svelte

Everything you need to build a Svelte project, powered by [`create-svelte`](https://github.com/sveltejs/kit/tree/main/packages/create-svelte).

## Creating a project

If you're seeing this, you've probably already done this step. Congrats!

```bash
# create a new project in the current directory
npm create svelte@latest

# create a new project in my-app
npm create svelte@latest my-app
```

## Developing

Once you've created a project and installed dependencies with `npm install` (or `pnpm install` or `yarn`), start a development server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

# Task Management Application

Welcome to the Task Management Application, a robust platform designed to help you organize and manage your tasks effectively. Built with SvelteKit, this application provides seamless user authentication, task prioritization, and a user-friendly interface.

## Features

- **User Authentication**: Secure sign-up and sign-in functionality to manage tasks individually.
- **Task Management**: Create, edit, and delete tasks with ease.
- **Task Prioritization**: Assign priority levels (low, medium, high) to tasks for better focus.
- **Search Functionality**: Quickly search through tasks using a dynamic search bar.
- **Responsive Design**: Enjoy a consistent user experience across devices.
- **Mock Database**: Demonstrative data handling for local development.

## Table of Contents

1. [Project Structure](#project-structure)
2. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running Locally](#running-locally)
   - [Building for Production](#building-for-production)
3. [Deployment](#deployment)
   - [Deploying to Vercel](#deploying-to-vercel)
4. [Customization and Extensions](#customization-and-extensions)
5. [Contributing](#contributing)
6. [License](#license)
7. [Acknowledgments](#acknowledgments)

## Project Structure

```plaintext
my-app/
├── src/
│   ├── routes/
│   │   ├── api/
│   │   │   ├── login/
│   │   │   │   └── +server.ts
│   │   │   ├── signup/
│   │   │   │   └── +server.ts
│   │   ├── tasks/
│   │   │   └── +page.svelte
│   │   ├── signin/
│   │   │   └── +page.svelte
│   │   └── signup/
│   │       └── +page.svelte
│   ├── lib/
│   │   ├── stores/
│   │   │   └── session.ts
│   │   ├── TodoColumn.svelte
│   │   ├── TodoCard.svelte
│   │   ├── TodoModal.svelte
│   │   └── TodoSearch.svelte
├── svelte.config.js
├── package.json
├── package-lock.json
└── .gitignore
