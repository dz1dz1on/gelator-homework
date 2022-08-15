FROM mcr.microsoft.com/playwright:v1.25.0-focal
ARG API_KEY

USER root 

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm ci

COPY ./docker-env-script.sh ./
RUN chmod 755 entrypoint.sh
RUN ./docker-env-script.sh
#TODO: add builded docker image to the container repository.
#In the CI copy tests on builded docker with playwright
COPY . .

RUN chmod 755 entrypoint.sh

ENTRYPOINT ["./entrypoint.sh"]