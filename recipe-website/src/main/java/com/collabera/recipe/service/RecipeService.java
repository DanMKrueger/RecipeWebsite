package com.collabera.recipe.service;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.collabera.recipe.model.Recipe;
import com.collabera.recipe.repository.RecipeRepository;

@Service
public class RecipeService {

	@Autowired
	private RecipeRepository recipeRepo;
	
	
	public ArrayList<Recipe> getAllRecipes() {
		ArrayList<Recipe> allRecipes = (ArrayList<Recipe>) recipeRepo.findAll();
		//System.out.println(allRecipes.toString());
		return allRecipes;

	}


	public int addRecipeToDatabase(String enteredString) {
		//System.out.println(enteredString);
		
		int msg = 0;
		Recipe recipe = new Recipe();
		
		String delims = "[&]";
		ArrayList<String> enteredRecipe = new ArrayList<>();
		
		/* 
		 * Take our string that is passed in, and split the string up based on our
		 * delimiter we set above, which is the & symbol
		 */
		String[] parsedString = enteredString.split(delims);
		
		
		/* Go through our string array that has been split up into sections, and now
		 * split it up on the = symbol so we take everything after the = and push it
		 * into our array list.
		 */
		for (int i = 0; i < parsedString.length; i++) {
			String str = parsedString[i].substring(parsedString[i].indexOf("=") + 1);
			enteredRecipe.add(str);

		}
		
		String newStringToAdd = enteredRecipe.get(3);
		newStringToAdd = newStringToAdd.replace("%20", " ");
		enteredRecipe.set(3, newStringToAdd);
		
		newStringToAdd = enteredRecipe.get(0);
		newStringToAdd = newStringToAdd.replace("%20", " ");
		enteredRecipe.set(0, newStringToAdd);
		
		newStringToAdd = enteredRecipe.get(1);
		newStringToAdd = newStringToAdd.replace("%20", " ");
		enteredRecipe.set(1, newStringToAdd);

		
		String decodeTest = enteredRecipe.get(2);
		decodeTest = decode(decodeTest);
		//System.out.println(decodeTest);
		
		//System.out.println(enteredRecipe.toString());
		
		enteredRecipe.set(2, decodeTest);
		
		recipe.setRecipe_name(enteredRecipe.get(0));
		recipe.setPrepTime(enteredRecipe.get(1));
		recipe.setImage(enteredRecipe.get(2));
		recipe.setDescription(enteredRecipe.get(3));
		
		recipeRepo.save(recipe);
		
		
		return 0;
	}
	

    public static String decode(String url){  
    	try {  
           String prevURL="";  
           String decodeURL=url;  
           while(!prevURL.equals(decodeURL))  
           {  
                prevURL=decodeURL;  
                decodeURL=URLDecoder.decode( decodeURL, "UTF-8" );  
           }  
           return decodeURL;  
      } catch (UnsupportedEncodingException e) {  
           return "Issue while decoding" +e.getMessage();  
      }  
    }


	public ArrayList<Recipe> adminGetRecipes() {
		ArrayList<Recipe> allRecipes = (ArrayList<Recipe>) recipeRepo.findAll();
		return allRecipes;
	}


	public ArrayList<Recipe> adminRemoveRecipe(String enteredString) {
		//System.out.println(enteredString);
		String delim = "[=]";
		String[] parsedIntString = enteredString.split(delim);
		ArrayList<Recipe> allRecipes = (ArrayList<Recipe>) recipeRepo.findAll();
		recipeRepo.deleteById(Integer.parseInt(parsedIntString[1]));
		allRecipes = (ArrayList<Recipe>) recipeRepo.findAll();
		return allRecipes;
	} 
	
}
