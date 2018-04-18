var imageURL, imgObj, stage, image, frameObj, frame, path, sharePath;

var frames = ['images/marcos/transparente.png','images/marcos/ciencia-ficcion(final).png',
	'images/marcos/cuento(final).png',
	'images/marcos/historico(final).png',
	'images/marcos/poesia(final).png',
	'images/marcos/terror(final).png'
];

var currentFrame = 0;

//Generates standart header element.
var generateHeader = function() {
	var header = document.createElement("div");
	header.setAttribute("class", "head");
	header.setAttribute("id", "head");
	var imgHead = document.createElement("img");
	imgHead.setAttribute("src", "images/Soy-Lo-Que-Leo.png");
	imgHead.setAttribute("id", "headerImage");
	// var titleHead = document.createElement("h1");
	// titleHead.innerText = "Soy Lo Que Leo";

	header.appendChild(imgHead);
	// header.appendChild(titleHead);

	return header;
};

var generateSelection = function() {
	var dropdown = document.createElement("div");
	dropdown.setAttribute("class", "dropdown");

	var toggle = document.createElement("button");
	toggle.setAttribute("class", "btn btn-secondary dropdown-toggle");
	toggle.setAttribute("type", "button");
	toggle.setAttribute("data-toggle", "dropdown");
	toggle.setAttribute("aria-haspopup", "true");
	toggle.setAttribute("aria-expanded", "false");
	toggle.setAttribute("id", "dropdown-toggle");
	toggle.innerText = "Selecciona Un Genero Literario";

	var frameSelect = document.createElement("div");
	frameSelect.setAttribute("id", "dropdown-menu");
	frameSelect.setAttribute("aria-labelledby", "dropdown-toggle");
	// frameSelect.setAttribute("onchange", "setFrame()");
	frameSelect.setAttribute("class", "dropdown-menu");

	var sify = document.createElement("button");
	sify.setAttribute("class", "dropdown-item");
	sify.setAttribute("type", "button");
	sify.setAttribute("onclick", "setFrame(1)");
	sify.innerText = "Ciencia Ficción";

	var cuento = document.createElement("button");
	cuento.setAttribute("class", "dropdown-item");
	cuento.setAttribute("type", "button");
	cuento.setAttribute("onclick", "setFrame(2)");
	cuento.innerText = "Cuentos";

	var historico = document.createElement("button");
	historico.setAttribute("class", "dropdown-item");
	historico.setAttribute("type", "button");
	historico.setAttribute("onclick", "setFrame(3)");
	historico.innerText = "Historia";

	var poesia = document.createElement("button");
	poesia.setAttribute("class", "dropdown-item");
	poesia.setAttribute("type", "button");
	poesia.setAttribute("onclick", "setFrame(4)");
	poesia.innerText = "Poesia";

	var terror = document.createElement("button");
	terror.setAttribute("class", "dropdown-item");
	terror.setAttribute("type", "button");
	terror.setAttribute("onclick", "setFrame(5)");
	terror.innerText = "Terror";

	frameSelect.appendChild(sify);
	frameSelect.appendChild(cuento);
	frameSelect.appendChild(historico);
	frameSelect.appendChild(poesia);
	frameSelect.appendChild(terror);

	dropdown.appendChild(toggle);
	dropdown.appendChild(frameSelect);

	return dropdown;
};

var setFrame = function(selection) {
	currentFrame = selection;
	initCanvas();
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
	buttonFacebook.innerHTML = "<i class='fab fa-facebook-f'></i> &nbsp;Subir desde Facebook";

	var breakEl = document.createElement("br");
	var breakEl1 = document.createElement("br");

	var buttonUpload = document.createElement("a");
	buttonUpload.setAttribute("id", "buttonUpload");
	buttonUpload.setAttribute("class", "btn btn-primary");
	buttonUpload.setAttribute("href", "javascript:;");
	buttonUpload.setAttribute("onclick", "uploadImage()");
	buttonUpload.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> &nbsp;Subir desde tu ordenador";

	
	
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

var fbLogin = function() {
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

var shareImage = function() {
	// if (path) {
	// 	FB.ui({
	// 		method: 'feed',
	// 		link: path,
	// 		caption: 'Soy Lo que Leo',
	// 		source: path
	// 	}, function(response) {});
	// }
	var publish = {
		method: 'share',
		message: 'Soy lo que leo',
		attachment: {
			name: 'Connect',
			caption: 'Soy lo que leo',
			href: window.location.href,
			media: [{
				type: 'image/png',
				href: window.location.href,
				src: path
			}],
		},
		action_links: [{
			text: 'Soy lo que leo',
			href: window.location.href
		}],
		user_prompt_message: 'Comparte tu imagen!'
	};

	FB.ui(publish);
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

var downloadImage = function() {
	var linkDownload = document.createElement("a");
	linkDownload.download = "SoyLoQueLeo.png";
	linkDownload.href = path;
	document.body.appendChild(linkDownload);
	linkDownload.click();
	document.body.removeChild(linkDownload);
};

var saveToServer = function(){
	var req = new XMLHttpRequest();

	req.open("POST", 'C:/Users/espar/Documents/VPrecuperacion/Feria del Libro/SoyLoQueleo(Angular)/uploads', true);

	req.onreadystatechange = function(){
		if(req.readyState == XMLHttpRequest.DONE && req.status == 200){
			console.log("Se subio la imagen al servidor");
		}
	};

	req.send(stage.toObject());
}

var saveImage = function() {
	stage.find('Transformer').destroy();
	layer.draw();
	path = stage.toDataURL("image/png");
	saveToServer();
	console.log(path);

	//Delete save button
	var buttons = document.getElementById("buttons");
	var saveButton = document.getElementById("SaveButton");
	buttons.removeChild(saveButton);

	//Add Download and share button
	var buttonDownload = document.createElement("a");
	buttonDownload.setAttribute("id", "DownloadButton");
	buttonDownload.setAttribute("class", "btn btn-primary");
	buttonDownload.setAttribute("href", "javascript:;");
	buttonDownload.setAttribute("onclick", "downloadImage()");
	buttonDownload.innerHTML = "<i class='fas fa-cloud-download-alt'></i> &nbsp;Descargar Imagen";

	var buttonShare = document.createElement("a");
	buttonShare.setAttribute("id", "ShareButton");
	buttonShare.setAttribute("class", "btn btn-primary");
	buttonShare.setAttribute("href", "javascript:;");
	buttonShare.setAttribute("onclick", "shareImage()");
	buttonShare.innerHTML = "<i class='fab fa-facebook-f'></i> &nbsp;Compartir en Facebook";

	var breakEl = document.createElement("br");
	// var breakEl1 = document.createElement("br");

	buttons.appendChild(buttonDownload);
	buttons.appendChild(breakEl);
	// buttons.appendChild(breakEl1);
	buttons.appendChild(buttonShare);

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
	buttons.setAttribute("id", "buttons");

	var buttonGuardar = document.createElement("a");
	buttonGuardar.setAttribute("id", "SaveButton");
	buttonGuardar.setAttribute("class", "btn btn-primary");
	buttonGuardar.setAttribute("href", "javascript:;");
	buttonGuardar.setAttribute("onclick", "saveImage()");
	buttonGuardar.innerHTML = "<i class='fas fa-save'></i> &nbsp;Guardar Imagen"

	var breakEl = document.createElement("br");

	var sf = generateSelection();

	var breakEl2 = document.createElement("br");
	// var breakEl3 = document.createElement("br");


	body.appendChild(sf);
	body.appendChild(breakEl2);
	// body.appendChild(breakEl3);
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
	var breakEl = document.createElement("br");	
	var breakEl1 = document.createElement("br");

	main.appendChild(generateHeader());
	main.appendChild(breakEl);
	main.appendChild(breakEl1);
	main.appendChild(body);
	//*******************************************************

	// Stage
	layer = new Konva.Layer();
	stage = new Konva.Stage({
		container: 'ImagePreview',
		width: 312,
		height: 312
	});
	// Image
	imageObj = new Image();
	imageObj.onload = function() {
		image = new Konva.Image({
			image: imageObj,
			y: 34,
			x: 34,
			width: 245,
			height: 240,
			draggable: true
		});
		// Frame
		frameObj = new Image();
		frameObj.onload = function() {
			frame = new Konva.Image({
				image: frameObj,
				// y: 206,
				width: 312,
				height: 312
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
	imageObj.setAttribute('crossOrigin', 'anonymous');

	console.log(imageURL);
};

(function() {

	var main = document.getElementById("main");
	var breakEl = document.createElement("br");	
	var breakEl1 = document.createElement("br");
	//Page initial layout
	//*************************************************************
	var header = generateHeader();
	var home = generateHome();
	//*************************************************************
	main.appendChild(header);
	main.appendChild(breakEl);
	main.appendChild(breakEl1);
	main.appendChild(home);

})();