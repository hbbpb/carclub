FROM mhart/alpine-node:0.10

MAINTAINER Neo Li <hbbpbb@gmail.com>

COPY . /app/
RUN cd /app && npm install --production

ENV NODE_ENV production
ENV PORT 3000

EXPOSE 3000

#start server
CMD ["node", "/app/app"]