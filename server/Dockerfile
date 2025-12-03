FROM node:20.9.0-slim

RUN apt-get update -y && apt-get install -y openssl

RUN mkdir -p /home/node/app && chown -R node:node /home/node/app

WORKDIR /home/node/app

# Copy package manifests and install dependencies using yarn
COPY package.json yarn.lock ./
# Allow yarn to update lockfile during image build if package.json changed
RUN yarn install --production=false

# Copy rest of the app
COPY . .

# Generate Prisma client (if present)
RUN yarn generate || true

# Ensure prisma artifacts are readable (if they exist)
RUN chown -R node:node /home/node/app/node_modules/.prisma || true

USER node

EXPOSE 3001

CMD ["yarn", "dev"]

# para a documentação seguida para construção desse arquivo, vá para o step 3 do link:
# https://www.digitalocean.com/community/tutorials/como-construir-uma-aplicacao-node-js-com-o-docker-pt