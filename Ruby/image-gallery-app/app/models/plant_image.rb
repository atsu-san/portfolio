class PlantImage < ApplicationRecord
  include Visible

  belongs_to :plant

  validates :url, presence: true, length: { minimum: 10 }
end
