<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
 -->

 # MINI BLOG

A Full Stack React Blog CRUD Application with Appwrite as Backend Service

 ## Sample Login Dataset
 - Email : shuaibaa@gmail.com
 - Password : abcdefgh

 ## Features

 - User Authentication with Name, Email, Password 
    - SignUp [Create User]
    - Login [Session start]
    - < Credential Update [Addable] >
 - Post with Title, Content, Image
    - Create [Add Post]
    - Read [View Post]
    - Update [Edit Post]
    - Delete [Delete Post]
 - Querying
    - Toggle by Status - Active and Inactive Posts
    - < Search Field - search by keywords [Addable] >
 - Paginaton
    - < Limit posts to 12 in a single page [Addable] >   
---
- [x] Responsive Website
- [x] Minimal page transitions
- [] Dark Mode
- [] Lazy Loading Images
- [] Show created and updated date and sort by date
- [x] Toggle Footer to being Fixed at bottom of Viewport.
- [] Add popups for successful edit, add, delete, login, logout
- [x] Routing - Config Based Routing
- [] Page Protection/ Authorization - RBAC - Role Based Access Control
- [x] Status Toggle
- [] Preload Editor before page loads
- [x] No slug, wrong slug - error cases
- [x] Loading animation during asynchronous events
- [x] Session checking before application launch 

## Libraries Used
- Appwrite [For Backend Services - Auth, Database, Bucket]
- Redux [For state management of user data]
- Tiny MCE [For Real Time Editor]
- HTML Parser [For parsing HTML stored from RTE]
- React Hook Form [For creating post]
- React Router [For subrouting and navigations]
- TailwindCSS, PostCSS [For CSS]
- Framer Motion [For page transitions]