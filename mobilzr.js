if (typeof window.jQuery === 'undefined') {
	alert('wtf?');
}

var Mobilzr = function (node, op) {
	o = $.extend({
		breakpoints : [{'class' : 'mobile', 'width' : '<760'}, {'class' : 'desktop', 'width' : '>760'}]
	}, op);
	if (!(node instanceof jQuery)) {
		return false;
	}
	this.node = node;
	this.o = o;
	this.init();
};

Mobilzr.prototype.init = function() {
	this.meta();
	this.w = {h : $(window).height(), w : $(window).width()};
	this.check();
};

Mobilzr.prototype.meta = function() {
	//create all the meta tags needed to scale to 1.0
};

Mobilzr.prototype.check = function() {
	var _m = this;
	$(window).resize(function() {
		$(window).height();
		$(window).width();
		if (_m.w.h !== $(window).height() || _m.w.w !== $(window).width()) {
			_m.node.removeClass(_m.KLASS_USE);
			_m.KLASS_USE = '';
			_m.w = {h : $(window).height(), w : $(window).width()};
			_m.check();
		}
	});
	var is = function(cur, check, size) {
		switch (check) {
			case '>' :
				return (cur > size);
			case '<' :
				return (cur < size);
			case '=' :
				return (cur === size);
			default :
				return false;
		}
	};
	_m.IS_DONE_BREAK = false;
	_m.KLASS_USE = '';
	$(_m.o.breakpoints).each(function (i, k) {
		if (_m.IS_DONE_BREAK === true) {
			return;
		}
		if (typeof k !== 'object') {
			return;
		}
		var klass = k['class'], size, thing;
		if (typeof k['width'] !== 'undefined') {
			size = k['width'];
			thing = 'width';
		} else if (typeof k['height'] !== 'undefined') {
			size = k['height'];
			thing = 'height';
		}
		var check = size.replace(/([0-9]+)/, '');
		size = size.replace(/([^0-9]+)/, '');
		var ooo = {'width' : $(window).width(), 'height' : $(window).height()};
		var val = ooo[thing];
		if (is(val, check, size)) {
			_m.IS_DONE_BREAK = true;
			_m.node.addClass(klass);
			_m.KLASS_USE = klass;
			$('body').html($('head').attr('class'));
		}
	});
};