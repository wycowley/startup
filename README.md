# Drop a Memory

[My Notes](notes.md)

Drop a Memory is an online guest book for your home, allowing visitors to leave memories of their visit.

## 🚀 Specification Deliverable

> [!NOTE]
> For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] Proper use of Markdown
-   [x] A concise and compelling elevator pitch
-   [x] Description of key features
-   [x] Description of how you will use each technology
-   [x] One or more rough sketches of your application. Images must be embedded in this file using Markdown image references.

### Elevator pitch

It's important to remember. Remember past experiences, past conversations, past friends. Yet despite this, in our hustle and bustle, in our busy daily lives, we often don't have the time or don't make the effort to record these small, important moments. But our homes can show small snapshots of our lives. That's where Drop A Memory comes in. Home owners post a QR code or url in their home, which links to their personal Drop A Memory room. Visitors take 30 seconds to visit the website to leave a small description of their activities (to drop a memory), creating a living record of all the visitors, memories and experiences in the home.

### Design

![Design image](pictures/design.png)

1. Login page (on the left)
2. Main page with memories
3. Memory submission page

### Key features

-   Create an account to start your personal room as the admin
-   Login to your personal account through HTTPS
-   Ability for admin to delete specific memories
-   Access any user's room with their personal url
-   View all memories left by past visitors
-   Add new memories which are stored in a database
-   See memories update in real time

### Technologies

I am going to use the required technologies in the following ways.

-   **HTML** - I will use HTML to create the structure of the application. It will have 3 main pages, one for login, one for viewing memories, and one for adding a memory.
-   **CSS** - I will use CSS to style the application and make it mobile and desktop friendly, with a modern responsive design.
-   **React** - I will use React to add responsive functionality and to handle the website routing. I will use it to submit API requests and automatically hot-refresh the screen when new information is received. I will use React Router to direct users from page to page, and route parameters to bring users to a specific room without having to login.
-   **Service** - Backend service that includes endpoints to:
    -   `create account` - which creates a new room.
    -   `login` - which routes a user to their personal room and sets them as an admin.
    -   `add memory` - which adds a new memory to the database.
    -   `remove memory` - which removes an existing memory from the database.
    -   `retrieve image` - which calls UnsplashAPI to help users search and select a stock image that represents the memory being described.
-   **DB/Login** - The database would likely have two tables - one for users and one for memories. Each memory row would store a timestamp, name, description, optionally a photo url, and the username to link the memory to the correct room.
-   **WebSocket** - I will use WebSockets so that all users connected can instantly see changes made to the database, including memories added or memories removed.

## 🚀 AWS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **Server deployed and accessible with custom domain name** - [My server link](https://yourdomainnamehere.click).

## 🚀 HTML deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **HTML pages** - There are 4 HTML pages. Index, where one starts, create room (to create a room), room (to view memories), and drop memory (to add a memory).
-   [x] **Proper HTML element usage** - I used a variety of HTML tags, like buttons, imgs, inputs with various types, h1s, navs, etc.
-   [x] **Links** - There should be links to direct people to all of the correct pages.
-   [x] **Text** - There's text to prompt users what to do.
-   [x] **3rd party API placeholder** - I have a part in the drop a memory page that lets you search for an image, which will call a 3rd party API to let you actually be able to select an image.
-   [x] **Images** - I displayed two images as part of the memories.
-   [x] **Login placeholder** - There is a placeholder to login and to create the account that right now just routes you to the correct pages and displays "User" instead of anything else.
-   [x] **DB data placeholder** - There is a placeholder for where the real memories will go, it has two example events.
-   [x] **WebSocket placeholder** - There is a placeholder for where the admin will be able to delete memories, which will make it realtime update for everyone else on the page.

## 🚀 CSS deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **Header, footer, and main content body** - I styled all of these elements and put reused css into `assets.css` so I could easily import it and not have long css files.
-   [x] **Navigation elements** - I styled the navigation elements and centered them
-   [x] **Responsive to window resizing** - I made the majority of the elements responsive, there weren't too many adjustments needed for mobile.
-   [x] **Application elements** - Styled all of the applications elements, and used CSS variables to make it easy to change the color scheme.
-   [x] **Application text content** - I styled the text content and changed the font and font-size
-   [x] **Application images** - I styled the application images and fixed them to be a 1 to 1 aspect ratio so they scale well

## 🚀 React part 1: Routing deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **Bundled using Vite** - I bundled everything via Vite and React is working well
-   [x] **Components** - I created components for all of the other pages that I used to have, like createroom, dropmemory, room, and login
-   [x] **Router** - I added NavLinks and Routes to route between all of the different places. The header and footers are always rendered

## 🚀 React part 2: Reactivity deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **All functionality implemented or mocked out** - All functionality is implemented, although some parts are mocked out and all of the data is stored in localStorage for now
-   [x] **Hooks** - I used hooks like useState, useEffect, and useRef to manage state and side effects

## 🚀 Service deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

I changed some of the functionality of my app with this deliverable. For example, now rooms are deliminated by username and room name, and a user can have multiple rooms that they can create and look at at the new "Browse Rooms" page.

If a user is logged in and viewing their own room, they are able to delete memories. If a room is set up as private, only the owner can add memories. Otherwise, anyone can add memories to a room.

In the navigation bar, you need to type in the username and room name to go to a specific room (such as "username/roomname"). You can also click the "Browse Rooms" button to see all of your rooms and visit them. That Browse Rooms and Logout button only appear when you are logged in.

-   [x] **Node.js/Express HTTP service** - I did this part of the deliverable.
-   [x] **Static middleware for frontend** - Frontend is served by Express.
-   [x] **Calls to third party endpoints** - A call to the Pexels API in DropMemory where you can search for what image to add.
-   [x] **Backend service endpoints** - I have many backend service endpoints for authentication and getting user data.
-   [x] **Frontend calls service endpoints** - No data is stored in localStorage and instead goes and calls the API.
-   [x] **Supports registration, login, logout, and restricted endpoint** - I have registration, login, and logout working with the cookies. I didn't use a middleware function for restricting endpoints, because not all endpoints need to be restricted for my application (you can always view a person's room without logging in, for example). Instead I check in each endpoint that does require authentication whether the user is logged in and is the correct user for that endpoint.

## 🚀 DB deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **Stores data in MongoDB** - All data is stored in MongoDB now, no localStorage and no in-memory storage.
-   [x] **Stores credentials in MongoDB** - User passwords are stored in MongoDB and tokens are stored when a user is logged in.

## 🚀 WebSocket deliverable

For this deliverable I did the following. I checked the box `[x]` and added a description for things I completed.

-   [x] **Backend listens for WebSocket connection** - The backend makes WebSocket connections and broadcasts events to all connected clients.
-   [x] **Frontend makes WebSocket connection** - The frontend makes WebSocket connections in Room.jsx and DropMemory.jsx
-   [x] **Data sent over WebSocket connection** - I sent data such as the memoryId that was deleted or liked, the new number of likes, or the new memory that was added.
-   [x] **WebSocket data displayed** - When an admin deletes a memory, when a memory is added, or when someone likes a memory, all users viewing that room see the update in real time
-   [x] **Application is fully functional** - Everything works now! I just want to polish a few UI things and then it should be 100% good to go.
