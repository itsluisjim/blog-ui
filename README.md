# BlogAway - Angular Frontend
**Project Goal:**
The goal of this project was to build an front-end application that consumes a REST API developed using Node.js, Express, and MongoDB. The frontend application would provide a user-friendly interface for interacting with the API's functionalities, such as authentication, CRUD operations, and data visualization.

Blog API - <a href="https://github.com/itsluisjim/blog-api">View repo</a>

**Technology Used:** 
- Angular
  - SCSS
  - HTML
  - Typescript
 
<img width="1466" alt="Screenshot 2024-04-18 at 2 11 18 PM" src="https://github.com/itsluisjim/blog-ui/assets/105807191/b858f5d0-2239-4015-8561-c407483ea367">

 
## Key Features:

- **Authentication and Authorization:**
The front-end application integrates with the API's JWT-based authentication and authorization system, allowing users to register, log in, and manage their user profiles.
Route guarding is implemented to protect specific routes and components based on the user's authentication and authorization status.

- **CRUD Operations:**
The front-end application provides intuitive interfaces for performing CRUD operations on various resources, such as products, orders, and users. These interfaces are connected to the corresponding API endpoints.
Services are created to handle API interactions, encapsulating the logic for fetching, creating, updating, and deleting data.

- **Data Visualization:**
The application includes data visualization components, such as charts and graphs, to display relevant information from the API in an easily consumable format.

- **Reusable Components:**
The project features the creation of reusable components, which can be composed to build the application's user interface. These components encapsulate specific functionality and can be easily shared across the application.

- **Conditional Rendering:**
The application utilizes conditional rendering techniques to dynamically show or hide UI elements based on the user's authentication status, role, and other application states.

- **Role-based Guards:**
The project includes the implementation of custom guards that control access to routes and components based on the user's role. This ensures that users can only access the functionality they are authorized to use.

- **Error Handling and Notifications:**
The front-end application includes robust error handling mechanisms, providing clear and informative error messages to users. It also incorporates notification systems to keep users informed about the status of their actions.

## Project Structure and Organization:
The Angular front-end project is structured in a modular and maintainable way, with the following key components:

- **Components:** Reusable UI elements that encapsulate specific functionality and can be composed to build the application's user interface.

- **Services:** Responsible for handling API interactions, data transformations, and other business logic.

- **Routing:** Handles the navigation and routing within the application, mapping URL paths to appropriate components.

- **Guards:** Implement route-level and component-level access control based on user authentication and authorization.

- **Shared Modules:** Contain common utilities, directives, pipes, and other reusable code that can be shared across the application.

## Future Work:
- Improve responsiveness
  
