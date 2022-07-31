FROM node:18-alpine3.15 as build-stage

WORKDIR /usr/app

COPY . .

# RUN yarn -init y
RUN yarn

ENTRYPOINT ["yarn", "run", "dev"]
# RUN yarn run build

# FROM nginx:1.15

# COPY --from=build-stage /usr/app/build/ /usr/share/nginx/html

# # Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf