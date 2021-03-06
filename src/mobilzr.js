/* Mobilzr.js by Jason Silberman - http://bawz.is */
if (typeof window.jQuery === 'undefined') {
	alert('Please include jquery...');
} else {
	(function (w, d, jq) {
		var Mobilzr = function (node, op, cb) {
			var opts = { breakpoints : [{'class' : 'desktop', 'width' : '>1200'}, {'class' : 'tablet', 'width' : '>760'}, {'class' : 'mobile', 'width' : '<760'}] };
			var o = (typeof op === 'object') ? jq.extend(opts, op) : opts;

			if (!(node instanceof jq)) {
				return false;
			}
			if (typeof cb === 'function') {
				this.cb = cb;
			} else if (typeof op === 'function') {
				this.cb = op;
			}
			this.node = node;
			this.o = o;
			this.init();
		};

		Mobilzr.prototype.init = function() {
			this.meta();
			this.w = {h : jq(w).height(), w : jq(w).width()};
			this.check();
		};

		Mobilzr.prototype.meta = function() {
			var _m = this;
			var tags = [{name : 'apple-mobile-web-app-capable', content : 'yes'}, {name : 'viewport', content : 'width=device-width, initial-scale=1, user-scalable=false'}], tag;
			for (var i=0;i<tags.length;i++) {
				tag = d.createElement('meta');
				tag.name = tags[i].name;
				tag.content = tags[i].content;
				d.head.appendChild(tag);
			}
		};

		Mobilzr.prototype.check = function() {
			var _m = this;
			jq(w).resize(function() {
				jq(w).height();
				jq(w).width();
				if (_m.w.h !== jq(w).height() || _m.w.w !== jq(w).width()) {
					_m.node.removeClass(_m.KLASS_USE);
					_m.KLASS_USE = '';
					_m.w = {h : jq(w).height(), w : jq(w).width()};
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
			jq(_m.o.breakpoints).each(function (i, k) {
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
				var ooo = {'width' : jq(w).width(), 'height' : jq(w).height()};
				var val = ooo[thing];
				if (is(val, check, size)) {
					_m.IS_DONE_BREAK = true;
					_m.node.addClass(klass);
					_m.KLASS_USE = klass;
					if (typeof _m.cb === 'function') {
						_m.cb.call(window, k);
					}
				}
			});
			return _m.KLASS_USE;
		};
		window.Mobilzr = Mobilzr;
	})(window, window.document, window.jQuery);
}
