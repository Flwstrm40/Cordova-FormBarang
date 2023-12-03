document.addEventListener('deviceready', onDeviceReady, false);

function onDeviceReady() {
  tampilkanDaftarBarang();
}

function tampilkanDaftarBarang() {
  // Simpan daftar barang dalam Local Storage
  var daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];

  // Tampilkan daftar barang pada tabel
  var tabelBarang = document.getElementById('tabelBarang');
  var tbody = document.getElementById('listBarang');
  tbody.innerHTML = '';

  if (daftarBarang.length === 0) {
    // Jika daftar barang kosong, tambahkan pesan
    var row = tbody.insertRow();
    var cellInfo = row.insertCell(0);
    cellInfo.colSpan = 5;
    cellInfo.textContent = 'Belum ada barang yang ditambahkan.';
  } else {
    daftarBarang.forEach(function (barang, index) {
      var row = tbody.insertRow();
      var cellNomor = row.insertCell(0);
      var cellNama = row.insertCell(1);
      var cellHarga = row.insertCell(2);
      var cellStok = row.insertCell(3);
      var cellAksi = row.insertCell(4);

      cellNomor.textContent = index + 1;
      cellNama.textContent = barang.nama;
      cellHarga.textContent = barang.harga;
      cellStok.textContent = barang.stok;

      // Tambahkan tombol hapus dengan fungsi hapusData
      var buttonHapus = document.createElement('button');
      buttonHapus.textContent = 'Hapus';
      buttonHapus.addEventListener('click', function () {
        hapusData(index);
      });

      cellAksi.appendChild(buttonHapus);
    });
  }
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

function hapusData(index) {
  // Hapus item dari Local Storage
  var daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
  daftarBarang.splice(index, 1);
  localStorage.setItem('daftarBarang', JSON.stringify(daftarBarang));

  // Tampilkan kembali daftar barang
  tampilkanDaftarBarang();

  alert('Data barang berhasil dihapus.');
}