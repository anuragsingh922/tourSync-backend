# **TourSync Backend**

## **Project Overview**

**TourSync** is a comprehensive travel platform backend developed as part of an internship assessment for **Exploro Club**. This backend powers the platform by managing trip data, user information, and payment processes, ensuring seamless integration with the frontend to deliver an excellent user experience.

---

## **Requirements**

To run the **TourSync** backend, ensure the following dependencies are installed:

- **Node.js**: Version 16.x.x or higher
- **npm**: Version 9.x.x or higher
- **MongoDB**: Version 5.x.x or higher

---

## **Setup Instructions**

Follow these steps to get the project up and running locally:

1. **Clone the repository**:

   ```bash
   git clone https://github.com/anuragsingh922/tourSync-backend.git
   ```

2. **Install dependencies**:

   Navigate to the project directory and install the required packages:

   ```bash
   npm install
   ```

3. **Set up environment variables**:  
   Create a `.env` file in the root directory with the following variables:

   ```env
   PORT=8081
   MONGODB_URI=<your_mongo_db_connection_string>
   JWT_SECRET=<your_jwt_secret_key>
   PAYMENT_GATEWAY_KEY=<your_payment_gateway_key>
   ```

   **Note**: The `.env` file is already present in the repository for evaluation purposes, so you don't need to add it manually.

4. **Start the application**:

   Run the application with the following command:

   ```bash
   node app.js
   ```

---

## **Features**

### **Session Management**
- **JWT Tokens** and **Refresh Tokens** are used for secure session management, ensuring user authentication and authorization.

### **Organizer Features**

1. **Post Trips**:  
   Organizers can create new trips by sending detailed information (e.g., name, description, price, images) via API endpoints.

2. **Edit Trips**:  
   Organizers can update trip details through API requests, with necessary authorization.

3. **Delete Trips**:  
   Organizers can delete trips via secure API calls.

### **User Features**

1. **Browse Trips**:  
   Users can view all available trips from the database, filtered by categories or search queries.

2. **Add to Cart**:  
   Users can store their selected trips in a cart collection associated with their account.

3. **Payment Integration**:  
   Secure payment processing is handled via integrated payment gateway APIs.

4. **Manage Booked Trips**:  
   Users can view and manage their booked trips, with details stored in the database.

5. **Trip Cancellation**:  
   Users can cancel their booked trips, with cancellation policies applied as per specifications.

---

## **API Endpoints**

### **Landing Page APIs**

- **GET /trips**  
  Fetches all available trips for the frontend to display.

### **Trips APIs**

- **POST /trips** (Organizer only)  
  Allows organizers to create new trips.

- **PATCH /trips/:tripID** (Organizer only)  
  Allows organizers to update details of an existing trip.

- **DELETE /trips/:tripID** (Organizer only)  
  Deletes a trip based on its ID.

### **Cart APIs**

- **POST /cart**  
  Adds selected trips to the user's cart.

- **GET /cart**  
  Retrieves the user's current cart items.

### **Booked Trips APIs**

- **POST /booked-trips**  
  Processes the trip booking and payment.

- **GET /booked-trips**  
  Retrieves all trips booked by the user.

- **DELETE /booked-trips/:tripID**  
  Cancels a booking based on the trip ID and applies cancellation policies.

### **Authentication APIs**

- **POST /auth/register**  
  Registers a new user.

- **POST /auth/login**  
  Authenticates a user and generates a JWT token.

- **POST /auth/verify**  
  Authenticates a user using a token from the cookie.

- **POST /auth/logout**  
  Logs the user out by removing the authentication cookie.

---

## **Technologies Used**

- **Node.js**: Backend server development.
- **Express.js**: HTTP request handling and routing.
- **MongoDB**: Primary database for storing trip, user, and booking data.
- **JWT (JSON Web Tokens)**: For secure user authentication and session management.
- **Payment Gateway API**: For handling secure online payment processing.

## **Contributing**

If you'd like to contribute to **TourSync Backend**, follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Make your changes and commit them (`git commit -am 'Add a feature'`).
4. Push your branch to your forked repository (`git push origin feature/your-feature`).
5. Open a pull request in the original repository.