/**
 * Author: Mert Özdemir <mertozdemircontact@icloud.com>
 */

// "fs" modülünün içeri aktarma (import) durumu 
const fs = require("fs");

// init olarak isimlendirilmiş, stream işlemlerini içeren bir fonksiyon
const init = async () => {
    try {
        /* fs modülünün createReadStream yöntemi okuma işlemi yapmayı sağlar. "path" ve "options" olmak üzere iki parametre içerir.
        Path okunacak dosyanın yolunu belirtir, options ise opsiyonel bir nesnedir. */
        const readStream = fs.createReadStream("./data/data.txt", {
            start: 0, // okunmaya başlayacak baytı belirtir. 0 baytından başlayarak dosyayı okumaya başlar.
            highWaterMark: 100, // bir seferde en fazla 100 bayt okunacağını belirtir.
        });

        // fs modülünün createWriteStream yöntemi. Belirtilen dosyaya yazma işlemi gerçekleştirir.
        const writeStream = fs.createWriteStream("./data/export.txt");

        /* on metodu veri okuma işlemi gerçekleştiğinde tetiklenir ve buffer parametresi buffer nesnesi döner. Buffer okunan 
        dosyaya ait ikili veridir (binary data). "buffer.toString()" yöntemi ikili veriyi metinsel ifadeye çevirir. */
        readStream.on("data", (buffer) => {
            console.log("Data as buffer:", buffer);
            console.log("Data:", buffer.toString());
            // Okunan veriyi hedef dosyaya yazmaaya başlar.
            writeStream.write(buffer);
        });

        // Veri okuma işlemi sona erdiğinde çalışacak işlemlerdir.
        readStream.on("end", () => {
            console.log("Reading process is finished");
            // Veri yazma işlemini bitirir
            writeStream.end(()=>{
                console.log("Writing process is finished.");
            });
        });

        // Veri yazma işleminde bir hata oluşursa çalışacak işlemlerdir.
        readStream.on("error", (error) => {
            console.log("Stream error:", error);
        });
    }
    catch (err) {
        console.log("Stream error:", err);
    };
};

// init fonksiyonunu çalıştır
init();