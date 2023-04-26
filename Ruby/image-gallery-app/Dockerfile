FROM ruby:3.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /image-gallery-app
WORKDIR /image-gallery-app
ADD Gemfile /image-gallery-app/Gemfile
ADD Gemfile.lock /image-gallery-app/Gemfile.lock
RUN bundle install
ADD . /image-gallery-app