FROM python:3.10.6-slim-buster

#WORKDIR /home/app

#COPY requirements.txt requirements.txt
#RUN pip install -r requirements.txt

#COPY . .

#CMD python app.py

#FROM tiangolo/uwsgi-nginx-flask:flask

WORKDIR /home/app

RUN apt-get update && apt install -y build-essential libpq-dev python3-dev
RUN apt-get -y install tk-dev

# copy over our requirements.txt file
# COPY requirements_for_docker.txt /tmp/
COPY requirements.txt /tmp/
# COPY latest_packages_2.txt /tmp/

# upgrade pip and install required python packages
RUN pip install -U pip
RUN pip install psycopg2-binary

# RUN pip install -r /tmp/requirements_for_docker.txt
RUN pip install -r /tmp/requirements.txt
# RUN pip install -r /tmp/latest_packages_2.txt

# RUN pip install flask-jwt-extended
# RUN pip install Werkzeug==2.1.2

# copy over our app code
# COPY . .

# set an environmental variable, MESSAGE,
# which the app will use and display
ENV DB_USERNAME ""
ENV DB_PASSWORD ""
ENV SECRET_KEY ""
ENV SALT ""
ENV DB_IP ""

#RUN mkdir -p /home/app/profile_pics

EXPOSE 5001

#CMD ["flask","run", "--host=0.0.0.0", "--port=5000"]
CMD ["python3","app.py"]
#CMD ["sleep", "infinity"]
