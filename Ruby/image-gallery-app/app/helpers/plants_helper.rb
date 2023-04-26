module PlantsHelper
  def num_of_plants_notice
    if Plant.public_count > 1
      "There are currently #{Plant.public_count} plants in this image gallery."
    elsif Plant.public_count == 1
      "There is currently #{Plant.public_count} plant in this image gallery."
    else
      'There is no plant in this image gallery...'
    end
  end
end
