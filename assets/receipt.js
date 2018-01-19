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

/**
* Google Analytics
*/
(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
ga('create', 'UA-48811768-1', 'gaerae.com');
ga('send', 'pageview');
