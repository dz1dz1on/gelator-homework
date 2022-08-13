FROM mcr.microsoft.com/playwright:v1.25.0-focal

USER root 

WORKDIR /app

COPY package.json package-lock.json ./ 

RUN npm ci
#TODO: add builded docker image to the container repository.
#In the CI copy tests on builded docker with playwright
COPY . .

ENTRYPOINT ["./entrypoint.sh"]