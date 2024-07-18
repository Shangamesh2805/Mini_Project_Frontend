# Video Store Management Web Application

## Overview

This is a Video Store Management Web Application developed using ASP.NET Core. The application allows users to manage video inventories, handle user authentication and authorization, and facilitate video orders. The project includes functionalities for both normal and golden membership users, as well as an admin dashboard for managing videos.

## Features

- User authentication and authorization using JWT tokens.
- Video cataloging with various genres and formats.
- User roles: Normal User and Golden Membership User.
- Admin dashboard for video management.
- Add to cart and order functionalities.
- Responsive design using Bootstrap.

## Project Backend Structure

VideoStoreManagement/
│
├── Controllers/
│ ├── AccountController.cs
│ ├── VideoController.cs
│ └── OrderController.cs
│
├── Models/
│ ├── User.cs
│ ├── Video.cs
│ ├── Order.cs
│ ├── OrderDetails.cs
│ ├── Cart.cs
│ └── CartItem.cs
│
├── Views/
│ ├── Account/
│ ├── Video/
│ └── Order/
│
├── wwwroot/
│ ├── css/
│ ├── images/
│ ├── js/
│ │ ├── add-video.js
│ │ ├── fetch-videos.js
│ │ └── publisher.js
│
├── appsettings.json
├── Program.cs
└── Startup.cs


## Setup Instructions

1. **Clone the repository:**

    ```bash
    git clone https://github.com/yourusername/VideoStoreManagement.git
    cd VideoStoreManagement
    ```

2. **Install the necessary packages:**

    ```bash
    dotnet restore
    ```

3. **Setup the database:**

    Update the connection string in `appsettings.json` file and run the following command to apply migrations:

    ```bash
    dotnet ef database update
    ```

4. **Run the application:**

    ```bash
    dotnet run
    ```

    The application will be available at `http://localhost:5000`.

## API Endpoints

- **Account**
  - `POST /api/account/register` - Register a new user.
  - `POST /api/account/login` - Login a user.
  
- **Video**
  - `GET /api/video/get_allvideos` - Get all videos.
  - `POST /api/video/add` - Add a new video.
  
- **Order**
  - `POST /api/order/create` - Create a new order.
  - `GET /api/order/get_orders` - Get all orders.

## Frontend Pages

- **Home Page (`index.html`):** The landing page for the application.
- **Profile Page (`profile.html`):** Displays user profile information.
- **Cart Page (`cart.html`):** Shows the items added to the cart.
- **Admin Dashboard (`dashboard.html`):** Admin interface for managing videos.
- **Add Video Page (`new-video.html`):** Form to add a new video to the catalog.

## JavaScript Files

- `add-video.js`: Handles the form submission for adding a new video.
- `fetch-videos.js`: Fetches and displays videos in the admin dashboard.
- `publisher.js`: Manages the display and functionality of the publisher interface.

## Contributing

If you want to contribute to this project, follow these steps:

1. Fork the repository.
2. Create a new branch.
3. Make your changes and commit them.
4. Push your changes to the branch.
5. Create a pull request.


---

Feel free to contribute to this project and enhance the Video Store Management experience!


