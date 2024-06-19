FROM node:18.19
WORKDIR /app
COPY . ./
#RUN npm install --legacy-peer-deps
#RUN rm -rf package-lock.json
RUN npm install --legacy-peer-deps
RUN npm install -g @angular/cli
RUN npm install jquery popper.js
#RUN ng version
CMD ["ng", "serve", "--host", "0.0.0.0", "--port", "4200", "--disable-host-check"]

