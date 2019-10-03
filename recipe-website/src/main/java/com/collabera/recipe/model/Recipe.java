package com.collabera.recipe.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="recipes", schema="recipedb1")
public class Recipe {

	@Id
	private int Id;
	@Column(name="recipe_name")
	private String recipe_name;
	@Column(name="prep_time")
	private String prep_time;
	@Column(name="image")
	private String image;
	@Column(name="description")
	private String description;
	
	public Recipe(int id, String recipe_name, String prep_time, String image, String description) {
		super();
		Id = id;
		this.recipe_name = recipe_name;
		this.prep_time = prep_time;
		this.image = image;
		this.description = description;
	}
	
	public Recipe() {
		super();
		Id = 0;
		this.recipe_name = "";
		this.prep_time = "";
		this.image = "";
		this.description = "No description provided.";
	}
	
	@Override
	public String toString() {
		return "Recipe [Id=" + Id + ", recipe_name=" + recipe_name + ", prep_time=" + prep_time + ", image=" + image
				+ ", description=" + description + "]";
	}

	public int getId() {
		return Id;
	}

	public void setId(int id) {
		Id = id;
	}

	public String getRecipe_name() {
		return recipe_name;
	}

	public void setRecipe_name(String recipe_name) {
		this.recipe_name = recipe_name;
	}

	public String getPrep_time() {
		return prep_time;
	}

	public void setPrepTime(String prep_time) {
		this.prep_time = prep_time;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}
	
	
}
