class Plant < ApplicationRecord
  include Visible

  has_many :plant_images, dependent: :destroy

  validates :name, presence: true, length: { minimum: 3 }
  validates_associated :plant_images
end
