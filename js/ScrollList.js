(function(window){
	var ScrollList = Object || {} || null;

		ScrollList = {
			// 初始化滚动动画样式插件
			initScroll () {
				const $scrollHeight = document.querySelector('.list').clientHeight;
				const $uList = document.querySelector('.list');
				const timer = setInterval(() => {
					this.scrollList($uList, $scrollHeight);
				}, 3000);
			},
			start() {
				this.initScroll();
			},
			// 动画滚动
			scrollList (obj, scrollHeight) {
				const newObj = obj;
				this.animate(newObj, {
					marginTop: -scrollHeight
				}, 0.01, 0.01, () => {
					newObj.style.marginTop = 0;
					const liDom =	document.querySelector('.listItme');
					newObj.appendChild(liDom);
				});
			},
			// 动画效果实现
			animate (obj, json, interval, sp, fn) {
				const newObj = obj;
				clearInterval(newObj.timer);
				// var k = 0;
				// var j = 0;
				function getStyle (obj, arr) {
					if (newObj.currentStyle) {
						return newObj.currentStyle[arr];    // 针对ie
					}
					return document.defaultView.getComputedStyle(obj, null)[arr];
				}
				newObj.timer = setInterval(() => {
					// j ++;
					let flag = true;
					const arr = Object.keys(json);
					// for (const arr in json) {
					let icur = 0;
						// k++;
					if (arr === 'opacity') {
						icur = Math.round(parseFloat(getStyle(obj, arr)) * 100);
					} else {
						icur = parseInt(getStyle(obj, arr), 10);
					}
					let speed = (json[arr] - icur) * sp;
					speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);
					if (icur !== json[arr]) {
						flag = false;
					}
					if (arr === 'opacity') {
						newObj.style.filter = 'alpha(opacity : \'+(icur + speed)+\' )';
						newObj.style.opacity = (icur + speed) / 100;
					} else {
						newObj.style[arr] = `${icur + speed}px`;
					}
					// }
					if (flag) {
						clearInterval(newObj.timer);
						if (fn) {
							fn();
						}
					}
				}, interval);
			  }
		}
		window.ScrollList = ScrollList
})(window)



