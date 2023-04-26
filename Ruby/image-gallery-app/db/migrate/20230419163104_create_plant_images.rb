class CreatePlantImages < ActiveRecord::Migration[7.0]
  def change
    create_table :plant_images do |t|
      t.text :url
      t.references :plant, null: false, foreign_key: true

      t.timestamps
    end
  end
end
