FROM node:latest AS ng-builder
RUN mkdir -p /app
WORKDIR /app
COPY package.json /app
RUN npm install -g npm@7.8.0
COPY . /app
RUN $(npm bin)/ng build --prod

FROM nginx
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=ng-builder /app/dist/finansys /usr/share/nginx/html

EXPOSE 80