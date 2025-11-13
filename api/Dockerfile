FROM node:20

WORKDIR /usr/src/app

# Kopioidaan package.json ja package-lock.json ensin
COPY package*.json ./

# Asennetaan kaikki riippuvuudet (sis. node-fetch ja nodemon devDependency)
RUN npm install

# Kopioidaan koko lähdekoodi
COPY . .

# Käytetään nodemonia kehityksessä
CMD ["npx", "nodemon", "--legacy-watch", "src/index.js"]