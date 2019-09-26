# frozen_string_literal: true

class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  include DeviseTokenAuth::Concerns::User

  serialize :liked_people, Array

  def self.random_person(ids)
    ids = ids.empty? ? [0] : ids
    Person.where('id NOT IN (?)', ids).order('RANDOM()').limit('4')
  end

  def self.liked(ids)
    ids = ids.empty? ? [0] :ids
    Person.where('id IN (?)', ids)
  end

end
