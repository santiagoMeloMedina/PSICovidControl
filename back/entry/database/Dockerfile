FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD admin
ENV MONGO_INITDB_DATABASE EntryDB
ENV HOST localhost
ENV PORT 27017

COPY start.py ./start.py

RUN apt-get update && apt install nano -y && apt install python3 -y && apt install python3-pip -y
RUN pip3 install pymongo==3.11.0

ADD start.sh /docker-entrypoint-initdb.d/