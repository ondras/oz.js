OZ.Hover = function(elm) {
	OZ.Event.add(elm, "mouseover", function(e) { OZ.DOM.addClass(elm, "hover"); });
	OZ.Event.add(elm, "mouseout", function(e) { OZ.DOM.removeClass(elm, "hover"); });
}

OZ.Table = function(t, mode) {
	var cn = ["even", "odd"];
	var body = t.getElementsByTagName("tbody")[0];
	var rows = body.getElementsByTagName("tr");
	if (mode && mode.sort) {
		var h = t.getElementsByTagName("thead")[0].getElementsByTagName("tr")[0].getElementsByTagName("td");
		var headers = [];
		var click = function(e) {
			var index = headers.indexOf(this);
			var numeric = true;
			var dir = (OZ.DOM.hasClass(this, "asc") ? -1 : 1);			
			var arr = [];
			var rows = body.getElementsByTagName("tr");
			for (var i=0;i<rows.length;i++) {
				var cell = rows[i].getElementsByTagName("td")[index]; 
				var val = cell.innerHTML;
				if (parseFloat(val) != val) { numeric = false; }
				arr.push([val, rows[i]]);
			}
			arr.sort(function(a,b){
				var num = (numeric ? a[0]-b[0] : a[0].localeCompare(b[0]) );
				return num*dir;
			});
			arr.forEach(function(item, i){
				body.appendChild(item[1]);
				if (mode.evenodd) {
    				    OZ.DOM.removeClass(item[1], "even");
				    OZ.DOM.removeClass(item[1], "odd");
				    OZ.DOM.addClass(item[1], cn[i % 2]);
				}
			});
			headers.forEach(function(item){
				OZ.DOM.removeClass(item, "asc");
				OZ.DOM.removeClass(item, "desc");
			});
			OZ.DOM.addClass(this, (dir == 1 ? "asc" : "desc"));
		}
		
		for (var i=0;i<h.length;i++) { 
			headers.push(h[i]); 
			OZ.Event.add(h[i], "click", click);
		}
	}
	for (var i=0;i<rows.length;i++) {
	    var row = rows[i];
	    if (!mode) { continue; }
	    if (mode.hover) { OZ.Hover(row); }
	    if (mode.evenodd) { OZ.DOM.addClass(row, cn[i % 2]); }
	}
}
