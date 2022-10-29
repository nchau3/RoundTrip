# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

require 'faker'
require 'active_support/all'

puts "creating users..."
User.destroy_all
User.create(first_name: "Shaun", last_name: "Jiji", email: "shaun@shaun.com", password: "shaun")
User.create(first_name: "Coreen", last_name: "Huang", email: "coreen@coreen.com", password: "coreen")
User.create(first_name: "Nicholas", last_name: "Chau", email: "nicholas@nicholas.com", password: "nicholas")

20.times do
  user = User.new(
    first_name: Faker::Name.unique.male_first_name,
    last_name: Faker::Name.unique.last_name
    )
  
  user.email = Faker::Internet.free_email(name: user.first_name)
  user.save
end

20.times do
  user = User.new(
    first_name: Faker::Name.unique.female_first_name,
    last_name: Faker::Name.unique.last_name
    )
  
  user.email = Faker::Internet.free_email(name: user.first_name)
  user.save
end

puts "creating drivers..."

sample_user_id = 4

10.times do
  driver = Driver.new(
    user: User.find(sample_user_id),
    car_make: Faker::Vehicle.make,
    licence_plate: Faker::Vehicle.license_plate,
    car_color: Faker::Vehicle.color
    )
  driver.car_model = Faker::Vehicle.model(make_of_model: driver.car_make)
  driver.save
  sample_user_id += 1
end

puts "creating rides..."

# to reference user values by driver
# @driver = Driver.find(4)
# puts @driver.user.first_name

cities = ["Montréal", "Toronto", "London", "Markham", "Kingston", "Windsor", "Vancouver", "Kelowna", "North Dumfries", "Ottawa"]

50.times do
  random_cities = cities.shuffle
  ride = Ride.new(
    driver: Driver.all.sample,
    departure_date_time: Faker::Time.forward(days: 30, period: :day),
    pickup: random_cities[0],
    dropoff: random_cities[1],
    number_of_seats: rand(1..3),
    cost_per_seat: rand(30..80),
    description: "I am going from here to there. please book a seat!",
    allow_pets: false,
    allow_oversize: false,
    allow_skis: false,
    allow_bikes: false
  )
  # accessing driver name through ride
  # puts ride.driver.user.first_name
  ride.save
end

@driver = Driver.find(4)
puts @driver.rides.all
