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
EXPOSE 3000
CMD ["yarn", "start"]

## Production Run Layer
#FROM gcr.io/distroless/nodejs:14
#ENV NODE_ENV=production
#WORKDIR /app
#
##COPY package.json yarn.lock next.config.js ./
#COPY --from=base /build/public ./public
#COPY --from=base /build/.next ./.next
#COPY --from=base /build/.blitz ./.blitz
##COPY --from=base /build/node_modules ./node_modules
#
#EXPOSE 3000
#CMD ["yarn start"]
