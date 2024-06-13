# mDNS Monitor

[![CircleCI](https://dl.circleci.com/status-badge/img/circleci/F8zvFL89rXf6pgQo3twuVc/WGzv2M9waPK1akzhtDJQ6E/tree/main.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/circleci/F8zvFL89rXf6pgQo3twuVc/WGzv2M9waPK1akzhtDJQ6E/tree/main)

Simple mDNS application to monitor traffic and show it in a web page.

## Usage

Docker Hub Image: [dciancu/mdns-monitor](https://hub.docker.com/r/dciancu/mdns-monitor)  

Run the container using `docker compose` with the provided `docker-compose.yml`.  

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
