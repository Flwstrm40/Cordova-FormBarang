document.addEventListener("DOMContentLoaded", function () {
  tampilkanDaftarBarang();
});

function tampilkanDaftarBarang() {
  var daftarBarang = localStorage.getItem('daftarBarang');
  var tbody = document.getElementById('listBarang');
  tbody.innerHTML = '';
  daftarBarang = JSON.parse(daftarBarang);

  if (daftarBarang.length > 0) {
    var tabelBarang = document.getElementById('tabelBarang');
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

      // Tambahkan tombol aksi (kurangi dan tambah stok)
      var buttonKurang = document.createElement('button');
      buttonKurang.textContent = '-';
      buttonKurang.className = 'button-kurang';
      buttonKurang.addEventListener('click', function () {
        updateStok(index, -1);
      });

      var buttonTambah = document.createElement('button');
      buttonTambah.textContent = '+';
      buttonTambah.className = 'button-tambah';
      buttonTambah.addEventListener('click', function () {
        updateStok(index, 1);
      });

      // Tambahkan tombol hapus dengan fungsi hapusData
      var buttonHapus = document.createElement('button');
      buttonHapus.textContent = 'Hapus';
      buttonHapus.className = 'button-hapus';
      buttonHapus.addEventListener('click', function () {
        hapusData(index);
      });

      cellAksi.appendChild(buttonKurang);
      cellAksi.appendChild(buttonTambah);
      cellAksi.appendChild(buttonHapus);
    });
  } else {
    // Jika tidak ada data, tampilkan pesan
    var row = tbody.insertRow();
    var cellInfo = row.insertCell(0);
    cellInfo.colSpan = 5;
    cellInfo.textContent = 'Belum ada barang yang ditambahkan.';
  }
}

function simpanData() {
  var nama = document.getElementById('nama').value;
  var harga = document.getElementById('harga').value;
  var stok = document.getElementById('stok').value;

  if (!nama || !harga || !stok) {
    alert('Harap isi semua kolom.');
    return;
  }

  var barangBaru = {
    nama: nama,
    harga: harga,
    stok: stok
  };

  var daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
  daftarBarang.push(barangBaru);
  localStorage.setItem('daftarBarang', JSON.stringify(daftarBarang));

  tampilkanDaftarBarang();

  document.getElementById('nama').value = '';
  document.getElementById('harga').value = '';
  document.getElementById('stok').value = '';

  alert('Data barang berhasil disimpan.');
}

function updateStok(index, delta) {
  var tbody = document.getElementById('listBarang');
  var stokElement = tbody.rows[index].cells[3];
  var stok = parseInt(stokElement.textContent);

  stok += delta;
  stok = Math.max(0, stok);

  stokElement.textContent = stok;

  var daftarBarang = JSON.parse(localStorage.getItem('daftarBarang')) || [];
  daftarBarang[index].stok = stok;
  localStorage.setItem('daftarBarang', JSON.stringify(daftarBarang));
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