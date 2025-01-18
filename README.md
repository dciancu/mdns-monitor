# mDNS / DNS-SD Monitor

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/F8zvFL89rXf6pgQo3twuVc/WGzv2M9waPK1akzhtDJQ6E/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/F8zvFL89rXf6pgQo3twuVc/WGzv2M9waPK1akzhtDJQ6E/tree/main)

<a href="https://www.buymeacoffee.com/dciancu" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="height: 42px !important;width: 151.9px !important;" ></a>

Simple mDNS / DNS-SD application to monitor traffic and show it in a web page.

## Usage

Docker Hub Image: [dciancu/mdns-monitor](https://hub.docker.com/r/dciancu/mdns-monitor)  

Run the container using `docker compose` with the provided `docker-compose.yml`.  
Access the web interface at the configured `WEB_ADDRESS` and `WEB_PORT`.

#### API JSON Services
A list of discovered services and their addresses can be retrieved as JSON at endpoint `/services`.

### Config

Create a new `docker-compose.override.yml` file and adjust below content for your configuration:
```
services:
  mdns-monitor:
    environment:
      TZ: 'UTC'
      WEB_ADDRESS: '0.0.0.0'
      WEB_PORT: 3000
# For macOS, use ports
#    ports:
#      - "5353:5353/udp" # Caution: macOS mDNS is already bound
#      - "3000:3000/tcp" # WEB_PORT above
```
`WEB_ADDRESS` sets the web interface listen address.  
`WEB_PORT` sets the web interface listen port.  
`TZ` sets the timezone inside the container.  
Valid timezones inside the container are at `/usr/share/zoneinfo`.

### macOS

> [!WARNING]
> Port 5353/udp is already bound to mDNS on macOS.

Use `docker-compose.macos.yml`.
```
docker compose -f docker-compose.macos.yml -f docker-compose.override.yml up -d
```

## License

This project is open-source software licensed under the [Apache License, Version 2.0](https://opensource.org/license/apache-2-0).
