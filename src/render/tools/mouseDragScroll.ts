// import { Any } from "@react-spring/types";

export const mouseDownHandler = function (e:any, fn:any) {
    const ele = e.currentTarget;
    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        ele.style.cursor = 'grab';
        ele.style.removeProperty('user-select');
    };
    
var pos = {
    // The current scroll
    // left: ele.scrollLeft,
    top: ele.scrollTop,
    // Get the current mouse position
    // x: e.clientX,
    y: e.clientY,
};
    ele.style.cursor = 'grabbing';
ele.style.userSelect = 'none';
const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    // const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;
    ele.style.cursor = 'grabbing';
    // Scroll the element
    ele.scrollTop = pos.top - dy;
    fn((ele.scrollTop/ele.scrollHeight)*100)
    // ele.scrollLeft = pos.left - dx;
};
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('mouseup', mouseUpHandler);
};
export const scrollerHandler = function (e:any,s:any, fn:React.Dispatch<React.SetStateAction<any>>) {
    const ele = e;
    const scroller = s.currentTarget;
    const mouseUpHandler = function () {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        scroller.style.cursor = 'grab';
        scroller.style.removeProperty('user-select');
    };
    
var pos = {
    // The current scroll
    // left: ele.scrollLeft,
    top: ele.scrollTop,
    // Get the current mouse position
    // x: e.clientX,
    y: e.clientY,
};
scroller.style.cursor = 'grabbing';
scroller.style.userSelect = 'none';
const mouseMoveHandler = function (e) {
    // How far the mouse has been moved
    // const dx = e.clientX - pos.x;
    const dy = e.clientY + pos.y;

    // Scroll the element
    ele.scrollTop = pos.top + dy;
    scroller.style.top = `${(ele.scrollTop/ele.scrollHeight)*100}%`;
    // fn((ele.scrollTop/ele.scrollHeight)*100)
    // ele.scrollLeft = pos.left - dx;
};
document.addEventListener('mousemove', mouseMoveHandler);
document.addEventListener('mouseup', mouseUpHandler);
};
export const mouseScroller = function (e:any, fn:any) {
   
        const mouseMoveHandler = ()=>{
          
        }
        const mouseUpHandler = ()=>{
            document.removeEventListener('mousemove', mouseMoveHandler);
            document.removeEventListener('mouseup', mouseUpHandler);
        }
        document.addEventListener('mousemove', mouseMoveHandler);
        document.addEventListener('mouseup', mouseUpHandler);
    const ele = e.currentTarget;
    let limits = [136, 462];
    var pos = {
        // The current scroll
        // left: ele.scrollLeft,
        top: ele.scrollTop,
        // Get the current mouse position
        // x: e.clientX,
        y: e.clientY,
    };
    
}