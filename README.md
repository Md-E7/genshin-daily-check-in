### Prasyarat

<details>
<summary>Windows</summary>

- [Git](https://git-scm.com/)
- [Node LTS](https://nodejs.org/)
- Browser devtools untuk mendapatkan act_id dan cookie
  - Buka check in page genshin impact dan pastikan kalian sudah melakukan login dan buka devtools dengan F12 dan pencet tab tulisan "Console" dan jalankan perinah berikut untuk otomatis mendapatkan act_id dan cookie
  ```javascript
  const url = new URL(window.location.href)
  const act_id = url.searchParams.get('act_id')
  
  cookieStore.getAll().then(cookies => {
    let cookie = ''
    
    for (const [index, cookieObject] of cookies.entries()) {
      if (index === cookies.length - 1) {
        cookie = cookie.concat(`${cookieObject.name}=${cookieObject.value}`)
      } else {
        cookie = cookie.concat(`${cookieObject.name}=${cookieObject.value}; `)
      }
    }
  
    console.log({
      "name": "Unamed",
      "act_id": act_id,
      "cookie": cookie
    })
  })
  ```
</details>

<details>
<summary>Android (Termux)</summary>

- [Termux](https://github.com/termux/termux-app/releases)
- Git
- Node LTS
- Kiwi browser untuk membuka devtools dan mendapatkan act_id dan cookie
  - Buka daily check in page genshin impact dan pastikan kalian sudah melakukan login dan buka devtools dengan cara pencet titik tiga vertikal di kanan atas kiwi browser geser kebawah sampai ketemu "Developers tools" klik dan nanti kiwi browser akan membuka devtools di tab baru pindah ke tab devtools dan pencet tab tulisan "Console" dan jalankan perinah berikut untuk otomatis mendapatkan act_id dan cookie
  ```javascript
  const url = new URL(window.location.href)
  const act_id = url.searchParams.get('act_id')
  
  cookieStore.getAll().then(cookies => {
    let cookie = ''
    
    for (const [index, cookieObject] of cookies.entries()) {
      if (index === cookies.length - 1) {
        cookie = cookie.concat(`${cookieObject.name}=${cookieObject.value}`)
      } else {
        cookie = cookie.concat(`${cookieObject.name}=${cookieObject.value}; `)
      }
    }
  
    console.log({
      "name": "Unamed",
      "act_id": act_id,
      "cookie": cookie
    })
  })
  ```
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
