class Api::BlogsController < ApplicationController
  before_action :set_blog, only: [:show, :update, :destroy]

  def index
    render json: current_user.blogs
  end

  def update
    if @blog.update(blog_params)
      render json: @blog
    else
      render json: @blog.errors, status: 422
    end
  end

  def create
    blog = current_user.blogs.new(blog_params)
    if blog.save
      render json: blog
    else
      render json: blog.errors, status: 422
    end
  end

  def show
    render json: @blog
  end

  def destroy
    @blog.destroy
  end

  private
  def set_blog
    @blog = Blog.find(params[:id])
  end

  def blog_params
    params.require(:blog).permit(:title, :body)
  end
end
