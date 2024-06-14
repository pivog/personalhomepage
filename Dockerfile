FROM ubuntu

COPY requirements.txt /var/requirements.txt
COPY /etc/letsencrypt/live/ivoplaninic.net/fullchain.pem /var/fullchaim.pem
COPY /etc/letsencrypt/live/ivoplaninic.net/privkey.pem /var/privkey.pem

RUN apt-get update
RUN apt-get install -y apt-utils vim curl apache2 apache2-utils
RUN apt-get -y install python3 libapache2-mod-wsgi-py3
#RUN ln /usr/bin/python3 /usr/bin/python
RUN apt-get -y install python3-pip
#RUN ln /usr/bin/pip3 /usr/bin/pip
RUN pip3 install --upgrade pip --break-system-packages
RUN pip3 install -r /var/requirements.txt --break-system-packages
ADD ./site.conf /etc/apache2/sites-available/000-default.conf
EXPOSE 80 443
CMD ["apache2ctl", "-D", "FOREGROUND"]