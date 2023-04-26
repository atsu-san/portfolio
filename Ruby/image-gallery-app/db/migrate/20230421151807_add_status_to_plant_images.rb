class AddStatusToPlantImages < ActiveRecord::Migration[7.0]
  def change
    add_column :plant_images, :status, :string
  end
end
