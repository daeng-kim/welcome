const childWindows = [];
const childWindowsAction = [];
let index = 1;
let repeatTerm = 500;

function sleep(ms) {
console.log('test');
  return new Promise(resolve => setTimeout(resolve, ms));
}
async function repeatAction() {
	if(index > 30) {
		return;
	}
	var child = window.open('https://events.ohou.se/promotions/big-promotion');
	child.name = `child${index}`;
	childWindows.push(child);
	childWindowsAction.push(0);
	index++;
}

function clickAction() {
	childWindows.forEach((child, index)=> {
		if (!child || child.closed) {
		  console.warn(`child${index} 창이 닫혀있습니다.`);
		  return;
		}
		setTimeout(() => {
		  try {
			if(child?.benefit && child.benefit[0]) {
				child.benefit?.[0]?.click?.();
				const elem = child.document.elementFromPoint(800, 700);
				if(elem) {
					elem?.click?.();
					let cnt = childWindowsAction[index];
					if(cnt > 100) {
						child.close();
						console.log(`child${index} 100번 넘어서 끕니다.`);					
					}
					console.log(cnt);
					childWindowsAction[index]++;
				}
			}
			
		  } catch (e) {
			console.error(`child${index} 클릭 오류:`, e);
		  }
		}, 500);
	});
}

setTimeout(function() {
	setInterval(repeatAction, 300);
	setInterval(repeatAction, 500);
	setInterval(repeatAction, 700);
	setInterval(clickAction, 100);
}, 8000);
