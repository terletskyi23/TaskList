class TasksController < ApplicationController
  respond_to :json

  def index
    respond_to do |format|
      format.json { render json: Task.all }
      format.html
    end
  end

  def create
    respond_with Task.create(task_params)
  end

  def destroy
    respond_with Task.destroy(params[:id])
  end

private
  def task_params
    params.require(:task).permit(:title, :body)
  end
end
