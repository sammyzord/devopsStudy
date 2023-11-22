FROM denoland/deno:1.38.1 as base

WORKDIR /app

COPY deps.ts .

RUN deno cache deps.ts

COPY logger.ts .

RUN deno cache logger.ts

ADD . .

RUN deno cache index.ts

CMD ["deno", "run", "--allow-net", "--allow-read", "--allow-env", "--config", "deno.json", "index.ts"]

