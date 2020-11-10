
FROM python:3.6

WORKDIR /usr/src/app
COPY . .

RUN apt-get update && apt install vim -y
RUN pip3 install --no-cache-dir -r requirements.txt

CMD ["python3", "main.py"]