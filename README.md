
## Getting Started

First, for run the app

run this command first
```bash
docker build -t test/rent-a-car .
```

then run the container

```bash
docker run --name rent-a-car -p 3000:3000 -d test/rent-a-car
```

### Missing
* backend integration

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

