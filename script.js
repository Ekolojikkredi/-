document.addEventListener('DOMContentLoaded', function() {
    const kayitForm = document.getElementById('kayitForm');
    if (kayitForm) {
        kayitForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
            let yeniOgrenci = {
                isim: document.getElementById('isim').value,
                soyisim: document.getElementById('soyisim').value,
                il: document.getElementById('il').value,
                ilce: document.getElementById('ilce').value,
                okul: document.getElementById('okul').value,
                okul_numarasi: document.getElementById('okul_numarasi').value,
                email: document.getElementById('email').value,
                puan: 0
            };
            ogrenciler.push(yeniOgrenci);
            localStorage.setItem('ogrenciler', JSON.stringify(ogrenciler));
            alert('Kayıt başarıyla tamamlandı!');
            kayitForm.reset();
        });
    }

    const veriGirisiForm = document.getElementById('veriGirisiForm');
    if (veriGirisiForm) {
        veriGirisiForm.addEventListener('submit', function(event) {
            event.preventDefault();
            let atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
            let yeniAtik = {
                ogrenci_id: document.getElementById('ogrenci_id').value,
                atik_turu: document.getElementById('atik_turu').value,
                miktar: document.getElementById('miktar').value,
                dogru_ayristirma: document.getElementById('dogru_ayristirma').value,
                teslim_alan: document.getElementById('teslim_alan').value
            };
            atiklar.push(yeniAtik);
            localStorage.setItem('atiklar', JSON.stringify(atiklar));
            alert('Veri başarıyla girildi!');
            veriGirisiForm.reset();

            // Toplam atık sayacını güncelle
            let toplamAtikKilogrami = atiklar.reduce((total, atik) => total + parseFloat(atik.miktar), 0);
            document.getElementById('toplam-atik-kilogrami').textContent = toplamAtikKilogrami;
        });
    }

    const veriGoruntulemeContent = document.getElementById('veriGormeContent');
    if (veriGoruntulemeContent) {
        let ogrenciler = JSON.parse(localStorage.getItem('ogrenciler')) || [];
        let atiklar = JSON.parse(localStorage.getItem('atiklar')) || [];
        
        let veriGormeHtml = '<h3>Öğrenciler:</h3><ul>';
        ogrenciler.forEach((ogrenci, index) => {
            veriGormeHtml += `<li>ID: ${index}, İsim: ${ogrenci.isim}, Soyisim: ${ogrenci.soyisim}, Puan: ${ogrenci.puan}</li>`;
        });
        veriGormeHtml += '</ul>';
        
        veriGormeHtml += '<h3>Atıklar:</h3><ul>';
        atiklar.forEach((atik, index) => {
            veriGormeHtml += `<li>ID: ${index}, Öğrenci ID: ${atik.ogrenci_id}, Atık Türü: ${atik.atik_turu}, Miktar: ${atik.miktar} kg, Doğru Ayrıştırma: ${atik.dogru_ayristirma}, Teslim Alan: ${atik.teslim_alan}</li>`;
        });
        veriGormeHtml += '</ul>';
        
        veriGoruntulemeContent.innerHTML = veriGormeHtml;
    }
});
