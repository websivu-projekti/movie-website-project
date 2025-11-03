FROM node:20

WORKDIR /usr/src/app

# Kopioi package.json ja + package-lock.json ensin (nopeampi cache npm installille)
COPY package*.json ./

RUN npm install -g nodemon && npm install

# Kopioidaan sovelluksen lähdekoodi
COPY . .

CMD ["npm", "start"]
