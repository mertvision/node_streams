/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// fs modülünün import edilme durumu
const fs = require("fs");

// init isimli fonksiyon
const init = async () => {
    try{
        // okuma ve yazma akışları
        const readableStream = fs.createReadStream("./pipe/data.csv");
        const writeableStream = fs.createWriteStream("./pipe/export.csv");

        // pipe
        readableStream.pipe(writeableStream);

        // okumaya başladığında tetiklenir
        readableStream.on("data", ()=>{
            console.log("Dosya okunmaya başlandı.");
        });

        // okuma bittiğinde tetiklenir
        readableStream.on("end", ()=>{
            console.log("Dosya okunma işlemi tamamlandı.");
        });

        // yazma bittiğinde tetiklenir
        writeableStream.on("finish", ()=> {
            console.log("Dosyaya yazıldı.");
        });
    }
    catch(err){
        console.log(err);
    }
};

// init() fonksiyonunu çalıştır
init();