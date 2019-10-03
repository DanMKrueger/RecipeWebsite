package com.collabera.recipe.controller;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.collabera.recipe.model.Recipe;
import com.collabera.recipe.service.RecipeService;

@RestController
public class RecipeController {


	@Autowired
	private RecipeService recipeService;
	
	@RequestMapping(method = RequestMethod.POST, value = "/recipes")
	public @ResponseBody ArrayList<Recipe> getRecipes() {
		return recipeService.getAllRecipes();
	}
	
	
	@RequestMapping(method=RequestMethod.POST, value="/addrecipe")
	public @ResponseBody int addARecipe(@RequestBody String enteredString) throws Exception {
		return recipeService.addRecipeToDatabase(enteredString);
	}	
	
	@RequestMapping(method=RequestMethod.POST, value="/admin")
	public @ResponseBody ArrayList<Recipe> adminGetRecipes() throws Exception {
		return recipeService.adminGetRecipes();
	}
	
	@RequestMapping(method=RequestMethod.DELETE, value="/removerecipe")
	public @ResponseBody ArrayList<Recipe> adminRemove(@RequestBody String enteredString) throws Exception {
		return recipeService.adminRemoveRecipe(enteredString);
	}
}
