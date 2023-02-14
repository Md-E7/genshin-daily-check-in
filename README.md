### Prasyarat

<details>
<summary>Windows</summary>

- [Git](https://git-scm.com/)
- [Node LTS](https://nodejs.org/)
- Browser devtools untuk mendapatkan cookie dan act_id
  - Buka check in page genshin impact dan buka devtools dengan F12
  - Klik tanda "+" dan pilih "Network" aktifkan "Record network log" setelah itu lakukan login
  - Setelah melakukan login di bagian table kolom "name" cari yang bertuliskan "info" setelah ketemu klik dan nanti akan membuka menu baru
  - Setelah menu baru terbuka klik "Headers" terus geser kebawah sampai ketemu "Request Headers" terus cari tulisan "cookie" terus klik kanan dan copy
  - Untuk mendapatkan "act_id" klik "Payload" terus di bagian "Query String Parameters" cari "act_id" dan copy
</details>

<details>
<summary>Android (Termux)</summary>

- [Termux](https://github.com/termux/termux-app/releases)
- Git
- Node LTS
- Kiwi browser untuk membuka devtools dan mendapatkan cookie dan act_id
    - Buka daily check in page genshin impact dan buka devtools dengan titik tiga vertikal di kanan atas kiwi browser geser kebawah sampai ketemu "Developers tools" klik dan nanti kiwi browser akan membuka devtools di tab baru
    - (Saran buka daily check in page dan devtools page dalam desktop mode)
    - Klik tanda ">>" dan pilih "Network" aktifkan "Record network log" setelah itu pindah ke tab daily check in page genshin impact dan lakukan login
    - Setelah melakukan login di bagian table kolom "name" cari yang bertuliskan "info" setelah ketemu klik dan nanti akan membuka menu baru
    - Setelah menu baru terbuka klik "Headers" terus geser kebawah sampai ketemu "Request Headers" terus cari tulisan "cookie" terus klik kanan dan copy
    - Untuk mendapatkan "act_id" klik "Payload" terus di bagian "Query String Parameters" cari "act_id" dan copy
</details>

### Instalasi

<details>
<summary>Windows</summary>

Jika git dan node lts sudah terinstall lakukan

```shell
git clone https://github.com/Md-E7/genshin-daily-check-in.git
cd genshin-daily-check-in
npm install
```

Setelah npm install selesai copy config.example.json ke folder dist dan ubah nama config.example.json menjadi config.json

```shell
cp config.example.json dist/config.json
```

Setelah config.json sudah ada di folder dist edit config.json menggunakan notepad atau text/code editor yang lain

```shell
notepad dist/config.json
```
Setelah text/code editor terbuka isi act_id dan cookie seperti yang kalian dapat dari browser devtools

```json
{
  "discord_webhook_url": "",
  "accounts": [
    {
      "name": "(Optional) nama genshin atau hoyolab kalian",
      "act_id": "masukan act_id ke sini",
      "cookie": "masukan cookie ke sini"
    }
  ]
}
```
Untuk melakukan auto check in di banyak akun lakukan seperti ini

```json
{
  "discord_webhook_url": "",
  "accounts": [
    {
      "name": "Akun 1",
      "act_id": "masukan act_id akun ke 1 kalian ke sini",
      "cookie": "masukan cookie akun ke 1 kalian ke sini"
    },
    {
      "name": "Akun 2",
      "act_id": "masukan act_id akun ke 2 kalian ke sini",
      "cookie": "masukan cookie akun ke 2 kalian ke sini"
    },
    {
      "name": "Akun 3",
      "act_id": "masukan act_id akun ke 3 kalian ke sini",
      "cookie": "masukan cookie akun ke 3 kalian ke sini"
    }
  ]
}
```
</details>

<details>
<summary>Android (Termux)</summary>

Lakukan apt atau pkg update dan upgrade terlebih dahulu

```shell
apt update
apt upgrade
```

Setelah itu install git dan node

```shell
apt install git -y
apt install nodejs-lts -y
```

Setelah git dan nodejs sudah terinstall lakukan git clone dan npm install

```shell
git clone https://github.com/Md-E7/genshin-daily-check-in.git
cd genshin-daily-check-in
npm install
```

Setelah npm install selesai copy config.example.json ke folder dist dan ubah nama config.example.json menjadi config.json

```shell
cp config.example.json dist/config.json
```

Setelah config.json sudah ada di folder dist edit config.json menggunakan nano atau text/code editor yang lain

```shell
nano dist/config.json
```

Setelah text/code editor terbuka isi act_id dan cookie seperti yang kalian dapat dari browser devtools

```json
{
  "discord_webhook_url": "",
  "accounts": [
    {
      "name": "(Optional) nama genshin atau hoyolab kalian",
      "act_id": "masukan act_id ke sini",
      "cookie": "masukan cookie ke sini"
    }
  ]
}
```
Untuk melakukan auto check in di banyak akun lakukan seperti ini

```json
{
  "discord_webhook_url": "",
  "accounts": [
    {
      "name": "Akun 1",
      "act_id": "masukan act_id akun ke 1 kalian ke sini",
      "cookie": "masukan cookie akun ke 1 kalian ke sini"
    },
    {
      "name": "Akun 2",
      "act_id": "masukan act_id akun ke 2 kalian ke sini",
      "cookie": "masukan cookie akun ke 2 kalian ke sini"
    },
    {
      "name": "Akun 3",
      "act_id": "masukan act_id akun ke 3 kalian ke sini",
      "cookie": "masukan cookie akun ke 3 kalian ke sini"
    }
  ]
}
```
</details>
