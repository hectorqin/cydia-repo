function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays);
	document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=");
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1;
			c_end = document.cookie.indexOf(";", c_start);
			if (c_end == -1) {
				c_end = document.cookie.length;
			}
    	return unescape(document.cookie.substring(c_start, c_end));
		}
	}
	return "";
}

function loadRelease() {
	$.ajax({
		type: 'GET',
		url: "/Release",
		dataType: 'text',
		cache: true,
		success: function (data) {
			var info = data.split("\n");
			var attrs = {};
			for (let j = 0; j < info.length; j++) {
				var attr = info[j].split(": ", 2)
				if (attr.length > 1 && attr[0]) {
					attrs[attr[0]] = info[j].replace(attr[0] + ": ", "");
				}
			}
			var html = template("stats_tpl", attrs);
			var container = document.querySelector('#stats_zone');
        	container.innerHTML = html;
		}
	});
}

function loadPackages() {
	$.ajax({
		type: 'GET',
		url: "/Packages",
		dataType: 'text',
		cache: true,
		success: function (data) {
			data = data.split("\n\n");
			var packageList = [];
			for (let i = 0; i < data.length; i++) {
				if (data[i]) {
					var info = data[i].split("\n");
					var attrs = {};
					for (let j = 0; j < info.length; j++) {
						var attr = info[j].split(": ", 2)
						if (attr.length > 1 && attr[0]) {
							attrs[attr[0]] = info[j].replace(attr[0] + ": ", "");
						}
					}
					packageList.push(attrs);
				}
			}
			var html = template("tweaks_tpl", {
				list: packageList
			});
			var container = document.querySelector('#tweaks_zone');
        	container.innerHTML = html;
		}
	});
}

var isCydia = navigator.userAgent.search(/Cydia/);
if (isCydia != -1) {
	document.body.classList.add("cydia");
}

loadRelease();
loadPackages();

