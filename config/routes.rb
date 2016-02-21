Rails.application.routes.draw do
  resources :tasks, only: [:index, :create, :update, :destroy, :toggle_status], defaults: {format: :json}
  root to: "tasks#index"
end
