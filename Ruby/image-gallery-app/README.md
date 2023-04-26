# README

This is a sample image gallery app.

---
## Technologies used

- Ruby 3.2
- Ruby on Rails 7.0
- PostgreSQL 14
- Docker

---
## How to run the app

### 1. Navigate to the *image-gallery-app* folder

### 2. Execute the following commands:

    docker-compose run --rm web rails new . --force --database=postgresql

    docker-compose up -d
    
    docker-compose run --rm web rails db:setup

### 3. Open http://localhost:3000/

---
## How to close the app

### 1. Execute the following command:

    docker-compose down
