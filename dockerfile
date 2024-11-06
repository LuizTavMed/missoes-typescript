FROM node:20-alpine

WORKDIR /app/missao10 

COPY package*.json ./

# RUN npm install
RUN yarn install

COPY missao9 ./missao9


EXPOSE 3000

# CMD ["start", "yarn"]
CMD ["yarn", "run", "server"]