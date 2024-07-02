FROM ruby:3.2.2
RUN apt-get update -qq && apt-get install -y build-essential libpq-dev nodejs
RUN mkdir /image-gallery-app
WORKDIR /image-gallery-app
ADD Gemfile /image-gallery-app/Gemfile
ADD Gemfile.lock /image-gallery-app/Gemfile.lock
RUN bundle install
ADD . /image-gallery-app

# Add a script to be executed every time the container starts.
COPY entrypoint.sh /usr/bin/
RUN chmod +x /usr/bin/entrypoint.sh
ENTRYPOINT ["entrypoint.sh"]

EXPOSE 3000

CMD ["rails", "server", "-b", "0.0.0.0"]