Rails.application.routes.draw do
  resources :tasks, only: [:index, :create, :update, :destroy], defaults: {format: :json}
  root to: "tasks#index"
end
