var imageURL, imgObj, stage, image, frameObj, frame, path, sharePath;

var frames = ['images/marcos/ciencia-ficcion(final).png',
'images/marcos/cuento(final).png',
'images/marcos/historico(final).png',
'images/marcos/poesia(final).png',
'images/marcos/terror(final).png'];

var currentFrame = 0;

//Generates standart header element.
var generateHeader = function() {
	var header = document.createElement("div");
	header.setAttribute("class", "head");
	header.setAttribute("id", "head");
	var imgHead = document.createElement("img");
	imgHead.setAttribute("src", "/images/..");
	var titleHead = document.createElement("h1");
	titleHead.innerText = "Soy Lo Que Leo";

	header.appendChild(imgHead);
	header.appendChild(titleHead);

	return header;
};

//Generate homepage
var generateHome = function() {
	var body = document.createElement("div");
	body.setAttribute("class", "body");
	body.setAttribute("id", "body");
	var panel = document.createElement("div");
	panel.setAttribute("class", "panel");
	panel.setAttribute("id", "panel");

	var buttonFacebook = document.createElement("a");
	buttonFacebook.setAttribute("id", "buttonFacebook");
	buttonFacebook.setAttribute("class", "btn btn-facebook");
	buttonFacebook.setAttribute("href", "javascript:;");
	buttonFacebook.setAttribute("onclick", "uploadImageFB()");
	buttonFacebook.innerHTML = "<i class='fab fa-facebook-f'></i> Subir desde Facebook"

	var breakEl = document.createElement("br");
	var breakEl1 = document.createElement("br");

	var buttonUpload = document.createElement("a");
	buttonUpload.setAttribute("id", "buttonUpload");
	buttonUpload.setAttribute("class", "btn btn-primary");
	buttonUpload.setAttribute("href", "javascript:;");
	buttonUpload.setAttribute("onclick", "uploadImage()");
	buttonUpload.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> Subir desde tu ordenador";

	panel.appendChild(buttonFacebook);
	panel.appendChild(breakEl);
	panel.appendChild(breakEl1);
	panel.appendChild(buttonUpload);

	body.appendChild(panel);
	return body;
};

var clearElement = function(id) {
	var list = document.getElementById(id);

	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
};

function fbLogin() {
	FB.login(function(response) {
		console.log(response);
		if (response.status === 'connected') {
			// var queryURL = '/' + response.authResponse.userID + '/picture';
			// console.log(queryURL);
			FB.api('/me', 'GET', {
					fields: 'picture.width(306).height(306)'
				},
				function(response) {
					console.log(response);
					imageURL = response.picture.data.url;
					initCanvas();
				});
		}
	}, {
		scope: 'email'
	});
};

function fbShare() {
	if (sharePath) {
		FB.ui({
			method: 'feed',
			link: sharePath,
			caption: 'Orgullo Dominicano',
			source: sharePath
		}, function(response) {});
	}
};

var uploadImageFB = function() {
	// fbLogin().then(function(response) {
	// 	console.log(response);
	// });
	fbLogin();
};

var uploadImage = function() {
	console.log("Button upload");
};

var saveImage = function() {
	stage.find('Transformer').destroy();
	layer.draw();
	path = stage.toDataURL();
	//var tr = new Konva.Transformer();
	//layer.add(tr);
	//tr.attachTo(image);
	//layer.draw();
};

var imageEditingLayout = function() {
	var body = document.createElement("div");
	body.setAttribute("class", "body");
	body.setAttribute("id", "body");
	var preview = document.createElement("div");
	preview.setAttribute("class", "panel")
	var thumb = document.createElement("div");
	thumb.setAttribute("class", "thumb");
	var img = document.createElement("div");
	img.setAttribute("id", "ImagePreview");

	var buttons = document.createElement("div");
	buttons.setAttribute("class", "buttons");

	var buttonGuardar = document.createElement("a");
	buttonGuardar.setAttribute("id", "SaveButton");
	buttonGuardar.setAttribute("class", "btn btn-primary");
	buttonGuardar.setAttribute("href", "javascript:;");
	buttonGuardar.setAttribute("onclick", "saveImage()");
	buttonGuardar.innerHTML = "<i class='fas fa-save'></i> Guardar Imagen"

	var breakEl = document.createElement("br");

	thumb.appendChild(img);
	buttons.appendChild(buttonGuardar);
	preview.appendChild(thumb);
	preview.appendChild(breakEl);
	preview.appendChild(buttons);
	body.appendChild(preview);

	return body;
};

var initCanvas = function() {
	clearElement('main');

	//Page layout for image editing
	//*******************************************************
	var main = document.getElementById('main');
	var body = imageEditingLayout();

	main.appendChild(generateHeader());
	main.appendChild(body);
	//*******************************************************

	// Stage
	layer = new Konva.Layer();
	stage = new Konva.Stage({
		container: 'ImagePreview',
		width: 512,
		height: 512
	});
	// Image
	imageObj = new Image();
	imageObj.onload = function() {
		image = new Konva.Image({
			image: imageObj,
			y: 50,
			x: 56,
			width: 400,
			height: 380,
			draggable: true
		});
		// Frame
		frameObj = new Image();
		frameObj.onload = function() {
			frame = new Konva.Image({
				image: frameObj,
				// y: 206,
				width: 512,
				height: 512
			});
			layer.add(image);
			layer.add(frame);
			stage.add(layer);
			var tr = new Konva.Transformer();
			layer.add(tr);
			tr.attachTo(image);
			layer.draw();
		}
		frameObj.src = frames[currentFrame];
	}
	imageObj.src = imageURL;

	console.log(imageURL);
};

(function() {

	var main = document.getElementById("main");

	//Page initial layout
	//*************************************************************
	var header = generateHeader();
	var home = generateHome();
	//*************************************************************
	main.appendChild(header);
	main.appendChild(home);

})();