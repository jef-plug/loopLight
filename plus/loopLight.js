/*
* 符合CMD规范建议用seajs模块化库，依赖jQuery.js
* @author:jef, qq:1737752975。
——————————————————分 割 线——————————————————
##usage：
	var loopObj = require('loopLeight');
	$('.js-click').click(function(){

		loopObj.winning($('.grid'),start,end);

	});

项目引入loopLeight模块后调用loopObj.winning(ele,startIndex,endIndex)，对应参数解释如下，
@parameter: 
	ele闪亮的元素，
	startIndex开始元素的下标，从0开始计数，
	endIndex停止的下标。
##注意：
	闪亮的元素需指定data-id, id值建议从0开始。
	闪亮的
——————————————————分 割 线——————————————————
@sourceCode: https://github.com/jef-plug/loopHeight
*
*/
define(function(require,exports,module) {
	var loopObj = (function($,window,undefined){

		var time = 3, //秒单位
			count = 4, //循环的次数
			unitTime, //元素闪亮切换的时间
			slowIncreaseTime = 0.05, //循环结束定位结束下标缓慢增加的时间 秒
			active = 'active', //闪亮的类名
			id = 'id'; //标识闪亮元素的data-id, 强推[0-N];

		var lock = true, //防止多次触发
			initiate,
			$ele,
			startIndex,
			endIndex,
			len, //闪亮元素的个数
			currentIndex,
			computeCount,
			shockCount; //最后减速定位的个数。

		function INIT(){
			return {
				winning: function (ele,startI,endI) {
					if(!lock){return false};
					lock = false;
					$ele = ele;
					startIndex = startI;
					endIndex = endI;
					currentIndex = startIndex;

					len = $ele.length;
					reduceTime = endIndex - startIndex;
					computeCount = reduceTime > 0 ? reduceTime : len - Math.abs(reduceTime);
					shockCount = count * len + computeCount;
					unitTime = time/count/len;

					this.loop();
				},
				loop: function () {
					currentIndex++;
					if (currentIndex === len) {
						currentIndex = 0;
					}
					shockCount--;
					if(shockCount < computeCount){
						unitTime += slowIncreaseTime;
						if (shockCount < 0) {
							lock = true;
							return false;
						}
					}
					
					initiate.shockLight();
					setTimeout(initiate.loop, unitTime * 1000);
				},

				shockLight: function () {
					$ele.removeClass(active);
					$ele.each(function(idIx,EL){
						if($(EL).data(id) == currentIndex){
							$(EL).addClass(active);
						}
					});
				}
			}
		}

		if(!initiate){
			initiate = INIT();
		}

		return initiate;

	})($,window,undefined);

	module.exports = loopObj
});




