# mDNS / DNS-SD Monitor

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/F8zvFL89rXf6pgQo3twuVc/WGzv2M9waPK1akzhtDJQ6E/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/F8zvFL89rXf6pgQo3twuVc/WGzv2M9waPK1akzhtDJQ6E/tree/main)

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
```
`WEB_ADDRESS` sets the web interface listen address.  
`WEB_PORT` sets the web interface listen port.  
`TZ` sets the timezone inside the container.  
Valid timezones inside the container are at `/usr/share/zoneinfo`.

## License

This project is open-source software licensed under the [Apache License, Version 2.0](https://opensource.org/license/apache-2-0).
