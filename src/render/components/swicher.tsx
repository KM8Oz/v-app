import React from 'react'
import { elmtype } from '@render/store/vignettes/Configs'

interface Props {
    x:number;
    y:number;
    width:number;
    height:number;
    value:string,
    values: Array<elmtype>,
    name?:string;
    onChange?:(d:any)=>void;
    typeSwt?:typeSwt;
}
export enum typeSwt {
    normal = "v-select_n",
    bold= "v-select_b",
    medium="v-select_m"
}
const Swicher = ({ x, y, height, width,value, name,typeSwt,values, onChange, onKeyUp, ...rest}: Props&any) => {
    // setSwitcher("v-custom-select")
    return (
        <foreignObject x={x} y={y} width={width} height={height}>
               <select width={width-2} value={value} height={height-2} name={name} onChange={e=>{
                   let v=  e.nativeEvent.target as any;
                //    console.log();
                onChange(values[v?.selectedIndex])   
               }} {...rest} className={"v-select "+typeSwt || ''}>
                   {values.map((e:elmtype)=><option key={e.id} itemID={e.id} value={e.code}>{e.char}</option>)}
               </select>      
       </foreignObject>
    )
}
// function setSwitcher(classname:string){
//     var x, i, j, l, ll, selElmnt, a, b, c;
// /*look for any elements with the class "custom-select":*/
// x = document.getElementsByClassName(classname);
// l = x.length;
// for (i = 0; i < l; i++) {
//   selElmnt = x[i].getElementsByTagName("select")[0];
//   ll = selElmnt.length;
//   /*for each element, create a new DIV that will act as the selected item:*/
//   a = document.createElement("DIV");
//   a.setAttribute("class", "select-selected");
//   a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
//   x[i].appendChild(a);
//   /*for each element, create a new DIV that will contain the option list:*/
//   b = document.createElement("DIV");
//   b.setAttribute("class", "select-items select-hide");
//   for (j = 1; j < ll; j++) {
//     /*for each option in the original select element,
//     create a new DIV that will act as an option item:*/
//     c = document.createElement("DIV");
//     c.innerHTML = selElmnt.options[j].innerHTML;
//     c.addEventListener("click", function(e) {
//         /*when an item is clicked, update the original select box,
//         and the selected item:*/
//        let vm = this as any;
//         var y, i, k, s, h, sl, yl;
//         s = vm.parentNode.parentNode.getElementsByTagName("select")[0];
//         sl = s.length;
//         h = vm.parentNode.previousSibling;
//         for (i = 0; i < sl; i++) {
//           if (s.options[i].innerHTML == vm.innerHTML) {
//             s.selectedIndex = i;
//             h.innerHTML = vm.innerHTML;
//             y = vm.parentNode.getElementsByClassName("same-as-selected");
//             yl = y.length;
//             for (k = 0; k < yl; k++) {
//               y[k].removeAttribute("class");
//             }
//             vm.setAttribute("class", "same-as-selected");
//             break;
//           }
//         }
//         h.click();
//     });
//     b.appendChild(c);
//   }
//   x[i].appendChild(b);
//   a.addEventListener("click", function(e) {
//       /*when the select box is clicked, close any other select boxes,
//       and open/close the current select box:*/
//       let vm = this as any;
//       e.stopPropagation();
//       closeAllSelect(vm);
//       vm.nextSibling.classList.toggle("select-hide");
//       vm.classList.toggle("select-arrow-active");
//     });
// }
// function closeAllSelect(elmnt:any) {
//   /*a function that will close all select boxes in the document,
//   except the current select box:*/
//   var x, y, i, xl, yl, arrNo = [];
//   x = document.getElementsByClassName("select-items");
//   y = document.getElementsByClassName("select-selected");
//   xl = x.length;
//   yl = y.length;
//   for (i = 0; i < yl; i++) {
//     if (elmnt == y[i]) {
//       arrNo.push(i)
//     } else {
//       y[i].classList.remove("select-arrow-active");
//     }
//   }
//   for (i = 0; i < xl; i++) {
//     if (arrNo.indexOf(i)) {
//       x[i].classList.add("select-hide");
//     }
//   }
// }
// /*if the user clicks anywhere outside the select box,
// then close all select boxes:*/
// document.addEventListener("click", closeAllSelect);
// }
export default Swicher