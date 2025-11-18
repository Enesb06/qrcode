// Sayfa yüklendiğinde menüyü getiren fonksiyonu çalıştır
document.addEventListener('DOMContentLoaded', fetchMenu);

async function fetchMenu() {
    try {
        const response = await fetch('menu.json'); // JSON dosyasını çekiyoruz
        if (!response.ok) {
            throw new Error('Menü verisi alınamadı!');
        }
        const menuData = await response.json();
        renderMenu(menuData);
    } catch (error) {
        console.error(error);
        const menuContainer = document.getElementById('menu-container');
        menuContainer.innerHTML = '<p>Menü yüklenirken bir hata oluştu. Lütfen tekrar deneyin.</p>';
    }
}

function renderMenu(data) {
    const menuContainer = document.getElementById('menu-container');
    menuContainer.innerHTML = ''; // Önceki içeriği temizle

    data.kategoriler.forEach(kategori => {
        const kategoriDiv = document.createElement('section');
        kategoriDiv.classList.add('kategori');

        const kategoriBaslik = document.createElement('h2');
        kategoriBaslik.classList.add('kategori-baslik');
        kategoriBaslik.textContent = kategori.kategori_adi;
        kategoriDiv.appendChild(kategoriBaslik);

        kategori.urunler.forEach(urun => {
            const urunDiv = document.createElement('article');
            urunDiv.classList.add('urun');

            let urunHTML = '';

            // Ürünün resmi varsa <img> etiketini oluştur
            if (urun.resim) {
                urunHTML += `<img src="${urun.resim}" alt="${urun.ad}" class="urun-resim">`;
            }

            // Ürün bilgilerini (ad, açıklama, fiyat) içeren bir div oluştur
            urunHTML += `
                <div class="urun-bilgi">
                    <div class="urun-ust-kisim">
                        <h3 class="urun-ad">${urun.ad}</h3>
                        <div class="urun-fiyat">${urun.fiyat} TL</div>
                    </div>
                    <p class="urun-aciklama">${urun.aciklama}</p>
                </div>
            `;
            
            urunDiv.innerHTML = urunHTML;
            kategoriDiv.appendChild(urunDiv);
        });

        menuContainer.appendChild(kategoriDiv);
    });
}