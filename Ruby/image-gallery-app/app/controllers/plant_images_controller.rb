class PlantImagesController < ApplicationController
  def create
    @plant = Plant.find(params[:plant_id])
    @plant_image = @plant.plant_images.create(plant_image_params)
    redirect_to plant_path(@plant)
  end

  def destroy
    @plant = Plant.find(params[:plant_id])
    @plant_image = @plant.plant_images.find(params[:id])
    @plant_image.destroy
    redirect_to plant_path(@plant), status: :see_other
  end

  private

  def plant_image_params
    params.require(:plant_image).permit(:url, :status)
  end
end
