define(['loopHeight'], function(require,exports,module) {
	var loopObj = require('loopHeight');

	$('.js-click').click(function(){
		var start = $('.active').data('id');
		var len = $('.grid').length;
		var end = Math.floor(Math.random() * len);
		console.log(start+"__"+end);
		
		loopObj.winning($('.grid'),start,end);
	});

})