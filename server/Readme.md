# Get Started

## Setup env details

Create `.env` and put this code in the file

```
PORT=8000
NODE_ENV=development
OPEN_WHETHER_API_KEY=63474f55bf609b514ec5fa015b6ab705
DB_DIALECT=mysql
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=your_db_username
DB_PASSWORD=your_db_password
DB_NAME=your_db_name

```

## Migrate Databse

```
npm run db:migrate
```

## How to run

inside main directory

Install dependencies

```
npm i
```

then start the project

```
npm run dev
```

create build

```
npm run build
```

## Running test

Make sure the api is running with `npm run dev`.

```
npm run test
```
