<!-- # React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh
 -->

 # MINI BLOG

A Full Stack React Blog CRUD Application with Appwrite as Backend Service

 ## Features

 - User Authorization with Name, Email, Password 
    - SignUp [Create User]
    - Login [Session start]
 - Post with Title, Content, Image
    - Create [Add Post]
    - Read [View Post]
    - Update [Edit Post]
    - Delete [Delete Post]
 - Querying
    - View posts of logged in user, by 'status' as index
    - Search by keywords [Addable]
 - Paginaton
---
- [x] Responsive Website
- [x] Dark Mode
- [x] Show Date and sort reverse?
- [x] Routing - Config Based Routing
- [x] Page Protection - Prohibit access to certain pages for Logged in User and Logged Out User. 
- [x] Status Toggle
- [x] Preload Editor 
- [x] No slug, wrong slug - error cases
- [x] Loading animation during AJAX events
- [x] Session checking before application launch - FIX THIS - If no session, then getUser throws error due to 'no scope for guest role'

## Libraries Used
- Appwrite [For Backend Services - Auth, Database, Bucket]
- Redux [For state management of user data]
- Tiny MCE [For Real Time Editor]
- HTML Parser [For parsing HTML stored from RTE]
- React Hook Form [For creating post]
- React Router [For subrouting and navigations]
- TailwindCSS, PostCSS [For CSS]
- Framer Motion [For page transitions]