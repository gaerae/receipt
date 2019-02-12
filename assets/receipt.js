/**
* Opener data Value
*/
function getData(sElementId) {
  return $(opener.document).find(sElementId).val();
}

/**
* Opener data Text print
*/
function getDataText(sElementId) {
  $(sElementId).text(getData(sElementId));
}

/**
* Opener data Money format print
*/
function getDataMoney(sElementId) {
  var iMoney = getData(sElementId).replace(/,/gi, '');
  for (iLoop=1; iLoop <= iMoney.length; iLoop++) {
      $(sElementId +'_'+ iLoop).text(iMoney.substr(iMoney.length - iLoop, 1));
  }
}

/**
* Random Int
*/
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

/**
* Window print
*/
function popPrint() {
  window.print();
}

/**
* Base64 encode
*/
function base64Encode(str) {
  return btoa(encodeURIComponent(escape(str)));
}

/**
* Base64 decode
*/
function base64Decode(str) {
  return unescape(decodeURIComponent(atob(str)));
}

/**
* Resize Popup
*/
function winResize() {
  var Dwidth = parseInt(document.body.scrollWidth);
  var Dheight = parseInt(document.body.scrollHeight);
  var divEl = document.createElement('div');

  divEl.style.position = 'absolute';
  divEl.style.left = '0px';
  divEl.style.top = '0px';
  divEl.style.width = '100%';
  divEl.style.height = '100%';

  document.body.appendChild(divEl);
  if (navigator.userAgent.indexOf('MSIE') != -1) {
    window.resizeBy(Dwidth - divEl.offsetWidth, Dheight - divEl.offsetHeight + 10);
  } else {
    window.resizeBy(Dwidth - divEl.offsetWidth, Dheight - divEl.offsetHeight);
  }
  document.body.removeChild(divEl);
}
