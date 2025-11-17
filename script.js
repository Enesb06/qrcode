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
        // Kategori div'ini oluştur
        const kategoriDiv = document.createElement('section');
        kategoriDiv.classList.add('kategori');

        // Kategori başlığını oluştur
        const kategoriBaslik = document.createElement('h2');
        kategoriBaslik.classList.add('kategori-baslik');
        kategoriBaslik.textContent = kategori.kategori_adi;
        kategoriDiv.appendChild(kategoriBaslik);

        // Kategorideki ürünleri işle
        kategori.urunler.forEach(urun => {
            const urunDiv = document.createElement('article');
            urunDiv.classList.add('urun');

            urunDiv.innerHTML = `
                <div class="urun-detay">
                    <h3 class="urun-ad">${urun.ad}</h3>
                    <p class="urun-aciklama">${urun.aciklama}</p>
                </div>
                <div class="urun-fiyat">${urun.fiyat} TL</div>
            `;
            kategoriDiv.appendChild(urunDiv);
        });

        menuContainer.appendChild(kategoriDiv);
    });
}