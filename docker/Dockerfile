FROM ubuntu:20.04

# Set as non-interactive
ENV contianer=docker
ENV LC_ALL=C
ARG DEBIAN_FRONTEND=noninteractive
ENV DEBIAN_FRONTEND=noninteractive
ENV TZ=US/Pacific
ENV PS1="\e[1;33m\u \e[1;34m\\\$PWD \e[0;0m\$ "

RUN sed -i 's/# deb/deb/g' /etc/apt/sources.list

# Install base packages
RUN apt-get update -y && \
    apt-get upgrade -y && \
    apt-get -y install \
    bash build-essential sudo \
    curl git gpg python3 wget \
    xz-utils libsecret-1-dev \
    lsb-release make cmake \
    libc6 software-properties-common \
    htop neofetch tzdata gcc g++ \
    systemd systemd-sysv

SHELL ["/bin/bash", "-c"]

# Install Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_17.x | bash -
RUN apt-get -y install nodejs && \
    node -v && \
    npm install --global npm@latest && \
    npm -v

# Install Yarn
RUN curl -sL https://dl.yarnpkg.com/debian/pubkey.gpg | gpg --dearmor | tee /usr/share/keyrings/yarnkey.gpg >/dev/null
RUN echo "deb [signed-by=/usr/share/keyrings/yarnkey.gpg] https://dl.yarnpkg.com/debian stable main" | tee /etc/apt/sources.list.d/yarn.list
RUN apt-get update && \
    apt-get -y install yarn && \
    yarn -v

# Add the workspace user
RUN adduser --disabled-password --gecos '' workspace && \
    adduser workspace sudo && \
    echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

# Install OpenVSCode Server
RUN mkdir -p /app
ADD openvscode-server-* /app


# Install other utilities
RUN apt-get update
RUN apt-get -y install \
    apt-utils aptitude \
    nano ubuntu-server \
    systemd systemd-sysv \
    --fix-missing

# Clean up apt
RUN apt-get clean && \
    apt-get autoremove -y && \
    rm -rf /var/cache/apt/* && \
    rm -rf /var/lib/apt/lists/* && \
    rm -rf /tmp/* /var/tmp/* && \
    rm -f /lib/systemd/system/multi-user.target.wants/* \
    /etc/systemd/system/*.wants/* \
    /lib/systemd/system/local-fs.target.wants/* \
    /lib/systemd/system/sockets.target.wants/*udev* \
    /lib/systemd/system/sockets.target.wants/*initctl* \
    /lib/systemd/system/basic.target.wants/* \
    /lib/systemd/system/anaconda.target.wants/* \
    /lib/systemd/system/plymouth* \
    /lib/systemd/system/systemd-update-utmp*

# Set up the environment
USER workspace

EXPOSE 8080

ENV SHELL=/bin/bash
ENV GOPATH=/home/workspace

ENV LC_ALL=C.UTF-8
ENV LANG=C.UTF-8

LABEL name="OpenVSCode Server ARM64 Docker Image"
LABEL version="1.0.0-alpha1"
LABEL description="\
Code Server (https://github.com/gitpod-io/openvscode-server) packaged \
for Docker on ARM64 machines. \
"

RUN export PS1="\e[1;33m\u \e[1;34m\\\$PWD \e[0;0m\$ "
RUN echo "export PS1=\"\e[1;33m\u \e[1;34m\\\$PWD \e[0;0m\$ \"" | sudo tee -a /etc/environment
RUN echo "export PS1=\"\e[1;33m\u \e[1;34m\\\$PWD \e[0;0m\$ \"" | tee -a /home/workspace/.bashrc

RUN sudo apt-get update && \
    sudo apt-get -y install \
    zip unzip openjdk-*-jre \
    openjdk-*-jdk tree \
    software-properties-common && \
    sudo ln -s /usr/bin/clear /usr/bin/cls

# NoSadNile Repo
RUN curl -sSL https://repo.nosadnile.net/repository/raw/apt.sh | bash

# Clean apt
RUN sudo apt-get clean && \
    sudo apt-get autoremove -y && \
    sudo rm -rf /var/cache/apt/* && \
    sudo rm -rf /var/lib/apt/lists/* && \
    sudo rm -rf /tmp/* /var/tmp/* && \
    sudo rm -f /lib/systemd/system/multi-user.target.wants/* \
    /etc/systemd/system/*.wants/* \
    /lib/systemd/system/local-fs.target.wants/* \
    /lib/systemd/system/sockets.target.wants/*udev* \
    /lib/systemd/system/sockets.target.wants/*initctl* \
    /lib/systemd/system/basic.target.wants/* \
    /lib/systemd/system/anaconda.target.wants/* \
    /lib/systemd/system/plymouth* \
    /lib/systemd/system/systemd-update-utmp*

# Utilities
RUN sudo npm install --global serve

# Dotnet
RUN curl -SL -o /home/workspace/dotnet.tar.gz https://dotnetcli.blob.core.windows.net/dotnet/Sdk/master/dotnet-sdk-latest-linux-arm64.tar.gz && \
    sudo mkdir -p /usr/share/dotnet && \
    sudo tar -zxf /home/workspace/dotnet.tar.gz -C /usr/share/dotnet && \
    sudo ln -s /usr/share/dotnet/dotnet /usr/bin/dotnet && \
    rm /home/workspace/dotnet.tar.gz

# TypeScript
RUN sudo npm install --global typescript ts-node

# Final updates
RUN sudo apt-get update && \
    sudo apt-get -y upgrade

# Clean apt... again...
RUN cd /lib/systemd/system/sysinit.target.wants/ \
    && ls | grep -v systemd-tmpfiles-setup | sudo xargs rm -f $1
RUN sudo apt-get clean && \
    sudo apt-get autoremove -y && \
    sudo rm -rf /var/cache/apt/* && \
    sudo rm -rf /var/lib/apt/lists/* && \
    sudo rm -rf /tmp/* /var/tmp/* && \
    sudo rm -f /lib/systemd/system/multi-user.target.wants/* \
    /etc/systemd/system/*.wants/* \
    /lib/systemd/system/local-fs.target.wants/* \
    /lib/systemd/system/sockets.target.wants/*udev* \
    /lib/systemd/system/sockets.target.wants/*initctl* \
    /lib/systemd/system/basic.target.wants/* \
    /lib/systemd/system/anaconda.target.wants/* \
    /lib/systemd/system/plymouth* \
    /lib/systemd/system/systemd-update-utmp*

VOLUME [ "/sys/fs/cgroup" ]

# Add workspace service
ADD workspace.service /lib/systemd/system/workspace.service
RUN sudo systemctl enable workspace

# ISB Coding Club Watermark:
# RUN echo "cls && printf \"_____ ___________   _____           _ _               _____ _       _     \\n|_   _/  ___| ___ \\ /  __ \\         | (_)             /  __ \\ |     | |    \\n  | | \\ \\\`--.| |_/ / | /  \\/ ___   __| |_ _ __   __ _  | /  \\/ |_   _| |__  \\n  | |  \\\`--. \\ ___ \\ | |    / _ \\ / _\\\` | | '_ \\ / _\\\` | | |   | | | | | '_ \\ \\n _| |_/\\__/ / |_/ / | \\__/\\ (_) | (_| | | | | | (_| | | \\__/\\ | |_| | |_) |\\n \\___/\\____/\\____/   \\____/\\___/ \\__,_|_|_| |_|\\__, |  \\____/_|\\__,_|_.__/ \\n                                                __/ |                      \\n                                               |___/\\n\\n\" && printf \"                      --- Workspace: \$HOSTNAME ---\\n\\n\"" >> /home/workspace/.bashrc

# CMD [ "/lib/systemd/systemd" ]
CMD [ "/bin/bash", "-c", "/bin/bash /app/server.sh --connection-token no-token --host 0.0.0.0 --port 8080" ]