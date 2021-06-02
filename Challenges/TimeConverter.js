let detik = 10000;

let sisa = detik%60;
let menit = Math.floor(detik/60);
let jam = Math.floor(menit/60);
menit -= 60*jam
console.log(`${jam} jam ${menit} menit ${sisa} detik`)
