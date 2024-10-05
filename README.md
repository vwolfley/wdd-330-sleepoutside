# wdd-330-sleepoutside

## Netlify Site Deployment

[![Netlify Status](https://api.netlify.com/api/v1/badges/9532fc66-09b3-48e4-af05-f8ff026717ee/deploy-status)](https://app.netlify.com/sites/sleepoutside-wdd330-team06/deploys)

[Sleep Outside](https://sleepoutside-wdd330-team06.netlify.app/)

## Description

Use this as a starting point to complete the WDD 330 team activity: the SleepOutside web application. It scaffolds out a simple web app with Vite support to bundle up our assets.

## Prerequisites

- You must have Node installed. visit https://byui-cit.github.io/advcss/lesson01/l01-software.html and skip to the Node section for instructions

## Setup

- `npm install`
- `npm run start` starts up a local server and updates on any JS or CSS/SCSS changes.

## Other commands

- `npm run build` to build final files when you are ready to turn in.
- `npm run lint` to run ESLint against your code to find errors.
- `npm run format` to run Prettier to automatically format your code.

### WDD 330 Team 06

#### Team Members

- Tara Bergener
- Colby MacArthur
- Moroni Ramos
- Vern Wolfley
- Ryan Worsham

## How to test a Pull Request locally before Merging

You have a new `Pull Request` and you don't want to merge it before testing it out yourself locally on your machine. This is one way you go about it?

The pull request is available on this git ref `pull/{ID}/head` which you can fetch using this, where `ID` is the pull `request id`.

Example - `vw--individual3 #18`  the #18 next to the pull request title is the ID.

Ensure your work tree is clean (you can do that by running `git status`)

Run the following commands to FETCH the pull request from GitHub where ID is the pull request's ID

`git fetch origin pull/ID/head && git checkout FETCH_HEAD`

At this point, you can do anything you want with this branch. You can run some local tests, or merge other branches into it, including master. Make modifications as you see fit!

Once satisfied run `git checkout master` to return to the master branch.
