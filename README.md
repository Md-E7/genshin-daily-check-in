### Prasyarat

<details>
<summary>Windows</summary>

- [Git](https://git-scm.com/)
- [Node.js LTS](https://nodejs.org/)
- Browser devtools untuk mendapatkan act_id dan cookie
  - Buka daily-check-in web page genshin impact dan pastikan kalian sudah melakukan login
  - Buka devtools console dan jalankan script berikut untuk otomatis mendapatkan act_id dan cookie
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
- Node.js LTS
- Kiwi browser untuk membuka devtools dan mendapatkan act_id dan cookie
  - Buka daily-check-in web page genshin impact dan pastikan kalian sudah melakukan login
  - Buka devtools console dan jalankan script berikut untuk otomatis mendapatkan act_id dan cookie
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
      "act_id": act_id,
      "cookie": cookie
    })
  })
  ```
</details>

### Instalasi

<details>
<summary>Windows</summary>

Install genshin-daily-check-in menggunakan npm

```shell
npm install -g Md-E7/genshin-daily-check-in
```

</details>

<details>
<summary>Android (Termux)</summary>

Lakukan apt atau pkg update dan upgrade terlebih dahulu

```shell
apt update
apt upgrade
```

Install nodejs

```shell
apt install nodejs-lts -y
```

Install genshin-daily-check-in menggunakan npm

```shell
npm install -g Md-E7/genshin-daily-check-in
```
</details>

### Penggunaan

Pertama-tama kalian harus memasukan data kalian seperti nama act_id dan cookie jika tidak genshin-daily-check-in tidak akan berkerja

Data nama bisa bebas terserah kalian tapi data act_id dan cookie tidak boleh asal-asalan

```shell
genshin-daily-check-in account add [nama] [act_id] [cookie]
```

Untuk menjalankan genshin-daily-check-in sekali

```shell
genshin-daily-check-in start
```

Untuk menjalankan genshin-daily-check-in setiap hari pada jam 12:00

```shell
genshin-daily-check-in start-forever
```
