# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
PlantImage.destroy_all
Plant.destroy_all
Plant.create(
  [
    {
      name: 'Bamboo',
      description: 'Bamboos are a diverse group of mostly evergreen perennial flowering plants making up the subfamily Bambusoideae of the grass family Poaceae.',
      status: 'public'
    },
    {
      name: 'Cherry blossom',
      description: 'A cherry blossom, also known as Japanese cherry or sakura, is a flower of many trees of genus Prunus or Prunus subg. Cerasus.',
      status: 'public'
    },
    {
      name: 'Cornus florida',
      description: 'Cornus florida, the flowering dogwood, is a species of flowering tree in the family Cornaceae native to eastern North America and northern Mexico.',
      status: 'public'
    },
    {
      name: 'Cosmos',
      description: 'Cosmos is a genus, with the same common name of cosmos, consisting of flowering plants in the sunflower family.',
      status: 'public'
    },
    {
      name: 'Morning glory',
      description: 'Morning glory (also written as morning-glory) is the common name for over 1,000 species of flowering plants in the family Convolvulaceae, whose current taxonomy and systematics are in flux.',
      status: 'public'
    },
    {
      name: 'Sunflower',
      description: 'The common sunflower (Helianthus annuus) is a large annual forb of the genus Helianthus. It is commonly grown as a crop for its edible oily seeds.',
      status: 'public'
    },
    {
      name: 'Tulip',
      description: 'Tulips (Tulipa) are a genus of spring-blooming perennial herbaceous bulbiferous geophytes (having bulbs as storage organs). The flowers are usually large, showy and brightly coloured, generally red, pink, yellow, or white (usually in warm colours).',
      status: 'public'
    }
  ]
)
plant_bam_id = Plant.find_by(name: 'Bamboo').id
plant_che_id = Plant.find_by(name: 'Cherry blossom').id
plant_cor_id = Plant.find_by(name: 'Cornus florida').id
plant_cos_id = Plant.find_by(name: 'Cosmos').id
plant_mor_id = Plant.find_by(name: 'Morning glory').id
plant_sun_id = Plant.find_by(name: 'Sunflower').id
plant_tul_id = Plant.find_by(name: 'Tulip').id
base_url = 'https://dev.suki2.net/wp-content/uploads/2023/04/'
plant_bam_images = ['sample_bamboo1.jpeg', 'sample_bamboo2.jpeg', 'sample_bamboo3.jpeg', 'sample_bamboo4.jpeg']
plant_che_images = ['sample_sakura1.jpeg', 'sample_sakura2.jpeg', 'sample_sakura3.jpeg', 'sample_sakura4.jpeg', 'sample_sakura5.jpeg', 'sample_sakura6.jpeg']
plant_cor_images = ['sample_hanamizuki1.jpeg', 'sample_hanamizuki2.jpeg', 'sample_hanamizuki3.jpeg', 'sample_hanamizuki4.jpeg']
plant_cos_images = ['sample_cosmos1.jpeg', 'sample_cosmos2.jpeg', 'sample_cosmos3.jpeg', 'sample_cosmos4.jpeg', 'sample_cosmos5.jpeg', 'sample_cosmos6.jpeg', 'sample_cosmos7.jpeg']
plant_mor_images = ['sample_asagao1.jpeg', 'sample_asagao2.jpeg', 'sample_asagao3.jpeg', 'sample_asagao4.jpeg', 'sample_asagao5.jpeg']
plant_sun_images = ['sample_sunflower1.jpeg', 'sample_sunflower2.jpeg', 'sample_sunflower3.jpeg', 'sample_sunflower4.jpeg', 'sample_sunflower5.jpeg']
plant_tul_images = ['sample_tulip1.jpeg', 'sample_tulip2.jpeg', 'sample_tulip3.jpeg', 'sample_tulip4.jpeg']

plant_info_arr = [
  { plant_num: plant_bam_id, image_arr: plant_bam_images },
  { plant_num: plant_che_id, image_arr: plant_che_images },
  { plant_num: plant_cor_id, image_arr: plant_cor_images },
  { plant_num: plant_cos_id, image_arr: plant_cos_images },
  { plant_num: plant_mor_id, image_arr: plant_mor_images },
  { plant_num: plant_sun_id, image_arr: plant_sun_images },
  { plant_num: plant_tul_id, image_arr: plant_tul_images }
]

seed_arr = plant_info_arr.map do |plant_info_hash|
  # puts plant_info_hash[:plant_num]
  # puts plant_info_hash[:image_arr]
  plant_info_hash[:image_arr].map do |image_file|
    {
      plant_id: plant_info_hash[:plant_num],
      url: base_url + image_file,
      status: 'public'
    }
  end
end

PlantImage.create(seed_arr)