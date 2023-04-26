# Docker
    docker-compose run web rails new . --force --database=postgresql
    docker-compose build
    docker-compose run --rm web bundle install
    docker-compose up -d
    docker-compose down
    docker-compose run --rm web rails db:create
    docker-compose run --rm web rails db:migrate
    docker-compose run --rm web rails db:seed
    docker-compose run --rm web rails db:setup

# Rails
    rails db:migrate:redo VERSION=nnnnnnnnnnnnnn

# rubocop
    bundle exec rubocop --auto-gen-config
    bundle exec rubocop
    bundle exec rubocop -a

# For Linux
    sudo chown -R $USER:$USER .
