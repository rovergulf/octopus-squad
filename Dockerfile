FROM node:latest as build

RUN apt-get install -y git

RUN npm install -g @angular/cli

RUN npm version
RUN ng version

WORKDIR /build
ADD . /build

RUN npm install
RUN npm run build:ssr
# RUN npm run generate:prerender
#RUN npm run test:ssr

FROM node:alpine

WORKDIR /app

COPY --from=build /build/dist /app/dist
COPY --from=build /build/package.json /app

# Serve the app
CMD ["npm", "run", "serve:ssr"]
