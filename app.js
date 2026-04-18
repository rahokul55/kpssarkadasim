// ======================================================
// 🌸 KPSS ÇALIŞMA ARKADAŞIM - Ana JavaScript
// ======================================================

// ========== GLOBAL DEĞİŞKENLER ==========
let aktifKullanici = null;      // Şu anki kullanıcı ismi
let kullaniciVeri = null;       // Kullanıcının tüm verileri
let timerInterval = null;        // Etüt sayacı
let timerKalan = 0;              // Saniye cinsinden kalan süre
let simdikiAdimIndex = -1;       // Listedeki aktif adımın indexi
let etutCaliyor = false;         // Etüt şu an çalıyor mu?

// ========== GÜNLÜK PROGRAM ==========
// Excel dosyasındaki programı hardcoded olarak ekliyorum
const GUNLUK_PROGRAM = [
  // SABAH BLOĞU
  { blok: '🌸 SABAH BLOĞU — Sayısal Pik Saatleri', blokRenk: 'mor' },
  { saat: '07:30', bitis: '08:00', sure: 30, tip: 'uyku', ad: 'Uyanma & Hazırlık', detay: '1 bardak ılık su', ikon: '☀️' },
  { saat: '08:00', bitis: '09:00', sure: 60, tip: 'etut', ad: '1. Etüt', detay: 'Matematik', ikon: '📐' },
  { saat: '09:00', bitis: '09:10', sure: 10, tip: 'mola', ad: 'Mola', detay: 'Su, ekran yok', ikon: '🍵' },
  { saat: '09:10', bitis: '10:10', sure: 60, tip: 'etut', ad: '2. Etüt', detay: 'Matematik', ikon: '📐' },
  { saat: '10:10', bitis: '11:10', sure: 60, tip: 'yemek', ad: '🍳 Kahvaltı', detay: '2 yumurta, peynir, salatalık, domates', ikon: '🍳' },
  { saat: '11:10', bitis: '12:10', sure: 60, tip: 'etut', ad: '3. Etüt', detay: 'Geometri', ikon: '📏' },
  { saat: '12:10', bitis: '12:20', sure: 10, tip: 'mola', ad: 'Mola', detay: 'Gözleri kitaptan ayır', ikon: '👀' },
  { saat: '12:20', bitis: '13:20', sure: 60, tip: 'etut', ad: '4. Etüt', detay: 'Geometri', ikon: '📏' },
  
  // ÖĞLE BLOĞU
  { blok: '🌼 ÖĞLE BLOĞU — Sözel Pencere', blokRenk: 'pembe' },
  { saat: '13:20', bitis: '14:20', sure: 60, tip: 'yemek', ad: '🍵 Öğle Atıştırması', detay: 'Yoğurt, çiğ kuruyemiş, çay', ikon: '🥗' },
  { saat: '14:20', bitis: '15:20', sure: 60, tip: 'etut', ad: '5. Etüt', detay: 'Türkçe', ikon: '📖' },
  { saat: '15:20', bitis: '15:30', sure: 10, tip: 'mola', ad: 'Mola', detay: 'Yüz yıkama, havalandır', ikon: '💦' },
  { saat: '15:30', bitis: '16:30', sure: 60, tip: 'etut', ad: '6. Etüt', detay: 'Türkçe', ikon: '📖' },
  
  // İKİNDİ BLOĞU
  { blok: '🌿 İKİNDİ BLOĞU — Toparlanma', blokRenk: 'yesil' },
  { saat: '16:30', bitis: '16:50', sure: 20, tip: 'dinlen', ad: '😴 Dinlenme', detay: 'Sessiz oda, max 25 dk!', ikon: '😴' },
  { saat: '16:50', bitis: '17:10', sure: 20, tip: 'yemek', ad: '🍎 İkindi Atıştırmalığı', detay: 'Elma/armut, kuruyemiş, yeşil çay', ikon: '🍎' },
  { saat: '17:10', bitis: '18:10', sure: 60, tip: 'etut', ad: '7. Etüt', detay: 'Vatandaşlık', ikon: '⚖️' },
  { saat: '18:10', bitis: '18:30', sure: 20, tip: 'mola', ad: 'Yemek Öncesi Mola', detay: 'Masadan kalk', ikon: '🚶' },
  
  // AKŞAM BLOĞU
  { blok: '🌷 AKŞAM BLOĞU — Hafıza Saatleri', blokRenk: 'pembe' },
  { saat: '18:30', bitis: '19:30', sure: 60, tip: 'yemek', ad: '🍲 Akşam Yemeği', detay: 'Sebze yemeği + protein', ikon: '🍲' },
  { saat: '19:30', bitis: '19:40', sure: 10, tip: 'mola', ad: 'Sindirim', detay: 'Hafif yürüme, su', ikon: '🚶' },
  { saat: '19:40', bitis: '20:40', sure: 60, tip: 'etut', ad: '8. Etüt', detay: 'Vatandaşlık', ikon: '⚖️' },
  { saat: '20:40', bitis: '20:50', sure: 10, tip: 'mola', ad: 'Mola', detay: 'Su', ikon: '💧' },
  { saat: '20:50', bitis: '21:50', sure: 60, tip: 'etut', ad: '9. Etüt', detay: 'Tarih', ikon: '📜' },
  { saat: '21:50', bitis: '22:00', sure: 10, tip: 'mola', ad: 'Mola', detay: 'Kısa tur', ikon: '🚶' },
  { saat: '22:00', bitis: '23:00', sure: 60, tip: 'etut', ad: '10. Etüt', detay: 'Coğrafya + Hata Analizi', ikon: '🗺️' },
  
  // GECE BLOĞU
  { blok: '🌙 GECE BLOĞU — Pekiştirme', blokRenk: 'mor' },
  { saat: '23:00', bitis: '23:30', sure: 30, tip: 'dinlen', ad: '📖 Kapanış & Rahatlama', detay: 'Yarının planı, kitap', ikon: '📖' },
  { saat: '23:30', bitis: '07:30', sure: 480, tip: 'uyku', ad: '💤 Uyku', detay: 'Dinlenme', ikon: '💤' },
];

// ========== ADA ELEMENTLERİ ==========
// Her etüt için adada eklenen öğeler
const ADA_AGACLARI = [
  { etutSayisi: 1, oge: '🌱', pos: 'pos-1', ad: 'İlk Filiz' },
  { etutSayisi: 2, oge: '🌿', pos: 'pos-3', ad: 'Otlar' },
  { etutSayisi: 3, oge: '🌳', pos: 'pos-5', ad: 'Küçük Ağaç' },
  { etutSayisi: 4, oge: '🌸', pos: 'pos-2', ad: 'Çiçekler' },
  { etutSayisi: 5, oge: '🌴', pos: 'pos-7', ad: 'Palmiye' },
  { etutSayisi: 6, oge: '🌺', pos: 'pos-4', ad: 'Hibiskus' },
  { etutSayisi: 7, oge: '🏡', pos: 'pos-6', ad: 'Küçük Ev' },
  { etutSayisi: 8, oge: '🌷', pos: 'pos-9', ad: 'Lale Tarlası' },
  { etutSayisi: 9, oge: '🏠', pos: 'pos-8', ad: 'Bir Ev Daha' },
  { etutSayisi: 10, oge: '🏰', pos: 'pos-10', ad: 'Kale', gunTamamBonus: true },
];

// Gün bazında ek öğeler (kaç gün üstüste çalıştığına göre)
const ADA_BONUSLARI = [
  { gun: 2, oge: '🦋', pos: 'pos-1', bottom: '65%' },
  { gun: 3, oge: '🐝', pos: 'pos-5', bottom: '70%' },
  { gun: 5, oge: '🐇', pos: 'pos-3', bottom: '38%' },
  { gun: 7, oge: '🌻', pos: 'pos-6', bottom: '38%' },
  { gun: 10, oge: '🦌', pos: 'pos-8', bottom: '38%' },
  { gun: 14, oge: '🏞️', pos: 'pos-2', bottom: '60%' },
  { gun: 20, oge: '🌅', pos: 'pos-10', bottom: '72%' },
  { gun: 30, oge: '🗼', pos: 'pos-4', bottom: '38%' },
];

// Ada seviyeleri
const ADA_SEVIYELER = [
  { min: 0, ad: '🌱 Yeni Başlangıç' },
  { min: 3, ad: '🌿 Tohum Ekildi' },
  { min: 7, ad: '🌳 Ağaçlar Büyüyor' },
  { min: 15, ad: '🏡 Küçük Köy' },
  { min: 30, ad: '🏘️ Mahalle' },
  { min: 50, ad: '🏙️ Kasaba' },
  { min: 80, ad: '🌆 Şehir' },
  { min: 120, ad: '🌇 Büyük Şehir' },
  { min: 200, ad: '✨ Harika Dünya' },
];

// Motivasyon mesajları
const MOTIVASYON_MESAJLARI = [
  '💪 Her etüt seni hedefe bir adım daha yaklaştırıyor!',
  '🌟 Bugün çok güzel gidiyorsun, devam et!',
  '✨ Senin başaracağına inanıyorum, canım!',
  '🌸 Küçük adımlar, büyük başarılar getirir.',
  '🎯 KPSS yolunda emin adımlarla ilerliyorsun.',
  '💖 Emeklerin boşa gitmeyecek, söz veriyorum!',
  '🌺 Her sayfa, her soru seni güçlendiriyor.',
  '🏝️ Adan her geçen gün daha da güzelleşiyor.',
  '🌷 Hayalini kur, sonra o hayali yaşa!',
  '🦋 Kelebek olmak için tırtıl olmak gerek.',
  '🌈 Karanlık geceler sabaha ulaşır, pes etme.',
  '⭐ Yıldız olmak için önce karanlıkta parlamayı öğren.',
  '🌼 Her gün küçük bir gelişim, büyük bir devrimdir.',
  '💐 Bugün ektiğin tohumlar yarının çiçekleri olacak.',
  '🎀 Kendine inan, herkes inanıyor zaten!',
];

// ========== GİRİŞ İŞLEMLERİ ==========

function girisYap() {
  const isim = document.getElementById('isimInput').value.trim();
  if (!isim) {
    toast('Lütfen ismini yaz canım 🌸');
    return;
  }
  if (isim.length < 2) {
    toast('En az 2 harf olmalı 🌷');
    return;
  }
  
  aktifKullanici = isim;
  
  // Aktif kullanıcıyı kaydet
  localStorage.setItem('kpss_aktif_kullanici', isim);
  
  // Kullanıcı verisini yükle (varsa) veya oluştur
  const key = 'kpss_veri_' + isim.toLowerCase();
  const kayitli = localStorage.getItem(key);
  
  if (kayitli) {
    kullaniciVeri = JSON.parse(kayitli);
    toast(`Hoş geldin ${isim}! 💖 Verilerin geri yüklendi.`);
  } else {
    kullaniciVeri = {
      isim: isim,
      toplamEtut: 0,
      toplamSaat: 0,
      toplamDakika: 0,
      calisilanGunler: [],  // [{tarih: 'YYYY-MM-DD', etutSayisi: 3, dakika: 180}]
      bugun: {
        tarih: bugunTarih(),
        yapilanAdimlar: [], // saat string'leri
        etutSayisi: 0,
        dakika: 0,
      },
      ayarlar: {
        sesAcik: true,
        titresimAcik: true,
        konfettiAcik: true,
        kpssTarihi: '2026-09-06', // Varsayılan
      },
      kayitTarihi: new Date().toISOString(),
    };
    veriKaydet();
    toast(`Merhaba ${isim}! 🌸 Hoş geldin!`);
    
    // İlk giriş modalı
    setTimeout(() => {
      modalGoster('🌸', `Merhaba ${isim}!`, 
        'KPSS yolculuğunda birlikte olacağız. Her etüt tamamladığında adan biraz daha güzelleşecek. Başarılar canım! 💖');
    }, 500);
  }
  
  // Giriş ekranını gizle, uygulamayı göster
  document.getElementById('girisEkrani').style.display = 'none';
  document.getElementById('uygulama').classList.add('aktif');
  document.getElementById('altNav').style.display = 'flex';
  
  // Uygulamayı başlat
  baslat();
}

function cikisYap() {
  modalGoster('👋', 'Çıkış yap?', 
    'Verilerin telefonda kalır, tekrar aynı isimle girince geri yüklenir.',
    'Evet Çık', () => {
      localStorage.removeItem('kpss_aktif_kullanici');
      location.reload();
    });
}

// ========== BAŞLATMA ==========

function baslat() {
  // İsim göster
  document.getElementById('isimGoster').textContent = aktifKullanici;
  document.getElementById('aktifKullanici').textContent = aktifKullanici;
  
  // Ayarları yükle
  ayarlariYukle();
  
  // KPSS tarihi
  document.getElementById('kpssTarihi').value = kullaniciVeri.ayarlar.kpssTarihi;
  kpssGeriSayimGuncelle();
  
  // Bugün kontrol - gün değiştiyse yeni gün oluştur
  bugunKontrol();
  
  // Programı render et
  programRenderEt();
  
  // Adayı render et
  adaGuncelle();
  
  // İstatistikleri güncelle
  istatistikGuncelle();
  
  // Motivasyon mesajı
  yeniMotivasyon();
  
  // Şimdiki adımı bul ve göster
  simdikiAdimiBul();
  
  // Her saniye geri sayım güncelle
  setInterval(() => {
    kpssGeriSayimGuncelle();
    if (!etutCaliyor) simdikiAdimiBul();
  }, 60000); // Her dakika
  
  // Her 5 dakikada bir motivasyon değiştir
  setInterval(yeniMotivasyon, 5 * 60 * 1000);
  
  // Service worker kaydet (offline için)
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('service-worker.js').catch(() => {});
  }
  
  // Notification izni iste
  if ('Notification' in window && Notification.permission === 'default') {
    setTimeout(() => Notification.requestPermission(), 3000);
  }
}

function bugunKontrol() {
  const bugun = bugunTarih();
  if (kullaniciVeri.bugun.tarih !== bugun) {
    // Dün tamamlanan şeyleri kaydet
    if (kullaniciVeri.bugun.etutSayisi > 0) {
      kullaniciVeri.calisilanGunler.push({
        tarih: kullaniciVeri.bugun.tarih,
        etutSayisi: kullaniciVeri.bugun.etutSayisi,
        dakika: kullaniciVeri.bugun.dakika,
      });
    }
    
    // Yeni güne başla
    kullaniciVeri.bugun = {
      tarih: bugun,
      yapilanAdimlar: [],
      etutSayisi: 0,
      dakika: 0,
    };
    veriKaydet();
  }
}

// ========== KPSS GERİ SAYIM ==========

function kpssGeriSayimGuncelle() {
  const hedef = new Date(kullaniciVeri.ayarlar.kpssTarihi + 'T00:00:00');
  const simdi = new Date();
  const fark = hedef - simdi;
  
  if (fark < 0) {
    document.getElementById('kalanGun').textContent = 'BUGÜN';
    document.getElementById('geriSayim').innerHTML = '🎯 KPSS GÜNÜ GELDİ! Başarılar! 💖';
    return;
  }
  
  const gun = Math.ceil(fark / (1000 * 60 * 60 * 24));
  document.getElementById('kalanGun').textContent = gun;
  
  // Güne göre farklı mesaj
  let mesaj = '🎯 KPSS\'ye <span class="ust-bant-rakam">' + gun + '</span> gün kaldı';
  if (gun <= 7) mesaj = '🔥 KPSS\'ye <span class="ust-bant-rakam">' + gun + '</span> gün! Son düzlük! 💪';
  else if (gun <= 30) mesaj = '⏰ KPSS\'ye <span class="ust-bant-rakam">' + gun + '</span> gün! Son yol! 🚀';
  
  document.getElementById('geriSayim').innerHTML = mesaj;
}

function kpssTarihKaydet() {
  const yeniTarih = document.getElementById('kpssTarihi').value;
  kullaniciVeri.ayarlar.kpssTarihi = yeniTarih;
  veriKaydet();
  kpssGeriSayimGuncelle();
  toast('📅 KPSS tarihi güncellendi');
}

// ========== PROGRAM LİSTESİ ==========

function programRenderEt() {
  const liste = document.getElementById('programListesi');
  liste.innerHTML = '';
  
  let suankiBlok = null;
  let blokDiv = null;
  
  GUNLUK_PROGRAM.forEach((adim, index) => {
    if (adim.blok) {
      // Blok başlığı
      suankiBlok = document.createElement('div');
      suankiBlok.className = 'blok-grubu';
      suankiBlok.innerHTML = `<div class="blok-baslik">${adim.blok}</div>`;
      liste.appendChild(suankiBlok);
      blokDiv = suankiBlok;
      return;
    }
    
    const yapildi = kullaniciVeri.bugun.yapilanAdimlar.includes(adim.saat);
    const simdiki = index === simdikiAdimIndex;
    const kacti = !yapildi && !simdiki && adimSaatiGecti(adim);
    
    const div = document.createElement('div');
    div.className = 'adim' + 
      (yapildi ? ' yapildi' : '') + 
      (simdiki ? ' simdiki' : '') +
      (kacti ? ' kacti' : '');
    div.dataset.index = index;
    
    div.innerHTML = `
      <div class="adim-ikon ${adim.tip}">${adim.ikon}</div>
      <div class="adim-icerik">
        <div class="adim-saat">${adim.saat} - ${adim.bitis}</div>
        <div class="adim-ad">${adim.ad}</div>
        <div class="adim-detay">${adim.detay}</div>
      </div>
      <div class="adim-durum ${yapildi ? 'yapildi' : (simdiki ? 'simdiki' : 'bekliyor')}">
        ${yapildi ? '✓' : (simdiki ? '●' : '○')}
      </div>
    `;
    
    if (blokDiv) blokDiv.appendChild(div);
    else liste.appendChild(div);
  });
}

function adimSaatiGecti(adim) {
  const simdi = new Date();
  const [saat, dk] = adim.bitis.split(':').map(Number);
  const bitisDate = new Date();
  bitisDate.setHours(saat, dk, 0, 0);
  // Uyku gibi gece yarısı aşan durumlar için basit kontrol
  if (adim.saat === '23:30') return false;
  return simdi > bitisDate;
}

// ========== ŞİMDİKİ ADIMI BUL ==========

function simdikiAdimiBul() {
  const simdi = new Date();
  const simdiDk = simdi.getHours() * 60 + simdi.getMinutes();
  
  let buldu = -1;
  
  for (let i = 0; i < GUNLUK_PROGRAM.length; i++) {
    const adim = GUNLUK_PROGRAM[i];
    if (adim.blok) continue;
    
    const [sh, sm] = adim.saat.split(':').map(Number);
    const [bh, bm] = adim.bitis.split(':').map(Number);
    let baslangicDk = sh * 60 + sm;
    let bitisDk = bh * 60 + bm;
    
    // Gece yarısı aşan uyku gibi
    if (bitisDk < baslangicDk) bitisDk += 24 * 60;
    
    if (simdiDk >= baslangicDk && simdiDk < bitisDk) {
      buldu = i;
      break;
    }
  }
  
  // Eğer aralıkta değilsek, bir sonraki adımı bul
  if (buldu === -1) {
    for (let i = 0; i < GUNLUK_PROGRAM.length; i++) {
      const adim = GUNLUK_PROGRAM[i];
      if (adim.blok) continue;
      const [sh, sm] = adim.saat.split(':').map(Number);
      const baslangicDk = sh * 60 + sm;
      if (baslangicDk > simdiDk) {
        buldu = i;
        break;
      }
    }
  }
  
  // Hiç bulunamadıysa (çok geç saat) - ilk adım (yarın)
  if (buldu === -1) {
    buldu = GUNLUK_PROGRAM.findIndex(a => !a.blok);
  }
  
  simdikiAdimIndex = buldu;
  aktifEtutGuncelle();
  programRenderEt();
}

// ========== AKTİF ETÜT KARTI ==========

function aktifEtutGuncelle() {
  if (simdikiAdimIndex < 0) return;
  const adim = GUNLUK_PROGRAM[simdikiAdimIndex];
  if (!adim || adim.blok) return;
  
  document.getElementById('aktifAd').textContent = adim.ad;
  document.getElementById('aktifDetay').textContent = `${adim.saat} - ${adim.bitis}  •  ${adim.detay}`;
  
  // Şu an bu adımın içinde miyiz?
  const simdi = new Date();
  const simdiDk = simdi.getHours() * 60 + simdi.getMinutes();
  const [sh, sm] = adim.saat.split(':').map(Number);
  const [bh, bm] = adim.bitis.split(':').map(Number);
  const baslangicDk = sh * 60 + sm;
  let bitisDk = bh * 60 + bm;
  if (bitisDk < baslangicDk) bitisDk += 24 * 60;
  
  const icindeMi = simdiDk >= baslangicDk && simdiDk < bitisDk;
  const yapildi = kullaniciVeri.bugun.yapilanAdimlar.includes(adim.saat);
  
  if (yapildi) {
    document.getElementById('aktifEtiket').textContent = '✅ Tamamlandı';
    document.getElementById('cemberSayi').textContent = '✓';
    document.getElementById('cemberEtiket').textContent = 'Yapıldı';
    document.getElementById('cemberDolu').style.strokeDashoffset = '0';
    document.getElementById('etutButonlar').innerHTML = '';
  } else if (icindeMi) {
    document.getElementById('aktifEtiket').textContent = '🔴 Şu An';
    const kalanDk = bitisDk - simdiDk;
    document.getElementById('cemberSayi').textContent = kalanDk + 'dk';
    document.getElementById('cemberEtiket').textContent = 'Kalan Süre';
    
    if (!etutCaliyor) {
      document.getElementById('etutButonlar').innerHTML = `
        <button class="etut-buton baslat" onclick="etutBaslat()">▶️ Başlat</button>
        <button class="etut-buton bitir" onclick="adimTamamla()">✓ Yapıldı</button>
      `;
    }
  } else {
    document.getElementById('aktifEtiket').textContent = '⏱️ Sıradaki';
    const kalanDk = baslangicDk - simdiDk;
    if (kalanDk > 0 && kalanDk < 60) {
      document.getElementById('cemberSayi').textContent = kalanDk + 'dk';
      document.getElementById('cemberEtiket').textContent = 'Sonra';
    } else {
      document.getElementById('cemberSayi').textContent = adim.saat;
      document.getElementById('cemberEtiket').textContent = 'Başlıyor';
    }
    document.getElementById('etutButonlar').innerHTML = `
      <button class="etut-buton baslat" onclick="etutBaslat()">▶️ Erken Başlat</button>
      <button class="etut-buton atla" onclick="adimTamamla()">✓ Yapıldı Say</button>
    `;
  }
}

// ========== ETÜT BAŞLAT / TAMAMLA ==========

function etutBaslat() {
  if (simdikiAdimIndex < 0) return;
  const adim = GUNLUK_PROGRAM[simdikiAdimIndex];
  if (!adim || adim.blok) return;
  
  etutCaliyor = true;
  timerKalan = adim.sure * 60;  // Saniye cinsinden
  
  document.getElementById('aktifEtutKart').classList.add('caliyor');
  document.getElementById('aktifEtiket').textContent = '⏱️ Çalışıyor';
  document.getElementById('cemberEtiket').textContent = 'Kalan';
  
  document.getElementById('etutButonlar').innerHTML = `
    <button class="etut-buton durdur" onclick="etutDurdur()">⏸ Duraklat</button>
    <button class="etut-buton bitir" onclick="adimTamamla()">✓ Erken Bitir</button>
  `;
  
  // Timer başlat
  timerInterval = setInterval(() => {
    timerKalan--;
    
    if (timerKalan <= 0) {
      etutBitti();
      return;
    }
    
    // Göster
    const dakika = Math.floor(timerKalan / 60);
    const saniye = timerKalan % 60;
    document.getElementById('cemberSayi').textContent = 
      `${dakika.toString().padStart(2,'0')}:${saniye.toString().padStart(2,'0')}`;
    
    // Çember güncelle
    const toplam = adim.sure * 60;
    const gecen = toplam - timerKalan;
    const progres = gecen / toplam;
    const cevre = 565.48;
    document.getElementById('cemberDolu').style.strokeDashoffset = 
      cevre - (cevre * progres);
  }, 1000);
  
  toast(`🌸 ${adim.ad} başladı! Başarılar!`);
  
  // Screen wake lock dene
  try {
    if ('wakeLock' in navigator) {
      navigator.wakeLock.request('screen').catch(() => {});
    }
  } catch(e) {}
}

function etutDurdur() {
  clearInterval(timerInterval);
  etutCaliyor = false;
  document.getElementById('aktifEtutKart').classList.remove('caliyor');
  document.getElementById('etutButonlar').innerHTML = `
    <button class="etut-buton baslat" onclick="etutBaslat()">▶️ Devam Et</button>
    <button class="etut-buton bitir" onclick="adimTamamla()">✓ Bitti</button>
  `;
  toast('⏸ Duraklatıldı');
}

function etutBitti() {
  clearInterval(timerInterval);
  etutCaliyor = false;
  
  // Ses çal
  if (kullaniciVeri.ayarlar.sesAcik) {
    alarmCal();
  }
  
  // Titret
  if (kullaniciVeri.ayarlar.titresimAcik && 'vibrate' in navigator) {
    navigator.vibrate([300, 100, 300, 100, 300]);
  }
  
  // Bildirim gönder
  bildirimGonder(
    '⏰ Süre Bitti!',
    `${GUNLUK_PROGRAM[simdikiAdimIndex].ad} tamamlandı. Yapıldı olarak işaretle!`
  );
  
  // Modal göster
  const adim = GUNLUK_PROGRAM[simdikiAdimIndex];
  modalGoster('⏰', 'Süre Bitti!', 
    `${adim.ad} için ayrılan süre doldu. Tamamladıysan "Yapıldı" de, yoksa biraz daha zaman al.`,
    'Yapıldı! ✓',
    () => {
      adimTamamla();
    });
  
  // İkincil buton: devam et
  document.getElementById('modalIkincilBtn').style.display = 'block';
  document.getElementById('modalIkincilBtn').textContent = '5 dk daha devam';
  modalIkincilAksiyon = () => {
    timerKalan = 5 * 60;
    etutBaslat();
    modalKapat();
  };
}

function adimTamamla() {
  if (simdikiAdimIndex < 0) return;
  const adim = GUNLUK_PROGRAM[simdikiAdimIndex];
  if (!adim || adim.blok) return;
  
  // Timer durdur
  clearInterval(timerInterval);
  etutCaliyor = false;
  document.getElementById('aktifEtutKart').classList.remove('caliyor');
  
  // Kayıt et
  if (!kullaniciVeri.bugun.yapilanAdimlar.includes(adim.saat)) {
    kullaniciVeri.bugun.yapilanAdimlar.push(adim.saat);
    kullaniciVeri.bugun.dakika += adim.sure;
    
    if (adim.tip === 'etut') {
      kullaniciVeri.bugun.etutSayisi++;
      kullaniciVeri.toplamEtut++;
      
      // Adaya yeni öğe ekle
      adayaEkle();
      
      // Konfeti
      if (kullaniciVeri.ayarlar.konfettiAcik) {
        konfetiPatlat();
      }
    }
    
    kullaniciVeri.toplamDakika += adim.sure;
    kullaniciVeri.toplamSaat = Math.floor(kullaniciVeri.toplamDakika / 60);
    
    veriKaydet();
  }
  
  modalKapat();
  
  // Kutlama
  const mesaj = adim.tip === 'etut' 
    ? `Harika! ${adim.ad} tamamlandı! Adana yeni bir şey ekledin 🌸` 
    : `${adim.ad} bitti, devam!`;
  
  if (adim.tip === 'etut') {
    modalGoster('🎉', 'Tebrikler!', mesaj);
  } else {
    toast('✅ ' + adim.ad + ' tamamlandı');
  }
  
  // Güncellemeler
  programRenderEt();
  adaGuncelle();
  istatistikGuncelle();
  yeniMotivasyon();
  
  // Sonraki adımı bul
  setTimeout(() => {
    simdikiAdimiBul();
  }, 1000);
}

function etutAtla() {
  modalGoster('⏭️', 'Atlamak istiyor musun?',
    'Bu adım yapılmamış sayılacak. Emin misin?',
    'Evet, Atla',
    () => {
      // Sadece bir sonraki adıma geç (yapıldı saymadan)
      let sonraki = simdikiAdimIndex + 1;
      while (sonraki < GUNLUK_PROGRAM.length && GUNLUK_PROGRAM[sonraki].blok) sonraki++;
      if (sonraki < GUNLUK_PROGRAM.length) {
        simdikiAdimIndex = sonraki;
        aktifEtutGuncelle();
        programRenderEt();
      }
      modalKapat();
      toast('Atlandı');
    });
}

// ========== ADA GÖRÜNÜMÜ ==========

function adaGuncelle() {
  // İstatistikler
  document.getElementById('adaToplamEtut').textContent = kullaniciVeri.toplamEtut;
  document.getElementById('adaGun').textContent = kullaniciVeri.calisilanGunler.length + 
    (kullaniciVeri.bugun.etutSayisi > 0 ? 1 : 0);
  document.getElementById('adaSaat').textContent = Math.floor(kullaniciVeri.toplamDakika / 60);
  
  // Ada seviyesi
  const toplam = kullaniciVeri.toplamEtut;
  let seviye = ADA_SEVIYELER[0];
  for (const s of ADA_SEVIYELER) {
    if (toplam >= s.min) seviye = s;
  }
  document.getElementById('adaSeviye').textContent = seviye.ad;
  
  // Ada öğelerini render et
  const adaYapi = document.getElementById('adaYapi');
  adaYapi.innerHTML = '';
  
  const bugunEtut = kullaniciVeri.bugun.etutSayisi;
  
  // Bugünkü etütlere göre bitkiler/ağaçlar
  ADA_AGACLARI.forEach((ag, index) => {
    if (bugunEtut >= ag.etutSayisi) {
      const el = document.createElement('div');
      el.className = 'ada-oge ' + ag.pos;
      el.style.animationDelay = (index * 0.1) + 's';
      el.innerHTML = `<span class="ada-oge-emoji">${ag.oge}</span>`;
      adaYapi.appendChild(el);
    }
  });
  
  // Toplam güne göre bonus öğeler (kalıcı)
  const toplamGun = kullaniciVeri.calisilanGunler.length;
  ADA_BONUSLARI.forEach((bonus, index) => {
    if (toplamGun >= bonus.gun) {
      const el = document.createElement('div');
      el.className = 'ada-oge ' + bonus.pos;
      if (bonus.bottom) el.style.bottom = bonus.bottom;
      el.style.animationDelay = ((ADA_AGACLARI.length + index) * 0.08) + 's';
      el.innerHTML = `<span class="ada-oge-emoji" style="font-size:24px">${bonus.oge}</span>`;
      adaYapi.appendChild(el);
    }
  });
}

function adayaEkle() {
  // Yeni eklenen öğeyi bul (bugün kaç etüt yapıldıysa o öğe)
  const bugunEtut = kullaniciVeri.bugun.etutSayisi;
  const agac = ADA_AGACLARI.find(a => a.etutSayisi === bugunEtut);
  if (agac) {
    setTimeout(() => {
      toast(`🌱 Adana ${agac.oge} ${agac.ad} eklendi!`);
    }, 500);
  }
}

// ========== İSTATİSTİK ==========

function istatistikGuncelle() {
  // Bugünkü
  const bugunDk = kullaniciVeri.bugun.dakika;
  const bugunSaat = Math.floor(bugunDk / 60);
  const bugunKalanDk = bugunDk % 60;
  document.getElementById('bugunSaat').textContent = 
    bugunSaat > 0 ? `${bugunSaat}sa ${bugunKalanDk}dk` : `${bugunKalanDk}dk`;
  document.getElementById('bugunEtutSayisi').textContent = 
    `${kullaniciVeri.bugun.etutSayisi} etüt tamamlandı`;
  
  // Toplam
  document.getElementById('stTopEtut').textContent = kullaniciVeri.toplamEtut;
  document.getElementById('stTopSaat').textContent = Math.floor(kullaniciVeri.toplamDakika / 60);
  const toplamGun = kullaniciVeri.calisilanGunler.length + (kullaniciVeri.bugun.etutSayisi > 0 ? 1 : 0);
  document.getElementById('stTopGun').textContent = toplamGun;
  document.getElementById('stOrtEtut').textContent = 
    toplamGun > 0 ? (kullaniciVeri.toplamEtut / toplamGun).toFixed(1) : '0';
  
  // Geçmiş liste
  const gecmis = document.getElementById('gecmisListe');
  const gunler = [...kullaniciVeri.calisilanGunler].reverse().slice(0, 15);
  
  if (gunler.length === 0 && kullaniciVeri.bugun.etutSayisi === 0) {
    gecmis.innerHTML = `
      <div class="bos-liste">
        <div class="bos-liste-ikon">📊</div>
        <div class="bos-liste-yazi">Henüz kayıt yok.<br>İlk etüt tamamlandığında burada görünecek!</div>
      </div>
    `;
    return;
  }
  
  let html = '';
  
  // Bugün varsa başa ekle
  if (kullaniciVeri.bugun.etutSayisi > 0) {
    const bugunSa = Math.floor(kullaniciVeri.bugun.dakika / 60);
    const bugunDk2 = kullaniciVeri.bugun.dakika % 60;
    html += `
      <div class="gecmis-item" style="background:var(--pembe-cok-acik)">
        <div class="gecmis-sol">
          <div class="gecmis-tarih">🔴 BUGÜN</div>
          <div class="gecmis-detay">${tarihFormat(kullaniciVeri.bugun.tarih)}</div>
        </div>
        <div class="gecmis-sag">
          <div class="gecmis-etut-sayi">${kullaniciVeri.bugun.etutSayisi}</div>
          <div class="gecmis-sure">${bugunSa > 0 ? bugunSa + 'sa ' : ''}${bugunDk2}dk</div>
        </div>
      </div>
    `;
  }
  
  gunler.forEach(gun => {
    const sa = Math.floor(gun.dakika / 60);
    const dk = gun.dakika % 60;
    html += `
      <div class="gecmis-item">
        <div class="gecmis-sol">
          <div class="gecmis-tarih">${tarihFormat(gun.tarih)}</div>
          <div class="gecmis-detay">${gun.etutSayisi} etüt</div>
        </div>
        <div class="gecmis-sag">
          <div class="gecmis-etut-sayi">${gun.etutSayisi}</div>
          <div class="gecmis-sure">${sa > 0 ? sa + 'sa ' : ''}${dk}dk</div>
        </div>
      </div>
    `;
  });
  
  gecmis.innerHTML = html;
}

// ========== AYARLAR ==========

function ayarlariYukle() {
  // Toggle'ları kur
  if (kullaniciVeri.ayarlar.sesAcik) {
    document.getElementById('tSes').classList.add('aktif');
  } else {
    document.getElementById('tSes').classList.remove('aktif');
  }
  if (kullaniciVeri.ayarlar.titresimAcik) {
    document.getElementById('tTit').classList.add('aktif');
  } else {
    document.getElementById('tTit').classList.remove('aktif');
  }
  if (kullaniciVeri.ayarlar.konfettiAcik) {
    document.getElementById('tKon').classList.add('aktif');
  } else {
    document.getElementById('tKon').classList.remove('aktif');
  }
}

function toggleBas(elId, ayarKey) {
  const el = document.getElementById(elId);
  el.classList.toggle('aktif');
  kullaniciVeri.ayarlar[ayarKey] = el.classList.contains('aktif');
  veriKaydet();
  toast(`Ayar kaydedildi`);
}

function bugunSifirla() {
  modalGoster('⚠️', 'Emin misin?',
    'Bugün yaptığın her şey silinecek. Geri alınamaz.',
    'Evet, Sıfırla',
    () => {
      // Bugünün etütlerini toplam'dan düş
      kullaniciVeri.toplamEtut -= kullaniciVeri.bugun.etutSayisi;
      kullaniciVeri.toplamDakika -= kullaniciVeri.bugun.dakika;
      kullaniciVeri.toplamSaat = Math.floor(kullaniciVeri.toplamDakika / 60);
      
      kullaniciVeri.bugun = {
        tarih: bugunTarih(),
        yapilanAdimlar: [],
        etutSayisi: 0,
        dakika: 0,
      };
      
      veriKaydet();
      modalKapat();
      toast('🔄 Bugün sıfırlandı');
      
      programRenderEt();
      adaGuncelle();
      istatistikGuncelle();
    });
}

// ========== SAYFA GEÇİŞİ ==========

function sayfaGec(sayfa) {
  document.querySelectorAll('.sayfa').forEach(s => s.classList.remove('aktif'));
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('aktif'));
  
  const sayfaId = 'sayfa' + sayfa.charAt(0).toUpperCase() + sayfa.slice(1);
  document.getElementById(sayfaId).classList.add('aktif');
  
  // Tab seç
  const tabIndex = { ana: 0, program: 1, istat: 2, ayarlar: 3 }[sayfa];
  if (tabIndex !== undefined) {
    document.querySelectorAll('.tab')[tabIndex].classList.add('aktif');
  }
  
  // İstatistik sayfasına geçince güncelle
  if (sayfa === 'istat') istatistikGuncelle();
  if (sayfa === 'program') programRenderEt();
  
  window.scrollTo(0, 0);
}

// ========== MODAL ==========

let modalIkincilAksiyonFn = null;

function modalGoster(ikon, baslik, mesaj, butonYazi, butonFn, ikincilYazi, ikincilFn) {
  document.getElementById('modalIkon').textContent = ikon;
  document.getElementById('modalBaslik').textContent = baslik;
  document.getElementById('modalMesaj').textContent = mesaj;
  document.getElementById('modalButon').textContent = butonYazi || 'Tamam';
  
  document.getElementById('modalButon').onclick = () => {
    modalKapat();
    if (butonFn) butonFn();
  };
  
  if (ikincilYazi) {
    document.getElementById('modalIkincilBtn').style.display = 'block';
    document.getElementById('modalIkincilBtn').textContent = ikincilYazi;
    modalIkincilAksiyonFn = ikincilFn;
  } else {
    document.getElementById('modalIkincilBtn').style.display = 'none';
  }
  
  document.getElementById('modalArka').classList.add('aktif');
}

function modalKapat() {
  document.getElementById('modalArka').classList.remove('aktif');
}

function modalIkincilAksiyon() {
  if (modalIkincilAksiyonFn) modalIkincilAksiyonFn();
  modalKapat();
}

// ========== TOAST ==========

function toast(mesaj) {
  const t = document.getElementById('toast');
  t.textContent = mesaj;
  t.classList.add('goster');
  setTimeout(() => t.classList.remove('goster'), 3000);
}

// ========== KONFETI ==========

function konfetiPatlat() {
  const alan = document.getElementById('konfetti');
  const renkler = ['#E91E63', '#F06292', '#9C27B0', '#BA68C8', '#FFC107', '#FFD54F', '#C8E6C9', '#FFAB91'];
  
  for (let i = 0; i < 60; i++) {
    const parca = document.createElement('div');
    parca.className = 'konfetti-parca';
    parca.style.left = Math.random() * 100 + '%';
    parca.style.background = renkler[Math.floor(Math.random() * renkler.length)];
    parca.style.animationDelay = Math.random() * 0.5 + 's';
    parca.style.animationDuration = (2 + Math.random() * 2) + 's';
    parca.style.width = parca.style.height = (5 + Math.random() * 8) + 'px';
    parca.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
    alan.appendChild(parca);
    
    setTimeout(() => parca.remove(), 5000);
  }
}

// ========== ALARM SESİ ==========

function alarmCal() {
  try {
    // Audio context ile bip ses üret (base64 kısa olduğu için)
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    
    // 3 kere bip
    for (let i = 0; i < 5; i++) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      
      osc.frequency.value = 880;  // A5 notası
      osc.type = 'sine';
      
      const start = audioCtx.currentTime + i * 0.4;
      gain.gain.setValueAtTime(0, start);
      gain.gain.linearRampToValueAtTime(0.3, start + 0.05);
      gain.gain.linearRampToValueAtTime(0, start + 0.25);
      
      osc.start(start);
      osc.stop(start + 0.3);
    }
  } catch(e) {
    console.log('Ses çalınamadı');
  }
}

// ========== BİLDİRİM ==========

function bildirimGonder(baslik, mesaj) {
  if ('Notification' in window && Notification.permission === 'granted') {
    try {
      new Notification(baslik, {
        body: mesaj,
        icon: 'icon-192.png',
        badge: 'icon-192.png',
        vibrate: [200, 100, 200],
        tag: 'kpss-etut',
      });
    } catch(e) {}
  }
}

// ========== MOTİVASYON ==========

function yeniMotivasyon() {
  const rastgele = MOTIVASYON_MESAJLARI[Math.floor(Math.random() * MOTIVASYON_MESAJLARI.length)];
  const el = document.getElementById('motivasyonYazi');
  if (el) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.textContent = rastgele;
      el.style.opacity = '1';
    }, 300);
  }
}

// ========== YARDIMCI FONKSİYONLAR ==========

function bugunTarih() {
  const d = new Date();
  return d.getFullYear() + '-' + 
    String(d.getMonth()+1).padStart(2,'0') + '-' + 
    String(d.getDate()).padStart(2,'0');
}

function tarihFormat(t) {
  const d = new Date(t + 'T00:00:00');
  const ay = ['Oca','Şub','Mar','Nis','May','Haz','Tem','Ağu','Eyl','Eki','Kas','Ara'][d.getMonth()];
  const gun = ['Paz','Pzt','Sal','Çar','Per','Cum','Cmt'][d.getDay()];
  return `${gun} ${d.getDate()} ${ay}`;
}

function veriKaydet() {
  if (!aktifKullanici) return;
  const key = 'kpss_veri_' + aktifKullanici.toLowerCase();
  localStorage.setItem(key, JSON.stringify(kullaniciVeri));
}

// ========== SAYFA YÜKLENİNCE - OTOMATİK GİRİŞ ==========

window.addEventListener('load', () => {
  // Daha önce giriş yapmış mı?
  const aktif = localStorage.getItem('kpss_aktif_kullanici');
  if (aktif) {
    const key = 'kpss_veri_' + aktif.toLowerCase();
    const kayitli = localStorage.getItem(key);
    if (kayitli) {
      aktifKullanici = aktif;
      kullaniciVeri = JSON.parse(kayitli);
      
      document.getElementById('girisEkrani').style.display = 'none';
      document.getElementById('uygulama').classList.add('aktif');
      document.getElementById('altNav').style.display = 'flex';
      
      baslat();
      return;
    }
  }
  
  // Enter ile giriş
  document.getElementById('isimInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') girisYap();
  });
});

// ========== TELEFON ANA EKRANA EKLEME İPUCU ==========

let deferredPrompt;
window.addEventListener('beforeinstallprompt', (e) => {
  e.preventDefault();
  deferredPrompt = e;
  
  // 5 saniye sonra ipucu göster
  setTimeout(() => {
    if (deferredPrompt && aktifKullanici) {
      toast('📱 Menüden "Ana Ekrana Ekle" diyebilirsin!');
    }
  }, 5000);
});
