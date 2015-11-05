jQuery(function($) {
	var Global = function() {
		this.___construct.call(this);
	}, public = Global.prototype;

	/* Constants
	--------------------------------------------------------------------- */
	/* Public Properties
	--------------------------------------------------------------------- */
	public.selector = { };

	/* Private Properties
	--------------------------------------------------------------------- */
	/* Construct
	--------------------------------------------------------------------- */
	public.___construct = function() {
		this.listen();
	};

	/* Public Methods
	--------------------------------------------------------------------- */
	public.listen = function() { };

	public.ajax = function(data, target, method, callback, async, delay) {
		//check asynchronous if enabled
		async = (async) ? true: false;

		//if there is a delay
		delay = (delay === undefined) ? 0 : delay;

		//call an ajax request
		setTimeout(function() {
			$.ajax({
				type: method.toUpperCase(),
				url: target,
				data: data,
				success: callback,
				async: async
			});
		}, delay);

		return this;
	};

	return new Global();
});