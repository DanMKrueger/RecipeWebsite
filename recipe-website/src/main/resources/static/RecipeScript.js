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
		divImg.className = "img-fluid " + "\"" + msg[i].recipe_name + "\"";	

		var overlayDiv = document.createElement("div");
		overlayDiv.className="overlay";
		var divClassForText = document.createElement("div");
		divClassForText.innerHTML = msg[i].recipe_name + ": " + msg[i].description;
		divClassForText.className = "text";
		
		overlayDiv.appendChild(divClassForText);
		element.appendChild(divImg);
		element.appendChild(overlayDiv);
		$('.emptyDivToPrepend').append(element);
	}
	
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