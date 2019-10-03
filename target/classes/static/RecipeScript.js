var myObj = 0;;

function imageClicked(name, obj){
	console.log(name);
	if($(obj).siblings().length < 1){
		$(obj).parent().prepend("<p>" + name + "</p>");
	}else{
		$(obj).parent().find(':first-child').remove();
	}
}

function loadImages(msg){
	
	console.log(msg);
	for(var i = 0; i < msg.length; i++){		
		
		var element = document.createElement("div");
		element.className = "img-divs shadowing col-md-4 h-50 my-1";
		
		let divImg = document.createElement("img");
		//divImg.setAttribute("onclick", "imageClicked(\"" + (msg[i].description) + "\", " + "$(this))");
		divImg.setAttribute("src", msg[i].image);
//		divImg.setAttribute("display", "inline");
		divImg.style = "width:300px; height:300px";
		divImg.className = "roundCorner img-fluid " + "\"" + msg[i].recipe_name + "\"";	

		var overlayDiv = document.createElement("div");
		overlayDiv.className="overlay";
		var divClassForText = document.createElement("div");
		divClassForText.innerHTML = msg[i].recipe_name + " - Prep Time: " + msg[i].prep_time + ".    Description: " + msg[i].description;
		divClassForText.className = "text";
		
		overlayDiv.appendChild(divClassForText);
		element.appendChild(divImg);
		element.appendChild(overlayDiv);
		$('.emptyDivToPrepend').append(element);
	}
	$('.emptyDivToPrepend').append("<video muted autoplay style=\" width:300px; height:300px\" class=\" roundCorner\"> <source src=\"rachelray.mp4\" type=\"video/mp4\"</video>");	
}

function addingRecipe(name, prep, img, descrip){
	console.log(name);
	$.ajax({
		url : "http://localhost:8080/addrecipe",
		type : 'POST',
		contentType : 'application/json',
		data : {
			recipe_name: name,
			prep_time: prep,
			image: img,
			description: descrip
		},
		success : function(msg) {
			alert("Recipe Added!");
		},
		error : function() {
			alert("AJAX Fail");
		}

	});
}

function loadButtons(msg){
	
	console.log(msg);
	for(var i = 0; i < msg.length; i++){
		
		var element = document.createElement("div");
		var editButton = document.createElement("button");
		var deleteButton = document.createElement("button");
		var myLabel = document.createElement("label");
		
		myLabel.innerHTML = msg[i].recipe_name;
		element.className = "row dynamicDiv";
		myLabel.className = "col-sm-3 dynamicLabel shadowing";
		editButton.className = "mx-2 btn btn-primary shadowing col-sm-3";
		deleteButton.className = "mx -2btn btn-danger shadowing col-sm-3";
		editButton.innerHTML = "Edit";
		deleteButton.innerHTML = "Delete";
		
		editButton.setAttribute("onclick", "editButtonClicked(\"" + msg[i].id + "\")");
		deleteButton.setAttribute("onclick", "deleteButtonClicked(\"" + msg[i].id + "\")");
		
		element.appendChild(myLabel);
		element.appendChild(editButton);
		element.appendChild(deleteButton);

		
		$('#adminPageDiv').append(element);
		$('#adminPageDiv').append("<br />");
		

	}
	
}

function editButtonClicked(obj){
	console.log("Editing " + obj);
	
	$.ajax({
		url: "http://localhost:8080/editpage",
		type: 'POST',
		contentType: 'applicatoin/json',
		data:{
			Id: obj
		},
		success: function(msg){
			console.log(msg);
			location.href = 'edit.html';
		},
		error: function(msg){
			console.log("Error editing");
		}
		
	});
	
}

function getMyObj(){
	return myObj;
}

function deleteButtonClicked(obj){
	console.log("Deleting " + obj);
	
	$.ajax({
		url : "http://localhost:8080/removerecipe",
		type : 'DELETE',
		contentType : 'application/json',
		data : {
			Id: obj
		},
		success : function(msg) {
			alert("Recipe Deleted!");
			location.reload();
		},
		error : function() {
			alert("AJAX Fail");
		}

	});
}

function editRecipeClicked(name, prep, img, descrip){
	$.ajax({
		url : "http://localhost:8080/updaterecipe",
		type : 'PUT',
		contentType : 'application/json',
		data : {
			recipe_name: name,
			prep_time: prep,
			image: img,
			description: descrip
		},
		success : function(msg) {
			alert("Recipe Edited!");
			console.log(msg);
			location.href = 'http://localhost:8080/admin.html';
		},
		error : function() {
			alert("AJAX Fail");
		}

	});
}