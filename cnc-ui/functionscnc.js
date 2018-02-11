/* These are functions from functions.js */
/* Cleaned up so I can read the bloody thing */

function runCommand(d,b)
{ var a=$("#commandForm");
  d+="\n";url=b?"/command_silent":"/command";
  var c=$.post(url,d);
  if(!b)
  {c.done(function(e){$("#result").empty();$.each(e.split("\n"),function(f){$("#result").append(this+"<br/>")})})}}

function runCommandSilent(a){runCommand(a,true)}

/* 
Data Format next gen send as string          <Idle,MPos:0.0000,0.0000,80.0000,WPos:0.0000,0.0000,104.6387>
Data format actual send byte after byte      C: X:1.0000 Y:0.0000 Z:104.6387         MCS: X:1.0000 Y:0.0000 Z:80.0000
 */
function runCommandCallback(cmd,callback) {
    var url = "/command";
    cmd += "\n";
    var posting = $.post( url, cmd, callback);
    posting.done(function( data ) {
      console.log(data);
      var values = data.split(/[\s,;]+/);
	console.log(values[3])
      $("#foo").val(data.toString());
      $("#x_Wpos").val(values[2]);
      $("#y_Wpos").val(values[3]);
      $("#z_Wpos").val(values[4]);
    });
}
function runCommandCallback2(cmd,callback) {
    var url = "/command";
    cmd += "\n";
    var posting = $.post( url, cmd, callback);
    posting.done(function( data ) {
      console.log(data);
      var values = data.split(/[\s,;]+/);
	console.log(values[3])
      $("#foo").val(data.toString());
      $("#x_Mpos").val(values[2]);
      $("#y_Mpos").val(values[3]);
      $("#z_Mpos").val(values[4]);
    });
}

function jogXYClick(a){runCommand("G91 G0 "+a+" F"+document.getElementById("xy_velocity").value+" G90",true)}

function jogZClick(a){runCommand("G91 G0 "+a+" F"+document.getElementById("z_velocity").value+" G90",true)}

function extrude(g,d,c)
{ var f=document.getElementById("extrude_length").value;
  var e=document.getElementById("extrude_velocity").value;
  var h=(g.currentTarget.id=="extrude")?1:-1;
  runCommand("G91 G0 E"+(f*h)+" F"+e+" G90",true)}

function motorsOff(a){runCommand("M18",true)}
function motorsOn(a){runCommand("M17",true)}

function handleFileSelect(a){var d=a.target.files;var b=[];for(var c=0,e;e=d[c];c++){b.push("<li><strong>",escape(e.name),"</strong> (",e.type||"n/a",") - ",e.size," bytes, last modified: ",e.lastModifiedDate?e.lastModifiedDate.toLocaleDateString():"n/a","</li>")}document.getElementById("list").innerHTML="<ul>"+b.join("")+"</ul>"}

function upload()
{ $("#progress").empty();
  $("#uploadresult").empty();
  var b=document.getElementById("files").files[0];
  var a=new FileReader();a.readAsBinaryString(b);
  a.onloadend=function(c){xhr=new XMLHttpRequest();
  xhr.open("POST","/upload",true);
  xhr.setRequestHeader("X-Filename",b.name); 
  XMLHttpRequest.prototype.mySendAsBinary=function(k)
    { var h=new ArrayBuffer(k.length);
       var f=new Uint8Array(h,0);
       for (var g=0;g<k.length;g++)
         { f[g]=(k.charCodeAt(g)&255)
         }
       if(typeof window.Blob=="function") { 
         var e=new Blob([h])
       } else { 
         var j=new (window.MozBlobBuilder||window.WebKitBlobBuilder||window.BlobBuilder)();
         j.append(h);
        var e=j.getBlob()
      }
      this.send(e)
    };
    var d=xhr.upload||xhr;
    d.addEventListener("progress",function(i) { 
       var f=i.position||i.loaded;
       var h=i.totalSize||i.total;
       var g=Math.round((f/h)*100); 
       $("#progress").empty().append("uploaded "+g+"%")
    } );
   xhr.onreadystatechange=function() { 
      if(xhr.readyState==4) { 
       if(xhr.status==200) {
            $("#uploadresult").empty().append("Uploaded "+b.name+" OK")
        } else { 
            $("#uploadresult").empty().append("Uploading "+b.name+" Failed")
       }
    }
  };
  xhr.mySendAsBinary(c.target.result)}
}

function copyofupload(){$("#progress").empty();$("#uploadresult").empty();var b=document.getElementById("files").files[0];var a=new FileReader();a.readAsBinaryString(b);a.onloadend=function(c){xhr=new XMLHttpRequest();xhr.open("POST","upload",true);xhr.setRequestHeader("X-Filename",b.name);XMLHttpRequest.prototype.mySendAsBinary=function(k){var h=new ArrayBuffer(k.length);var f=new Uint8Array(h,0);for(var g=0;g<k.length;g++){f[g]=(k.charCodeAt(g)&255)}if(typeof window.Blob=="function"){var e=new Blob([h])}else{var j=new (window.MozBlobBuilder||window.WebKitBlobBuilder||window.BlobBuilder)();j.append(h);var e=j.getBlob()}this.send(e)};var d=xhr.upload||xhr;d.addEventListener("progress",function(i){var f=i.position||i.loaded;var h=i.totalSize||i.total;var g=Math.round((f/h)*100);$("#progress").empty().append("uploaded "+g+"%")});xhr.onreadystatechange=function(){if(xhr.readyState==4){if(xhr.status==200){$("#uploadresult").empty().append("Uploaded OK")}else{$("#uploadresult").empty().append("Upload Failed")}}};xhr.mySendAsBinary(c.target.result)}}

function playFile(a){runCommandSilent("play /sd/"+a)}

function refreshFiles()
{ document.getElementById("fileList").innerHTML="";
   runCommandCallback("M20",function(a)
      { $.each(a.split("\n"),function(c){var e=this.trim();if(e.match(/\.g(code)?$/)){var d=document.getElementById("fileList");var g=d.insertRow(-1);var b=g.insertCell(0);var f=document.createTextNode(e);b.appendChild(f);b=g.insertCell(1);b.innerHTML="[<a href='javascript:void(0);' onclick='playFile(\""+e+"\");'>Play</a>]"}})})};

function getgcodeFiles()
{ document.getElementById("fileList").innerHTML="";   runCommandCallback("M20",function(a)
      { $.each(a.split("\n"),function(c){var e=this.trim();if(e.match(/\.g(code)?$/)){var d=document.getElementById("fileList");var g=d.insertRow(-1);var b=g.insertCell(0);var f=document.createTextNode(e);b.appendChild(f);b=g.insertCell(1);b.innerHTML="[<a href='javascript:void(0);' onclick='checkfile(\""+e+"\");'>Run GCode</a>]"}})})};

function checkfile(e)
{ if (confirm('Start the CNC machining of file? \n'+e)) 
      playFile(e);   /* was playFile(\""+e+\""); */
}

/* These are new CNC specific functions */


function spindleON(){runCommand("M3",true)}
function spindleOFF(){runCommand("M5",true)}
function reset_smoothie(a){runCommand("reset",true)}
function home_endstop(a){runCommand("$H",true)}
function unlock_endstop(a){runCommand("$X",true)}
function auto_probe(a){runCommand("G38.2 Z-30"+" G10 L20 P1 Z0",true)}

function zeroX(a){runCommand("G10 L20 P1 X0",true)}
function zeroY(a){runCommand("G10 L20 P1 Y0",true)}
function zeroZ(a){runCommand("G10 L20 P1 Z0",true)} 


/* Todo understand how to add curent position x_Mpos to x_override for make this usefull */
function posXset()
{ var x=document.getElementById("x_override").value;
  runCommand("G10 L20 P1 X"+x,false);
}

function posYset()
{ var x=document.getElementById("y_override").value;
  runCommand("G10 L20 P1 Y"+x,false);
}

function posZset()
{ var x=document.getElementById("z_override").value;
  runCommand("G10 L20 P1 Z"+x,false);
}


/* Todo make this to work */
function getPosition(){runCommand("M114",false)}

function getEndStops()
{ var d=$("M119");
  //var a=$("#endstops");
  d+="\n";
  url="/command";
  var c=$.post(url,d);
  c.done(function(e){$("#end_stops").empty();$.each(e.split("\n"),function(f){$("#end_stops").append(this)})})}



