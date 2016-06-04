/*
  BLUECONIC Script
 */
(function() {
  // Change
  this.bcHostname = 'bc.nxp.com';

  // Do not change
  var protocol = (("https:" == document.location.protocol) ? "https://" : "http://");
  var bcScript = document.createElement('script');bcScript.async = true;
  bcScript.src = protocol + this.bcHostname + '/frontend/static/javascript/blueconic/blueconic.min.js';
  (document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(bcScript);
})();