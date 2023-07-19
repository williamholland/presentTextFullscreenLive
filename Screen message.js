// this is the magic source that makes the text as big as possible
function adjust() {
	ta = document.getElementById("textarea");
	test = document.getElementById("test");
	
	test.textContent=ta.value;
	// Otherwise, the newline would not be counted.
	if (ta.value[ta.value.length-1] == "\n") {
		test.innerHTML += '.';
	}

	ratioX = (window.innerWidth) / test.offsetWidth;
	ratioY = (window.innerHeight) / test.offsetHeight;
	ratio = Math.min(ratioX,ratioY);
	fontSize = Math.floor(30 * ratio) + "px"
	ta.style.fontSize = fontSize;
	newHeight = Math.ceil(test.offsetHeight * ratio);
	//ta.style.height = newHeight + "px";
	//ta.style.top = Math.floor((window.innerHeight - newHeight)/2) + "px";
	ta.style.paddingTop = Math.floor((window.innerHeight - newHeight)/2) + "px";
	ta.style.paddingBottom = Math.floor((window.innerHeight - newHeight)/2) + "px";
	newWidth = Math.ceil(test.offsetWidth * ratio);
	//ta.style.width = newWidth + "px";
	ta.style.paddingLeft = Math.max(0,Math.floor((window.innerWidth - newWidth)/2)) + "px";
	ta.style.paddingRight = Math.max(0,Math.floor((window.innerWidth - newWidth)/2)) + "px";
	 
	//test.innerHTML = newHeight + " " + window.innerHeight + " " + fontSize;
	
	href =  "#t=" + encodeURIComponent(ta.value);
	window.location.hash = href;
}


function validateFontFamily(urlParams) {
  const allowedFonts = [
    'Belanosima',
    'Pangolin',
    'Mynerve',
    'Amatic SC',
    'Permanent Marker',
    'Indie Flower'
  ];
  var font = urlParams.get('font');
  if(allowedFonts.includes(font)) {
    return font;
  } else {
    return 'Belanosima';
  };
}


function isValidCSSColor(color) {
  // Create a regex pattern to match CSS color formats
  var colorRegex = /^(#([A-Fa-f0-9]{3}){1,2})$|^([a-zA-Z]+)$/;

  // Test the string against the regex pattern
  return colorRegex.test(color);
}


function isValidCSSTextAlign(textAlign) {
  var validValues = [
    'left', 'right', 'center', 'justify',
    'start', 'end', 'match-parent'
  ];

  return validValues.includes(textAlign);
}


function validateColor(urlParams) {
  var color = urlParams.get('color');
  if(isValidCSSColor(color)) {
    return color;
  } else {
    return 'white';
  };
}


function validateTextAlign(urlParams) {
  var align = urlParams.get('align');
  if(isValidCSSTextAlign(align)) {
    return align;
  } else {
    return 'left';
  };
}


function setFontFamily(fontFamilyName) {
  document.getElementById('test').style.fontFamily = fontFamilyName;
  document.getElementById('textarea').style.fontFamily = fontFamilyName;
}


function setBackgroundColor(color) {
  document.body.style.backgroundColor = color;
  document.getElementById('textarea').style.backgroundColor = color;
  if(['black', '#000000'].includes(color)) {
    document.body.style.color = 'white';
    document.getElementById('textarea').style.color = 'white';
  };
}

function setTextAlign(align) {
  document.getElementById('test').style.textAlign = align;
  document.getElementById('textarea').style.textAlign = align;
}


// set event listeners to adjust the text
const textarea = document.getElementById('textarea')
document.addEventListener("DOMContentLoaded", function(){
  adjust();
});
textarea.onkeyup = adjust;
textarea.onpaste = adjust;
textarea.oninput = adjust;
addEventListener("resize", (event) => {adjust();});


const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

if(location.hash) {
  const decodedString = decodeURIComponent(location.hash.substring(1));
  textarea.value = decodedString.replace('t=', '');
} else {
  textarea.value = 'Present Text Fullscreen Live';
}

setFontFamily(validateFontFamily(urlParams));
setBackgroundColor(validateColor(urlParams));
setTextAlign(validateTextAlign(urlParams));
