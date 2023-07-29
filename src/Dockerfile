FROM node:18-alpine AS base

RUN npm install -g pnpm

FROM base AS dependencies

WORKDIR /app
COPY ./package.json ./pnpm-lock.yaml ./
RUN pnpm install

FROM base AS build

WORKDIR /app
COPY . .
COPY --from=dependencies /app/node_modules ./node_modules
RUN npx nest build
RUN pnpm prune --prod

FROM base AS deploy

WORKDIR /app
COPY --from=build /app/dist ./dist
COPY --from=build /app/node_modules ./node_modules
COPY --from=build /app/.env ./.env

EXPOSE $APP_PORT
HEALTHCHECK CMD curl --fail http://localhost:$APP_PORT || exit 1

ENTRYPOINT [ "node", "dist/main.js" ]