Rails.application.routes.draw do
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "plants#index"

  resources :plants do
    resources :plant_images
  end
  # get "/plants", to: "plants#index"
  # get "/plants/:id", to: "plants#show"
end
