#Mobilzr

##Install
To install `mobilzr.js` please include [jQuery](http://jquery.com) and then mobilzr like so.

	<script type="text/javascript" src="//code.jquery.com/jquery.min.js"></script>
	<script type="text/javascript" src="lib/js/vendor/mobilzr.js"></script>

##Use
To inititalize mobilzr you need to create a new instance of the mobilzr class.

	<script type="text/javascript">
		new Mobilzr($('body'));
	</script>

There are three arguments that you can pass into the function. Only the first one is required, which is a jQuery object that the classes will be added to. The second argument is an object that has the [breakpoints](#breakpoints) and classes. The third is a callback function will be called every time a user resizes the browser window.

	<script type="text/javascript">
		new Mobilzr($('body'), {
			breakpoints : [
				{'class' : 'desktop', 'width' : '>1200'},
				{'class' : 'tablet', 'width' : '>760'},
				{'class' : 'mobile', 'width' : '<760'}
			]
		}, function (object) {
			alert('You are a ' + object.class + ' user.');
		});
	</script>
	
##Breakpoints
***Warning***: Only *one* breakpoint can be active at one time. Priority is from first to last. So you can't have a height and width breakpoint active at the same time.


Breakpoints are how mobilzr determins when to add which class. Breakpoints are simple javascript objects with two properties. Here are the default breakpoints. (These work perfect with iPhone and iPad.)

	{'class' : 'desktop', 'width' : '>1200'}
	{'class' : 'tablet', 'width' : '>760'}
	{'class' : 'mobile', 'width' : '<760'}
	
You can customize breakpoints in a couple of ways. Here are a few more examples.

	{'class' : 'wierd_phone', 'width' : '=321'}
	{'class' : 'tall', 'height' : '>1000'}
