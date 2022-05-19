//swiper
var swiper = new Swiper(".contents-moneybox.swiper", {
    slidesPerView: "auto"
});

//이체 레이어창 
const transferOpenBtn = document.querySelector('.account-transfer');
const transferClosedBtn = document.querySelector('.layer-transfer .closed-btn');
const transferLayer = document.querySelector('.layer-transfer');

transferOpenBtn.addEventListener('click',function(){
    transferLayer.style.top = '0';
})
transferClosedBtn.addEventListener('click',function(){
    transferLayer.style.top = '100vh';
})


//contents 드래그 높낮이 조정
const contentsEl = document.querySelector('.contents');
const dragboxEl = document.querySelector('.contents-dragbox');
const currentTop = getStyleProperty(contentsEl, 'top');

let 누를때좌표=null;
let 뗄때좌표=null;
let 현재좌표=null;

const maxTop =  99; //top최대위치값
const defaultTop = Number(getStyleProperty(contentsEl, 'top').slice(0, -2)); //top기본세팅값
const movable = defaultTop - maxTop; //top이 움직일 수 있는 영역

function getStyleProperty(target, property){
    return getComputedStyle(target).getPropertyValue(property);
}

dragboxEl.addEventListener('mousedown', function(e){ 
    contentsEl.style.transition = 'none';
    누를때좌표=e.pageY;

    document.addEventListener( 'mousemove', moveMouse );
    document.addEventListener( 'mouseup', upMouse ); 
}); 

function moveMouse(e){
    e.preventDefault();
    현재좌표 = e.pageY;
    if(현재좌표<=maxTop){
        현재좌표 = maxTop
    }else if(현재좌표>defaultTop){
        현재좌표=defaultTop;
    }
    contentsEl.style.top = `${현재좌표}px`;
}
  
function upMouse(e){
    document.removeEventListener('mousemove', moveMouse);
    뗄때좌표 = e.pageY;

    let boundary = movable * 1/2 + maxTop;
    if(뗄때좌표 < boundary){
        뗄때좌표 = maxTop;
    }else{
        뗄때좌표 = defaultTop;
    }
    console.log(뗄때좌표)
    contentsEl.style.top = `${뗄때좌표}px`;
    contentsEl.style.transition = `all .3s`;
    document.removeEventListener('mouseup', upMouse);
}  


