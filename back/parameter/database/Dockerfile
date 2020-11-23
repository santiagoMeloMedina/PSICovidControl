FROM mongo:latest

ENV MONGO_INITDB_ROOT_USERNAME admin
ENV MONGO_INITDB_ROOT_PASSWORD admin
ENV MONGO_INITDB_DATABASE ParameterDB
ENV HOST localhost
ENV PORT 27017
ENV DATA dataset.csv

COPY start.py ./start.py
COPY dataset.csv ./dataset.csv

RUN apt-get update && apt install nano -y && apt install python3 -y && apt install python3-pip -y
RUN pip3 install pymongo==3.11.0

ADD start.sh /docker-entrypoint-initdb.d/