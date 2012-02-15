OZ.CSS3 = { 
	getProperty: function(property) {
		var prefix = this._getPrefix(property);
		if (prefix === null) { return null; }
		return (prefix ? "-" + prefix.toLowerCase() + "-" : "") + property;
	},
	set: function(node, prop, value) {
		var prefix = this._getPrefix(prop);
		if (prefix === null) { return false; }
		var p = (prefix ? prefix + prop.charAt(0).toUpperCase() + prop.substring(1) : prop);
		node.style[p] = value;
		return true;
	},
	_getPrefix: function(property) {
		var prefixes = ["", "ms", "Webkit", "O", "Moz"];
		for (var i=0;i<prefixes.length;i++) {
			var p = prefixes[i];
			var prop = (p ? p + property.charAt(0).toUpperCase() + property.substring(1) : property);
			if (prop in this._node.style) { return p; }
		}
		return null;
	},
	_node: OZ.DOM.elm("div")
}
