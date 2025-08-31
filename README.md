# MongoDB Distributed URL Requester

A distributed URL processing worker system built with TypeScript and MongoDB. Processes URLs safely in parallel using atomic job claiming.

## Quick Start

1. Clone the repository:
```bash
git clone git@github.com:DantsevichIvan/mongo-distributed-requester-ts.git
cd mongo-distributed-requester-ts
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp env.example .env
```
Edit .env and provide correct values, for example:
Environment variables (see `env.example`):

- `MONGO_URI`: MongoDB connection string
- `CONCURRENCY`: Number of parallel workers per process (default: 5)
- `REQUEST_TIMEOUT_MS`: HTTP request timeout in milliseconds (default: 30000)
- `STALE_MS`: Time after which a PROCESSING job is considered stale (default: 300000)
- `IDLE_SLEEP_MS`: Sleep time when no jobs are available (default: 1000)
- `MAX_ATTEMPTS`: Maximum number of processing attempts per job (default: 3)
- `LOG_LEVEL`: Logging level (default: info)

4. Seed the database with sample URLs:
```bash
npm run seed
```

5. Start the worker

   For development:
```bash
npm run dev
```
   Or run built JavaScript:
```bash
npm run build
npm run start:worker
```
