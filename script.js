// ==================================================================
// All global variables
// ==================================================================
var imageURL, imgObj, stage, image, frameObj, frame, path, sharePath;

// ==================================================================
// Frames list
// ==================================================================
var frames = ['images/marcos/transparente.png',
	'images/marcos/Marco.png',
	'images/marcos/ciencia-ficcion(final).png',
	'images/marcos/cuento(final).png',
	'images/marcos/historico(final).png',
	'images/marcos/poesia(final).png',
	'images/marcos/terror(final).png'
];

// ==================================================================
// Variable containing the index for the current frame
// ==================================================================
var currentFrame = 1;

// ==================================================================
// Generates all header elements
// ==================================================================
var generateHeader = function() {
	var header = document.createElement("div");
	header.setAttribute("class", "head");
	header.setAttribute("id", "head");
	var imgHead = document.createElement("img");
	imgHead.setAttribute("src", "images/Soy-Lo-Que-Leo.png");
	imgHead.setAttribute("id", "headerImage");

	header.appendChild(imgHead);

	return header;
};

// ==================================================================
// Generates text element concerning the contest.
// ==================================================================
var generateContest = function() {
	var container = document.createElement("div");
	container.setAttribute("class", "contest");
	var titulo = document.createElement("h2");
	titulo.setAttribute("class", "contest_title");
	titulo.innerHTML = "Participa en nuestro concurso:";

	var pasos = document.createElement("ul");
	pasos.setAttribute("class", "favth-list-square");
	var paso1 = document.createElement("li");
	paso1.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> Sube tu foto usando la aplicación.";
	var paso2 = document.createElement("li");
	paso2.innerHTML = "<i class='far fa-object-group'></i> Elige tu marco favorito y descárgala.";
	var paso3 = document.createElement("li");
	paso3.innerHTML = "<i class='fab fa-instagram'></i> Compartela en Instagram utilizando el hashtag <span class='hashtag'>#SoyLoQueLeo.</span>";
	var paso4 = document.createElement("li");
	paso4.innerHTML = "<i class='fas fa-tag'></i> Etiqueta las cuentas <a href='https://www.instagram.com/vicerdo/'>@Vicerdo</a> y <a href='https://www.instagram.com/tubiblioteca/'>@tubiblioteca</a>.";
	var text = document.createElement("p");
	text.setAttribute("id", "contest_paragraph");
	text.innerHTML = "La foto con más  	&#34;likes&#34; gana una de nuestras obras literarias.<br><em>¡El ganador será anunciado a través de nuestras redes sociales!</em>.<br> <span style='color:#ED2024'>*Se sortearán dos libros cada día.</span>";

	pasos.appendChild(paso1);
	pasos.appendChild(paso2);
	pasos.appendChild(paso3);
	pasos.appendChild(paso4);

	container.appendChild(titulo);
	container.appendChild(pasos);
	container.appendChild(text);

	return container;
};

// ==================================================================
// Generate all frame selection elements
// ==================================================================
var generateSelection = function() {
	var dropdown = document.createElement("div");
	dropdown.setAttribute("class", "dropdown");
	dropdown.setAttribute("id", "dropdown");

	var toggle = document.createElement("button");
	toggle.setAttribute("class", "btn btn-secondary dropdown-toggle");
	toggle.setAttribute("type", "button");
	toggle.setAttribute("data-toggle", "dropdown");
	toggle.setAttribute("aria-haspopup", "true");
	toggle.setAttribute("aria-expanded", "false");
	toggle.setAttribute("id", "dropdown-toggle");
	toggle.innerText = "¿Cuál de estos géneros es tu favorito?";

	var frameSelect = document.createElement("div");
	frameSelect.setAttribute("id", "dropdown-menu");
	frameSelect.setAttribute("aria-labelledby", "dropdown-toggle");
	frameSelect.setAttribute("class", "dropdown-menu");

	var patria = document.createElement("button");
	patria.setAttribute("class", "dropdown-item");
	patria.setAttribute("type", "button");
	patria.setAttribute("onclick", "setFrame(1)");
	patria.innerText = "Patria";

	var sify = document.createElement("button");
	sify.setAttribute("class", "dropdown-item");
	sify.setAttribute("type", "button");
	sify.setAttribute("onclick", "setFrame(2)");
	sify.innerText = "Ciencia ficción";

	var cuento = document.createElement("button");
	cuento.setAttribute("class", "dropdown-item");
	cuento.setAttribute("type", "button");
	cuento.setAttribute("onclick", "setFrame(3)");
	cuento.innerText = "Cuentos";

	var historico = document.createElement("button");
	historico.setAttribute("class", "dropdown-item");
	historico.setAttribute("type", "button");
	historico.setAttribute("onclick", "setFrame(4)");
	historico.innerText = "Historia";

	var poesia = document.createElement("button");
	poesia.setAttribute("class", "dropdown-item");
	poesia.setAttribute("type", "button");
	poesia.setAttribute("onclick", "setFrame(5)");
	poesia.innerText = "Poesía";

	var terror = document.createElement("button");
	terror.setAttribute("class", "dropdown-item");
	terror.setAttribute("type", "button");
	terror.setAttribute("onclick", "setFrame(6)");
	terror.innerText = "Terror";

	frameSelect.appendChild(patria);
	frameSelect.appendChild(sify);
	frameSelect.appendChild(cuento);
	frameSelect.appendChild(historico);
	frameSelect.appendChild(poesia);
	frameSelect.appendChild(terror);

	dropdown.appendChild(toggle);
	dropdown.appendChild(frameSelect);

	return dropdown;
};

// ==================================================================
// Set the currentFrame variable to the selected frame and re-initiliazes
// the canvas section
// ==================================================================
var setFrame = function(selection) {
	currentFrame = selection;
	initCanvas();
};

// ==================================================================
// Generates all homepage elements
// ==================================================================
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

	var label = document.createElement("label");
	label.setAttribute("class", "upload");
	if (document.documentElement.clientWidth < 991) {
		label.innerHTML = "<i class='fas fa-camera'></i> &nbsp;Hazte una foto";
	} else {
		label.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> &nbsp;Sube una foto";
	}
	var buttonUpload = document.createElement("input");
	buttonUpload.setAttribute("id", "buttonUpload");
	buttonUpload.setAttribute("type", "file");
	buttonUpload.setAttribute("accept", "image/*");
	buttonUpload.setAttribute("capture", "filesystem");
	buttonUpload.setAttribute("onchange", "uploadImage(this)");

	label.appendChild(buttonUpload);

	panel.appendChild(buttonFacebook);
	panel.appendChild(label);

	body.appendChild(panel);
	return body;
};

// ==================================================================
// Clears the specified HTML element of all its child nodes
// ==================================================================
var clearElement = function(id) {
	var list = document.getElementById(id);

	while (list.hasChildNodes()) {
		list.removeChild(list.firstChild);
	}
};

// ==================================================================
// Logs in to a Facebook account using Oauth and FB sdk
// ==================================================================
var fbLogin = function() {
	FB.login(function(response) {
		// console.log(response);
		if (response.status === 'connected') {
			FB.api('/me', 'GET', {
					fields: 'picture.width(306).height(306)'
				},
				function(response) {
					// console.log(response);
					imageURL = response.picture.data.url;
					initCanvas();
				});
		}
	}, {
		scope: 'email'
	});
};

// ==================================================================
// It's supposed to post an image to facebook (maybe for a later release)
// ==================================================================
var postImageToFacebook = function(imageData) {
	$.post(
		'http://data-uri-to-img-url.herokuapp.com/images.json', {
			image: [{
				data_uri: imageData
			}]
		},
		function(res) {
			// console.log(res.url);
		}
	);
}

// ==================================================================
// Transforms dataURL to Blob object
// ==================================================================
var dataURItoBlob = function(dataURI) {
	// convert base64/URLEncoded data component to raw binary data held in a string
	var byteString;
	if (dataURI.split(',')[0].indexOf('base64') >= 0)
		byteString = atob(dataURI.split(',')[1]);
	else
		byteString = unescape(dataURI.split(',')[1]);

	// separate out the mime component
	var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];

	// write the bytes of the string to a typed array
	var ia = new Uint8Array(byteString.length);
	for (var i = 0; i < byteString.length; i++) {
		ia[i] = byteString.charCodeAt(i);
	}

	return new Blob([ia], {
		type: mimeString
	});
}

// ==================================================================
// Generates a random series of number simulatin an UUID
// ==================================================================
var guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

// ==================================================================
// Transforms data URL to JS File object
// ==================================================================
var dataURLtoFile = function(dataurl, filename) {
	var arr = dataurl.split(','),
		mime = arr[0].match(/:(.*?);/)[1],
		bstr = atob(arr[1]),
		n = bstr.length,
		u8arr = new Uint8Array(n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new File([u8arr], filename, {
		type: mime
	});
}

// ==================================================================
// Opens a FaceBook UI window to share the image in the client's feed
// ==================================================================
var shareImage = function() {
	var fileName = guid() + '.png';
	var imageFile = dataURLtoFile(path, fileName);
	// console.log(imageFile);
	FB.ui({
		method: 'share',
		href: window.location.href,
		title: 'Soy lo que leo',
		picture: window.location.href,
		caption: 'Soy lo que leo'
	}, function(res) {});

	// postImageToFacebook(path);
};

// ==================================================================
// Loads the uploaded image using the LoadImage library
// ==================================================================
var imageLoader = function(imageFile) {
	var options;
	if (document.documentElement.clientWidth < 991) {
		options = {
			maxWidth: 420,
			maxHeight: 420,
			orientation: true,
			crop: true
		}
	} else {
		options = {
			maxWidth: 420,
			maxHeight: 420,
			orientation: true,
			crop: true
		}
	}
	var loadingImage = loadImage(
		imageFile,
		function(img) {
			imageURL = img.toDataURL();
			// console.log(imageURL);
			initCanvas();
		}, options
	);
};

// ==================================================================
// Uploads and image from facebook
// ==================================================================
var uploadImageFB = function() {
	fbLogin();
};

// ==================================================================
// Takes the uploaded image and transforms it to base64
// ==================================================================
var uploadImage = function(input) {
	imageLoader(input.files[0]);
};

// ==================================================================
// Creates a temporary link and anchor element to download the image
// that was edit.
// ==================================================================
var downloadImage = function() {
	var linkDownload = document.createElement("a");
	var imageFile = dataURItoBlob(path);
	linkDownload.download = "SoyLoQueLeo.png";
	linkDownload.href = URL.createObjectURL(imageFile);
	document.body.appendChild(linkDownload);
	linkDownload.click();
	document.body.removeChild(linkDownload);
	delete linkDownload;
};

// ==================================================================
// Sends a base64 image to the server using an ajax call
// ==================================================================
var saveToServer = function() {
	// var formData = new FormData();
	var to_send = path;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://563a42be.ngrok.io/api/save",
		"method": "POST",
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"img_data": to_send
		}
	}

	$.ajax(settings).done(function(response) {
		// console.log(response);
	});
}

// ==================================================================
// Saves the edited image and sends it through an ajax call to the server
// ==================================================================
var saveImage = function() {
	stage.find('Transformer').destroy();
	layer.draw();
	path = stage.toDataURL();
	sharePath = window.location.href + path;
	// console.log(dataURItoBlob(path));
	// console.log(sharePath);
	saveToServer();
	// console.log(path);

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
	buttonDownload.innerHTML = "<i class='fas fa-cloud-download-alt'></i> &nbsp;Descarga tu imagen";

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
	buttons.appendChild(buttonShare);
};

// ==================================================================
// Layout for the image editing section on the app
// ==================================================================
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
	buttonGuardar.innerHTML = "<i class='fas fa-save'></i> &nbsp;¡Listo!";

	var resetLink = document.createElement("a");
	resetLink.setAttribute("id", "reset");
	resetLink.setAttribute("class", "btn btn-secundary");
	resetLink.setAttribute("onclick", "location.reload()");
	resetLink.setAttribute("href", "javascript:;");
	resetLink.innerText = "Empezar denuevo";

	var breakEl = document.createElement("br");

	var sf = generateSelection();

	var breakEl2 = document.createElement("br");
	// var breakEl3 = document.createElement("br");


	body.appendChild(sf);
	body.appendChild(breakEl2);
	// body.appendChild(breakEl3);
	thumb.appendChild(img);
	buttons.appendChild(buttonGuardar);
	buttons.appendChild(breakEl);
	buttons.appendChild(resetLink);

	preview.appendChild(thumb);
	preview.appendChild(buttons);
	body.appendChild(preview);

	return body;
};

// ==================================================================
// Initializes canvas element with uploaded image and frame using Konva
// ==================================================================
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
		var cropObj = {
			width: 480,
			height: 490,
		};
		if (document.documentElement.clientWidth < 991) {
			image = new Konva.Image({
				image: imageObj,
				y: 34,
				x: 34,
				width: 245,
				height: 245,
				draggable: true
				// rotation: 90,
				// crop: cropObj
			});
		} else {
			image = new Konva.Image({
				image: imageObj,
				y: 34,
				x: 34,
				width: 245,
				height: 240,
				draggable: true,
				// crop: cropObj
			});
		}
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

	// console.log(imageURL);
};

// ==================================================================
// Handles the elements droped on the drop zone.
// ==================================================================
var dropHandler = function(ev) {
	console.log('File(s) dropped');

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();

	if (ev.dataTransfer.items) {
		// Use DataTransferItemList interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.items.length; i++) {
			// If dropped items aren't files, reject them
			if (ev.dataTransfer.items[i].kind === 'file') {
				var file = ev.dataTransfer.items[i].getAsFile();
				imageLoader(file);
				console.log('... file[' + i + '].name = ' + file.name);
				return 0;
			}
		}
	} else {
		// Use DataTransfer interface to access the file(s)
		for (var i = 0; i < ev.dataTransfer.files.length; i++) {
			imageLoader(ev.dataTransfer.files[i]);
			return 0;
			// console.log('... file[' + i + '].name = ' + ev.dataTransfer.files[i].name);
		}
	}

	// Pass event to removeDragData for cleanup
	removeDragData(ev)
};

// ==================================================================
// Handles the drag over event on the drop zone.
// ==================================================================
var dragOverHandler = function(ev) {
	console.log('File(s) in drop zone');

	// Prevent default behavior (Prevent file from being opened)
	ev.preventDefault();
};


// ==================================================================
// Application entry point.
// ==================================================================
(function() {

	var main = document.getElementById("main");
	// ==============================================================
	// Integrating drag and drop funciotality on the body element
	// ==============================================================
	main.setAttribute("ondrop", "dropHandler(event)");
	main.setAttribute("ondragover", "dragOverHandler(event)");
	// main.setAttribute("class", "drop__zone");

	var breakEl = document.createElement("br");
	var breakEl1 = document.createElement("br");
	var breakEl2 = document.createElement("br");
	var breakEl3 = document.createElement("br");
	//Page initial layout
	//*************************************************************
	var header = generateHeader();
	var home = generateHome();
	var contest = generateContest();
	home.appendChild(breakEl2);
	home.appendChild(breakEl3);
	home.appendChild(contest);
	//*************************************************************
	main.appendChild(header);
	main.appendChild(breakEl);
	main.appendChild(breakEl1);
	main.appendChild(home);

})();