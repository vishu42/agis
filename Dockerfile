FROM brigadecore/brigade-worker

RUN mkdir -p /home/src/dist/agis

COPY . /home/src/dist/agis
