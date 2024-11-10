FROM ubuntu

COPY requirements.txt /var/requirements.txt
RUN apt update
RUN apt install -y apt-utils vim curl apache2 apache2-utils
RUN apt -y install python3 libapache2-mod-wsgi-py3
RUN apt -y install python3-pip
RUN pip3 install -r /var/requirements.txt --break-system-packages
ADD ./site.conf /etc/apache2/sites-available/000-default.conf
RUN a2enmod ssl
EXPOSE 80 443
CMD ["apache2ctl", "-D", "FOREGROUND"]