class RecipeController < ApplicationController
	def index
		@recipe = Recipe.new("Sukiyaki", 35, ['beef','tofu','negi','shungiku','shiitake','shiratake noodles'])
		@name = @recipe.getName
		@price = @recipe.getPrice
		@ingredients = @recipe.getIngredients
	end

	def new
    	@recipe = Recipe.addIngredient(ingredient)
  	end
end
