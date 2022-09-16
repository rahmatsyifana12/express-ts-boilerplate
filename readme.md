## Getting Started
1. Make sure you have installed [Yarn](https://classic.yarnpkg.com/lang/en/), [Node.js](https://nodejs.org/en/) and [PostgreSQL](https://www.postgresql.org/download/).
2. Clone the repo
   ```
   git clone https://github.com/rahmatsyifana12/express-ts-boilerplate.git
   ```
3. Install the dependencies
   ```
   yarn
   ```
4. Duplicate the `.env.example` file to `.env` and fill the database credentials and the server port.
5. Generate JWT secrets
   ```
   yarn jwt:generate
   ```
6. Run the development server
   ```
   yarn dev
   ```