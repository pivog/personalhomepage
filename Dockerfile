FROM ubuntu

COPY requirements.txt /var/requirements.txt

RUN apt update
RUN apt install -y apt-utils vim curl apache2 apache2-utils libaugeas0
RUN apt -y install python3 libapache2-mod-wsgi-py3
#RUN ln /usr/bin/python3 /usr/bin/python
RUN apt -y install python3-pip
#RUN ln /usr/bin/pip3 /usr/bin/pip
RUN pip3 install --upgrade pip --break-system-packages
RUN pip3 install -r /var/requirements.txt --break-system-packages
ADD ./site.conf /etc/apache2/sites-available/000-default.conf
RUN pip3 install certbot certbot --break-system-packages
RUN certbot certonly --standalone -v
EXPOSE 80 443
CMD ["apache2ctl", "-D", "FOREGROUND"]