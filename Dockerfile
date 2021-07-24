# Base Layer
FROM node:14.17.0-slim AS base
RUN apt-get update && apt-get upgrade -y
RUN apt-get install libssl-dev -y
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile
COPY . .
RUN yarn codegen
RUN yarn build
#EXPOSE 3000
#CMD ["yarn", "start"]

## Production Run Layer
FROM node:14.17.0-slim
RUN apt-get update && apt-get upgrade -y
RUN apt-get install libssl-dev -y
WORKDIR /app
ENV NODE_ENV=production
COPY package.json yarn.lock ./
RUN yarn --frozen-lockfile --production

COPY . .
RUN ./node_modules/.bin/blitz prisma generate
COPY --from=base /app/.next ./.next
COPY --from=base /app/.blitz ./.blitz

EXPOSE 3000
CMD ["./node_modules/.bin/blitz", "start"]
