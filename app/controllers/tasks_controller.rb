class TasksController < ApplicationController
  respond_to :json

  def index
    respond_to do |format|
      format.json { render json: Task.all }
      format.html
    end
  end

  def update
    task = Task.find(params[:id])
    respond_with task.update_attributes(task_params)
  end

  def create
    respond_with Task.create(task_params)
  end

  def destroy
    respond_with Task.destroy(params[:id])
  end

private
  def task_params
    params.require(:task).permit(:title, :body, :status)
  end
end
