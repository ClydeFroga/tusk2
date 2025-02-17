# Balance Web Application

Simple web application for managing user balance using Node.js, Express, and PostgreSQL.

## Prerequisites

- Node.js
- PostgreSQL
- Create a database named 'balance_db'

## Setup

1. Install dependencies:
```bash
npm install
```

2. Set config src/config for PostgreSQL

3. Start the application:
```bash
npm start
```

The application will automatically run migrations and create a user with an initial balance of 10000.

## API Endpoints

### Update Balance
- **URL**: `/update-balance`
- **Method**: POST
- **Body**:
  ```json
  {
    "userId": 1,
    "amount": 100,
    "operation" : "debit"
  }
  ```
- **Response**: Returns the new balance after the update

Note: Balance cannot go below 0.
