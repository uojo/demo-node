(function (root, factory) {
	if (typeof define === 'function' && define.amd) {
		// AMD
		define([], factory);
	} else if (typeof exports === 'object') {
		// Node, CommonJS-like
		module.exports = factory();
	} else {
		// Browser globals (root is window)
		// root.return Exports = factory(root.jQuery);
	}
}(this, function ($) {
	// methods
	function myFunc(){
		console.log(1)
		
	};
	
	// exposed public method
	return myFunc;
}));
