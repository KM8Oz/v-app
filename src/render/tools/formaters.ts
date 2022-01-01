"use strict";
export const frmt = (input: string, format: string, dr: boolean) => {
     let d = Array.from(format.replace(/[^X]/g, '')).length;
     let d0 = String(Number(String(input).replace(/[^0-9]/g, ''))).substring(0,d)
     let dC = Array.from(format.replace(/[^Y]/g, '')).length;
     let _string = String(input).replace(/[^a-zA-Z]/g, '').toUpperCase();
     let c = !dr ? _string.substring(0,dC) : _string.substring(_string.length-dC,_string.length);
     let fr_d = Array.from(format.replace(/[^YX]/g, '')).reduce((a, b) => a + b == "XY" || a + b == "YX" ? a + b : a) == "XY"
     let _d = !dr ? d0.padStart(d, '0') : d0.padEnd(d, '0');
     return fr_d ? _d + c : c + _d;
}
export const filter = (filters: Object, input: object) => {
     let _i = Object.values(filters).findIndex(s => s)
     if (_i != -1) {
          let _p = Object.entries(filters)[_i]
          var re = new RegExp(String(_p[1]).toLowerCase(), "g");
          return String(input[_p[0]]).toLowerCase().search(re) != -1
     } else {
          return true
     }
}
export const mtotal = (input:String, format:string)=>{
     let cd = format.replace(/[^X]/g,'').length;
     let v = input.replace(/[^0-9,]/g,'').split(',')
     return v[0].padStart(cd-2, '0')+','+(v[1]||"00").padEnd(2, '0')
}