# Project Structure

Most of the code lives in the `src` folder and looks like this:

```sh
public                   # public folder can contain all the static files such as images, fonts, etc.
src
|
+-- app                     # application layer containing:
|   |                       # this folder might differ based on the meta framework used
|   +-- error-handling      # application error handling logic for both api and client server errors
|   +-- routing             # application routes / can also be pages
        |
        +-- routes          # will include the routing files for both authenticated and non authenticated scenario
        +-- layouts         # will contain the different layouts e.g(navbar,footer,..etc) for each situation
        +-- main.ts         # will contain the routing system configurations
        +-- middleware.ts   # will intercept routing requests and handle authorization, storing visited routes and other necessary logic

|   +-- app.tsx             # main application component, will contain all the necessary providers wrapped
|   +-- router.tsx           # application router configuration
|
+-- components               # shared components used across the entire application
|
+-- config                   # global configurations, exported env variables etc.
|
+-- pages                   # page based modules
|
+-- hooks                   # shared hooks used across the entire application
|
+-- store                   # global state stores
|
+-- testing                 # test utilities and mocks
|
+-- types                   # shared types used across the application
|
+-- utils                   # shared utility functions

```

For easy scalability and maintenance, organize most of the code within the pages folder. Each page folder should contain code specific to that page, keeping things neatly separated. This approach helps prevent mixing page-related code with shared components, making it simpler to manage and maintain the codebase compared to having many files in a flat folder structure. By adopting this method, you can enhance collaboration, readability, and scalability in the application's architecture.

A page could have the following structure:

```sh
src/pages/smth-page
|
+-- api         # exported API request declarations and api hooks related to a specific page
|
+-- assets      # assets folder can contain all the static files for a specific page
|
+-- components  # components scoped to a specific page
|
+-- hooks       # hooks scoped to a specific page
|
+-- stores      # state stores for a specific page
|
+-- types       # typescript types used within the page
|
+-- utils       # utility functions for a specific page

```

_Rules have been applied to check if any page is importing any component or api from another component_

---

# Project Rules

1- This project is following the unidirectional rule which means that the code should flow in one direction, from shared parts of the code to the application (shared -> features -> app). This is a good practice to follow as it makes the codebase more predictable and easier to understand.

the following is a diagram demonstrating the flow:

![Unidirectional Codebase](unidirectional-codebase.png)

2- for commit messages the following rules have been made to ensure that each commit is specific and easer to review and know the scope of it:

- each commit should start with a type like:
  ['feat', 'fix', 'docs', 'chore', 'style', 'test', 'refactor'],
- each commit should have a scope after the type encapsulated between two braces () and they should reflect the feature/page that the commits are related too , like this [ 'setup','config'
  'dashboard',
  'profile',
  'login',
  'editor',
  'api',
  'store',
  'landing',] .
  the using of setup and config are related to the project settings and packages configurations.
- the title shouldn't be more than 100 char max
- a blank line should proceed the body of the commit.
- each task finished please commit it so the commit doesn't have a lot of intangible files with a lot tasks finished
- `e.g feat(dashboard): created the project details component`
- `e.g feat(api): created the dashboard service`
- `e.g docs(dashboard): wrote the documentation for the dashboard hooks`

3- Prettier as a package is used to maintain a common code structure
