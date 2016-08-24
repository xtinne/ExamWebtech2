class Recipe
	def initialize(name, price, ingredients)
      	@name = name
      	@price = price
      	@ingredients = ingredients
   	end

   	def getName
   		@name
   	end

   	def getPrice
   		@price
   	end

   	def getIngredients
   		@ingredients
   	end

   	def addIngredient(ingredient)
   		ingredients.push(ingredient) unless ingredients.include?(ingredient)
   	end
end
