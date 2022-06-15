FROM node:14
RUN mkdir -p /App
WORKDIR /App
COPY . .
RUN yarn install
EXPOSE 3000
CMD ["yarn", "start"]
