# Text-Share

Website for text/code sharing.

![Screenshot from 2025-04-09 22-14-16](https://github.com/user-attachments/assets/93a6b67b-ed35-4e1c-b571-2ed175b5cec2)


## Introduction

Text-Share is a web application designed to facilitate the sharing of text and code snippets. The platform allows users to quickly share and access text/code snippets via a simple and intuitive interface.

## Techbase:

Frontend is built with React.js, while the backend is powered by Node.js and PostgreSQL. The application is containerized using Docker for easy deployment and scalability.

<img src="https://skillicons.dev/icons?i=react,nodejs,postgres,tailwind,docker,azure&theme=dark" alt="Tech Stack" />

## Frontend

- Frontend is built with React.js.
- UI includes a textbox for inputting text/code snippets, a button to
  share the snippet
- Link can be copied to clipboard or cn be scanner using a QR code.

## Backend

- Backend is built with Node.js and Express.
- It uses PostgreSQL as the database to store the snippets.
- Postgres Trigger are used to automatically delete snippets after a 100 Days

```sql
     CREATE OR REPLACE FUNCTION instance_delete_old_rows() RETURNS trigger
      LANGUAGE plpgsql
      AS $$
      BEGIN
        DELETE FROM Instance WHERE timestamp < NOW() - INTERVAL '100 days';
        RETURN NEW;
      END;
      $$;

      -- Trigger
      CREATE TRIGGER instance_delete_old_rows_trigger
      AFTER INSERT ON Instance
      FOR EACH ROW
      EXECUTE FUNCTION instance_delete_old_rows();
```

## Deployment

- Frontend is deployed on Vercel
- Backend is containerized using Docker for easy deployment and scalability.
- Both Postgres and Node is containerized using docker and images are deployed on Azure container registry and deployed on Azure virtual machine.

## Installation

To set up the Text-Share application locally, follow these steps:

1. **Clone the repository:**

   ```sh
   git clone https://github.com/Ryomensukuna2003/Text-Share.git
   cd Text-Share
   ```

2. **Install Frontend dependencies:**
   ```sh
   cd Frontend
   VITE_APP_URL='http://localhost:5173/' [Put this is frontend .env file]
   npm i && npm run dev
   ```
3. **Install Backend dependencies:**

   Make sure docker is installed and running

   ```sh
   cd Backend
   sudo docker-compose up --build
   ```

   After all this backend will be running on port 3000

4. **Set up PostgreSQL:**

- Ensure you have PostgreSQL installed and running.
- Create a database for the application.
- Put these in .env
  ```sh
    PORT=3000
    PASSWORD=postgres
    DB_USER=postgres
    HOST=db
    DATABASE=text_share
    DB_PORT=5432
    POSTGRES_USER=postgres
    POSTGRES_PASSWORD=postgres
    POSTGRES_DB=text_share
    POSTGRES_PORT=5432
    POSTGRES_HOST=db
  ```

## Usage

1. **Access the application:**

Open your web browser and navigate to `http://localhost:5173`.

# Todo

- [x] Dark Mode is not working
- [x] Dockerize the backend
- [x] GCP Deployment
- [x] Frontend finishing
- [x] Responsive Design
- [x] Moj masti
