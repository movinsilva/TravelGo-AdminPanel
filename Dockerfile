FROM node:18 as build
WORKDIR /app
COPY . /app/
RUN npm install
RUN npm run build


FROM nginx:1.16.0-alpine
COPY --from=build /app/build /usr/share/nginx/html
RUN rm /etc/nginx/conf.d/default.conf
COPY nginx.conf /etc/nginx/conf.d 
EXPOSE 3000
CMD [ "nginx", "-g", "daemon off;"]