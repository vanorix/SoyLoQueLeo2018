var imageURL, imgObj, stage, image, frameObj, frame, path, sharePath;

var frames = ['images/marcos/transparente.png',
	'images/marcos/Marco.png',
	'images/marcos/ciencia-ficcion(final).png',
	'images/marcos/cuento(final).png',
	'images/marcos/historico(final).png',
	'images/marcos/poesia(final).png',
	'images/marcos/terror(final).png'
];

var currentFrame = 1;

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
	// frameSelect.setAttribute("onchange", "setFrame()");
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
	sify.innerText = "Ciencia Ficción";

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
	poesia.innerText = "Poesia";

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

	var label = document.createElement("label");
	label.setAttribute("class", "upload");
	if (document.documentElement.clientWidth < 991) {
		label.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> &nbsp;Hazte una foto";
	} else {
		label.innerHTML = "<i class='fas fa-cloud-upload-alt'></i> &nbsp;Sube una foto";
	}
	var buttonUpload = document.createElement("input");
	buttonUpload.setAttribute("id", "buttonUpload");
	buttonUpload.setAttribute("type", "file");
	buttonUpload.setAttribute("accept", "image/*");
	buttonUpload.setAttribute("capture", "filesystem");
	// buttonUpload.setAttribute("class", "btn btn-primary");
	buttonUpload.setAttribute("onchange", "uploadImage(this)");

	label.appendChild(buttonUpload);

	panel.appendChild(buttonFacebook);
	// panel.appendChild(breakEl);
	// panel.appendChild(breakEl1);
	panel.appendChild(label);

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

var postImageToFacebook = function(imageData) {
	$.post(
		'http://data-uri-to-img-url.herokuapp.com/images.json', {
			image: [{
				data_uri: imageData
			}]
		},
		function(res) {
			console.log(res.url);
		}
	);
}

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

var guid = function() {
	function s4() {
		return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
	}
	return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
}

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

var shareImage = function() {
	// if (path) {
	// 	FB.ui({
	// 		method: 'feed',
	// 		link: path,
	// 		caption: 'Soy Lo que Leo',
	// 		source: path
	// 	}, function(response) {});
	// }
	// var publish = {
	// 	method: 'feed',
	// 	message: 'Soy lo que leo',
	// 	href: window.location.href,
	// 	attachment: {
	// 		name: 'Connect',
	// 		caption: 'Soy lo que leo',
	// 		href: window.location.href,
	// 		media: [{
	// 			type: 'image',
	// 			href: window.location.href,
	// 			src: path
	// 		}],
	// 	},
	// 	action_links: [{
	// 		text: 'Soy lo que leo',
	// 		href: window.location.href
	// 	}],
	// 	user_prompt_message: 'Comparte tu imagen!'
	// };

	// FB.ui(publish);

	// if (sharePath) {
	// 	FB.ui({
	// 		method: 'feed',
	// 		link: sharePath,
	// 		caption: 'Orgullo Dominicano',
	// 		source: sharePath
	// 	}, function(response) {});
	// }
	var fileName = guid() + '.png';
	var imageFile = dataURLtoFile(path, fileName);
	console.log(imageFile);
	FB.ui({
		method: 'share',
		href: window.location.href,
		title: 'Soy lo que leo',
		picture: window.location.href,
		caption: 'Soy lo que leo'
	}, function(res) {});

	// postImageToFacebook(path);
};

var uploadImageFB = function() {
	// fbLogin().then(function(response) {
	// 	console.log(response);
	// });
	fbLogin();
};

var uploadImage = function(input) {
	if (input.files && input.files[0]) {
		var reader = new FileReader();
		reader.onload = function(e) {
			imageURL = e.target.result;
			initCanvas();
		}
		reader.readAsDataURL(input.files[0]);
	} else {
		// path = 
	}
};

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

var saveToServer = function() {
	// var formData = new FormData();
	var to_send = path;
	var settings = {
		"async": true,
		"crossDomain": true,
		"url": "https://1fb96d42.ngrok.io/api/save",
		"method": "POST",
		"headers": {
			"Content-Type": "application/x-www-form-urlencoded"
		},
		"data": {
			"img_data": to_send
		}
	}

	$.ajax(settings).done(function(response) {
		console.log(response);
	});
}

var saveImage = function() {
	stage.find('Transformer').destroy();
	layer.draw();
	path = stage.toDataURL();
	sharePath = window.location.href + path;
	console.log(dataURItoBlob(path));
	console.log(sharePath);
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
	buttonGuardar.innerHTML = "<i class='fas fa-save'></i> &nbsp;¡Listo!"

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
	// preview.appendChild(breakEl);
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
		var cropObj = {
			width: 480,
			height: 490,
		};
		if (document.documentElement.clientWidth < 991) {
			image = new Konva.Image({
				image: imageObj,
				y: 34,
				x: 279,
				width: 240,
				height: 245,
				draggable: true,
				rotation: 90,
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