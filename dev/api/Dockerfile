FROM debian:jessie

ENV DEBIAN_FRONTEND=noninteractive
EXPOSE 80
VOLUME /aptly

ADD aptly.conf /root/.aptly.conf

RUN echo 'debconf debconf/frontend select Noninteractive' | debconf-set-selections

RUN echo "deb http://repo.aptly.info/ squeeze main" > /etc/apt/sources.list.d/aptly.list
RUN apt-key adv --keyserver keys.gnupg.net --recv-keys 9E3E53F19C7DE460

RUN apt-get -y update && \
    apt-get -y install apt-utils && \
    apt-get -y install \
        aptly \
        git \
        curl \
        bzip2 \
        gnupg \
        gpgv && \
    apt-get clean

ENTRYPOINT ["/usr/bin/aptly", "api", "serve", "-listen=:80"]
