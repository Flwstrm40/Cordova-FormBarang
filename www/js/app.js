document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  tampilkanDaftarBarang();
}

function tampilkanDaftarBarang() {
  // Simpan daftar barang dalam Local Storage
  var daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];

  // Tampilkan daftar barang pada halaman
  var listBarang = document.getElementById('listBarang');
  listBarang.innerHTML = '';

  daftarBarang.forEach(function (barang) {
    var listItem = document.createElement('li');
    listItem.textContent = `Nama: ${barang.nama}, Harga: ${barang.harga}, Stok: ${barang.stok}`;
    listBarang.appendChild(listItem);
  });
}

function simpanData() {
  var nama = document.getElementById('nama').value;
  var harga = document.getElementById('harga').value;
  var stok = document.getElementById('stok').value;

  // Validasi
  if (!nama || !harga || !stok) {
    alert('Harap isi semua kolom.');
    return;
  }

  // Buat objek barang baru
  var barangBaru = {
    nama: nama,
    harga: harga,
    stok: stok
  };

  // Simpan ke Local Storage
  var daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
  daftarBarang.push(barangBaru);
  localStorage.setItem('daftarBarang', JSON.stringify(daftarBarang));

  // Tampilkan kembali daftar barang
  tampilkanDaftarBarang();

  // Bersihkan formulir
  document.getElementById('nama').value = '';
  document.getElementById('harga').value = '';
  document.getElementById('stok').value = '';

  alert('Data barang berhasil disimpan.');
}
