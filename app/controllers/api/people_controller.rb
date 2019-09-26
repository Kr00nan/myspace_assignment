class Api::PeopleController < ApplicationController
  before_action :authenticate_user!

  def index
    render json: User.random_person(current_user.liked_people)
  end

  def update
    current_user.liked_people << params[:id].to_i
    current_user.save
  end
end
