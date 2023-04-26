class PlantsController < ApplicationController
  http_basic_authenticate_with name: 'admin', password: 'secret',
                               only: :destroy

  def index
    @plants = Plant.all
  end

  def show
    @plant = Plant.find(params[:id])
  end

  def new
    @plant = Plant.new
  end

  def create
    @plant = Plant.new(plant_params)

    if @plant.save
      redirect_to @plant
    else
      render :new, status: :unprocessable_entity
    end
  end

  def edit
    @plant = Plant.find(params[:id])
  end

  def update
    @plant = Plant.find(params[:id])

    if @plant.update(plant_params)
      redirect_to @plant
    else
      render :edit, status: :unprocessable_entity
    end
  end

  def destroy
    @plant = Plant.find(params[:id])
    @plant.destroy

    redirect_to root_path, status: :see_other
  end

  private

  def plant_params
    params.require(:plant).permit(:name, :description, :status)
  end
end
