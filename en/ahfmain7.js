/* for AH Formatter
   Copyright (c) 1999-2016 Antenna House, Inc. All rights reserved.
*/

var s_h0TOC;
var s_h1TOC;
var s_h2TOC;

// UA environment
var s_ua = new getUA();

function getUA()
{
	var ua = navigator.userAgent;
	this.isChrome =
	this.isOpera =
	this.isSafari =
	this.isMozilla =
	this.isIE =
	this.isIE7 =
	this.isMacIE = false;
	if (ua.indexOf('Chrome') != -1) this.isChrome = true;
	else
	if (ua.indexOf('Opera') != -1) this.isOpera = true;
	else
	if (ua.indexOf('Safari') != -1) this.isSafari = true;
	else
	if (ua.indexOf('Gecko') != -1) this.isMozilla = true;
	else
	if (ua.indexOf("MSIE") != -1) {
		this.isIE = true;
		if (ua.indexOf("MSIE 7") != -1) this.isIE7 = true;
		if (ua.indexOf("Mac") != -1) this.isMacIE = true;
	}
	//alert(ua);
}

// initialize
//	typ: 0=normal <ul><li>
//		 1=index
function init(typ)
{
	if (!s_ua.isOpera &&
		!s_ua.isMozilla &&
		!s_ua.isChrome &&
		!s_ua.isSafari &&
		!s_ua.isIE) return;
	if (s_ua.isMacIE) return;

	var prev = document.querySelector("link[rel = 'prev']");
	var prevText = prev ? "<a class='link' href='"+prev.getAttribute("href")+"'>prev</a> " : ""
	var next = document.querySelector("link[rel = 'next']");
	var nextText = next ? " <a class='link' href='"+next.getAttribute("href")+"'>next</a> " : ""
	var start = document.querySelector("link[rel = 'start']");
	var startText = start ? " <a class='link' href='"+start.getAttribute("href")+"'>top</a> " : ""
	var index = document.querySelector("link[rel = 'index']");
	var indexText = index ? " <a class='link' href='"+index.getAttribute("href")+"'>index</a> " : ""
	var version = document.querySelector("meta[name = 'product-version']").getAttribute("content");
	// make index.html list
	var h1 = document.getElementsByTagName("h1");
	if (h1.length > 0) {
		for (var i = 0; i < h1.length; i++) {
			var img = h1.item(i).getElementsByTagName("img").item(0);
			if (img && img.className == "chapttl") img.className += " ttlimg";
		}
		s_h0TOC = document.createElement("div");
		s_h0TOC.setAttribute("id", "dyntoc");
		/*if (version >= 6.3) {
			s_h0TOC.setAttribute("class", "v63up");
		}*/
		var topmenu ="<li><a href='ahf-about.html'>Overview</a></li><li><a href='ahf-gui.html'>Graphical User Interface</a></li><li><a href='ahf-xslcmd.html'>Command-line Interface</a></li><li><a href='ahf-dotnet.html'>.NET Interface</a></li><li><a href='ahf-com.html'>COM Interface</a></li><li><a href='ahf-java.html'>Java Interface</a></li><li><a href='ahf-cpp.html'>C/C++ Interface</a></li><li><a href='ahf-pdf.html'>PDF Output</a></li><li><a href='ahf-svgout.html'>SVG Output</a></li><li><a href='ahf-ps.html'>PostScript<sup>®</sup> Output</a></li><li><a href='ahf-xps.html'>XPS Output</a></li><li><a href='ahf-docxout.html'>Word(docx) Output</a></li><li><a href='ahf-text.html'>TEXT Output</a></li><li><a href='ahf-fo11.html'>XSL-FO Conformance</a></li><li><a href='ahf-css6.html'>CSS Conformance</a></li><li><a href='ahf-svg.html'>SVG Conformance</a></li><li><a href='ahf-mathml3.html'>MathML Conformance</a></li><li><a href='ahf-cgm.html'>CGM Conformance</a></li><li><a href='ahf-focss6.html'>XSL/CSS Properties</a></li><li><a href='ahf-ext.html'>XSL/CSS Extensions</a></li><li><a href='ahf-float.html'>Float Extension</a></li><li><a href='ahf-ruby.html'>Ruby Extension</a></li><li><a href='ahf-spread.html'>Spread Page Master Extension</a></li><li><a href='ahf-analyzer.html'>Automated Analysis</a></li><li><a href='ahf-barcode.html'>Barcode Generator Option</a></li><li><a href='ahf-pantone.html'>PANTONE<sup>®</sup> Option</a></li><li><a href='ahf-optset.html'>Option Setting File</a></li><li><a href='ahf-font.html'>Fonts</a></li><li><a href='ahf-gra.html'>Graphics</a></li><li><a href='ahf-hyp.html'>Hyphenation</a></li><li><a href='ahf-env.html'>Environment Variables</a></li><li><a href='ahf-symlink.html'>Symbolic Links</a></li><li><a href='ahf-module.html'>Installed Modules</a></li><li><a href='ahf-error.html'>Error Messages</a></li><li><a href='ahf-diff.html'>Changes from Previous Versions in Formatting</a></li><li><a href='ahf-tech.html'>Technical Notes</a></li><li><a href='ahf-index.html'>Index</a></li>"
		s_h0TOC.innerHTML = "<ul>"+topmenu+"</ul>"+
			"<div align='center'>"+(version >= 6.3 ? prevText+startText+indexText+nextText : startText+indexText)+"</div>";
		document.body.appendChild(s_h0TOC);
		s_h0TOC.style.visibility = "hidden";
		s_h0TOC.style.display = "block";
		s_h0TOC.width = s_h0TOC.offsetWidth;
		s_h0TOC.height = s_h0TOC.offsetHeight;
		s_h0TOC.style.visibility = "visible";
		s_h0TOC.style.display = "none";
	}

	// make TOC list
	var h1 = document.getElementsByTagName("h1");
	var h2 = document.getElementsByTagName("h2");
	if (h2.length > 0) {
		var img = "<img src='img/toc.gif' class='tocimg"+/*(version >= 6.3 ? " v63up" : "")+*/"' alt='' />";
		var menu = '';
		for (var i = 0; i < h2.length; i++) {
			var node = h2.item(i);
			var id = node.getAttribute("id");
			var txt = getText(node);
			if (id != "") txt = "<a href='#" + id + "'>" + txt + "</a>";
			if (typ==1) {
				if (id.substring(2) > 10000) {
					menu += "</div><div align='center'>";
					typ++;
				}
			}
			menu += (typ==0)? "<li>"+txt+"</li>": " "+txt;
			node.innerHTML += img;
			//node.setAttribute("title", "[TOC]");
		}
		s_h2TOC = document.createElement("div");
		s_h2TOC.setAttribute("id", "dyntoc");
		/*if (version >= 6.3) {
			s_h2TOC.setAttribute("class", "v63up");
		}*/
		var h1text = getText(h1[0]);
		s_h2TOC.innerHTML = (typ==0)? "<div>"+(version >= 6.3 ? "<div class='popuptitle'><a href='#"+h1[0].id+"'>"+h1text+"</a></div>" : "")+"<ul>"+menu+"</ul>"+
			"<div align='center'>"+(version >= 6.3 ? prevText+startText+indexText+nextText : startText)+"</div>":
			"<div align='center'>"+menu+"</div>"+
			"<div align='center'>"+prevText+startText+"</div>";
		document.body.appendChild(s_h2TOC);
		s_h2TOC.style.visibility = "hidden";
		s_h2TOC.style.display = "block";
		s_h2TOC.width = s_h2TOC.offsetWidth;
		s_h2TOC.height = s_h2TOC.offsetHeight;
		s_h2TOC.style.visibility = "visible";
		s_h2TOC.style.display = "none";
	}

	if (version >= 6.3 && typ==0) {
		// make TOC list for each h1
		for (var i = 0; i < h1.length; i++) {
			var chapterBody = h1[i].nextElementSibling;
			var h2 = chapterBody.getElementsByTagName("h2");
			var menu = '';
			if (h2.length > 0) {
				for (var j = 0; j < h2.length; j++) {
					var node = h2.item(j);
					var id = node.getAttribute("id");
					var txt = getText(node);
					if (id != "") txt = "<a href='#" + id + "'>" + txt + "</a>";
					if (typ==1) {
						if (id.substring(2) > 10000) {
							menu += "</div><div align='center'>";
							typ++;
						}
					}
					menu += (typ>=0)? "<li>"+txt+"</li>": " "+txt;
				}
				menu = "<ul>"+menu+"</ul>";
			var h1text = getText(h1[i]);
			h1.item(i).insertAdjacentHTML('beforeBegin', typ==0? "<div class='sidetoc'><div><div class='popuptitle'><a href='#"+h1[i].id+"'>"+h1text+"</a></div>"+menu+
			"<div align='center'>"+prevText+startText+indexText+nextText+"</div></div></div>":
			"<div class='sidetoc index'><div>"+menu+
			"<div align='center'>"+prevText+startText+indexText+"</div></div></div>");
			}
		}
	}
	window.document.onclick = popupTOC;
}

function popupTOC(ev)
{
	var tar;
	if (window.event) {
		ev = event;
		tar = ev.srcElement;
	} else
	if (ev) {
		tar = ev.target;
	}
	if (tar.className == "chapttl ttlimg") {
		if (s_h2TOC) s_h2TOC.style.display = "none";
		popup(s_h0TOC, ev);
	} else
	if (tar.className == "tocimg" /*|| tar.className == "tocimg v63up"*/) {
		if (s_h0TOC) s_h0TOC.style.display = "none";
		popup(s_h2TOC, ev);
	} else {
		//s_h1TOC.style.display = "none";
		if (s_h0TOC) s_h0TOC.style.display = "none";
		if (s_h2TOC) s_h2TOC.style.display = "none";
	}
}

function popup(toc, ev)
{
	var docX, docY, eventX, eventY, screenW, screenH;
	if (s_ua.isIE) {
		eventX = ev.x;
		eventY = ev.y;
		docX = eventX+document.body.scrollLeft/*+document.documentElement.scrollLeft*/;
		docY = eventY+document.body.scrollTop;
		if (s_ua.isIE7) docY += document.documentElement.scrollTop;
		screenW = document.body.clientWidth;
		screenH = document.body.clientHeight;
	} else
	if (s_ua.isOpera) {
		eventX = ev.clientX;
		eventY = ev.clientY;
		docX = eventX+document.body.scrollLeft;
		docY = eventY+document.body.scrollTop;
		screenW = document.body.clientWidth;
		screenH = document.body.clientHeight;
	} else
	if (s_ua.isSafari) {
		eventX = ev.screenX;
		eventY = self.innerHeight-ev.screenY;
		docX = ev.pageX;
		docY = ev.pageY;
		screenW = self.innerWidth;
		screenH = self.innerHeight;
	} else {
		// isChrome isMozilla
		eventX = ev.clientX;
		eventY = ev.clientY;
		docX = ev.pageX;
		docY = ev.pageY;
		screenW = self.innerWidth;
		screenH = self.innerHeight;
	}
	toc.style.top = ((eventY+toc.height < screenH)? docY: docY-toc.height+screenH-eventY)+"px";
	toc.style.left = ((eventX+toc.width < screenW)? docX: docX-toc.width)+"px";
	toc.style.display = "block";
}

function getText(node)
{
	var txt = '';
	var child = node.childNodes;
	for (var i = 0; i < child.length; i++) {
		switch (child.item(i).nodeType) {
		case 3:
			txt += child.item(i).data;
			break;
		case 1:
			if (!child.item(i).classList.contains("noLT") &&
				!child.item(i).classList.contains("vup") /*&&
				!child.item(i).classList.contains("v63up")*/) {
				txt += getText(child.item(i));
			}
			break;
		}
	}
	return txt;
}



function getScrolled() {
	return ( window.pageYOffset !== undefined ) ? window.pageYOffset: document.documentElement.scrollTop;
}


window.onscroll = function() {
	var topButton = document.getElementById("PageTopBtn");
	console.log(topButton);
	( getScrolled() > 50 ) ? topButton.classList.add("fade-in"): topButton.classList.remove("fade-in");
};


/* obsoleted
function syncFrame()
{
	if (!parent.MENU) return;
	var loc = new String(parent.MENU.location);
	var sep = loc.lastIndexOf("/");
	if (sep != -1) {
		var side = loc.substring(sep+1, loc.length);
		var main = new String(document.getElementsByTagName("body")[0].id) + "-side.html";
		if (side != main) {
			parent.MENU.location.href = loc.substring(0, sep+1) + main;
		}
	}
}
*/
