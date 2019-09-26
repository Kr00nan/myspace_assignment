200.times do
  name = Faker::Name.name
  location = Faker::Address.city + ', ' + Faker::Address.state_abbr
  birthday = Faker::Date.birthday(min_age: 18, max_age: 65)
  avatar = Faker::Avatar.image(size: '50x200', format: 'png', set: 'set5')
  Person.create(name: name, location: location, birthday: birthday, avatar: avatar)
end

puts '200 People Seeded'