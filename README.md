<div style="display: inline_block">
    <img align="center" alt="Mateus-Angular" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/angularjs/angularjs-original.svg"/>
    <img align="center" alt="Mateus-TypeScript" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/typescript/typescript-original.svg"/>
    <img align="center" alt="Mateus-Jest" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/jest/jest-plain.svg"/>
    <img align="center" alt="Mateus-EsLint" height="30" width="40" src="https://raw.githubusercontent.com/devicons/devicon/master/icons/eslint/eslint-original.svg"/>
</div>
<br>

# ShopWeb

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.0.3.

It has a backend in Java 17 using Spring Boot: [ShopApi](https://github.com/mateusgpereira/shop-api).  

<br>

## Build

### Requirements
> In order to run this application you need to have [docker](https://docs.docker.com/engine/install/) and [docker-compose](https://docs.docker.com/compose/install/) installed.  
> First you need to build the backend, follow the instructions in the **build** section of the project: [ShopApi](https://github.com/mateusgpereira/shop-api#build)  

After have built the backend image, you can run this app with the following steps:  

Clone the repo:

```shell script
git clone https://github.com/mateusgpereira/shop-web.git
```  

Enter the project folder:

```shell script
cd shop-web
```  

Bring up the docker service with docker-compose:

```shell script
docker-compose up -d
```  

<br>  

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`.  
The application will automatically reload if you change any of the source files.  

<br>  

## Angular Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.  

<br>  

## Running unit tests

Run `ng test` to execute the unit tests via [Jest](https://jestjs.io).  
