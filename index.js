// modul bawaan dari node js untuk menuntukan direktori atau pengalamat folder supaya tidak terjadi error
const path = require('path');
// memanggil library express js kedalam project kita dan membuat objek dari express js
const express = require('express');

// membuat object dari express js 
const app = express();

// memanggil data json kedalam index kalau di php ini merupakan include 
const tagsData = require('./data.json');

// untuk mengakses view engine ejs pada express js 
app.set('view engine','ejs');

// menggabungankan path project kita 
// app.set('view', path.join(__dirname, '/views'));
// contoh pathnya adalah : sukandawiguna@Sukandas-MacBook-Pro express-ejs % (pada macbook)

// untuk mengakses file static yang kita miliki seperti CSS, foto dll 
app.use(express.static('public'));

// membuat router baru dengan menggunkan path parameter, untuk apapunyang di inputkan oleh user di url, ambil data nya 
app.get('/t/:tag', (req, res) => {

    // console.log(tagsData); 

    //membuat variabel tag dan isinya di dapat dari req params yang di inputkan oleh user
    const {tag} = req.params;

    // membuat variabel data dan di isi dengan tag data file data.json, [tag]->merupakan inputan dari user 
    const data = tagsData[tag];

    if (data) {
    
        res.render('tag', {data});
        
    }else{
    
        res.render('notfound', {tag});
         
    }

});



// membuat router dimana ketika halaman di akses akan menampilkan file home.ejs yang ada didalam folder views 
app.get('/', (req,res) => {
    res.render('home');
} );

app.get('/cats',(req, res) => {

    // membuat variabel yang tipe datanya array 
    const cats = [
        'embul','unyil','usro', 'timi', 'ujang' 
    ]

    // {cats} merupakan variabel yang akan di kirim atau di render di view mencakup semua tipe data 
    res.render('cats',{ cats });
});

app.get('/rand', (req, res) => {

    // membuat variabel yang akan di kirim ke view 
    const math = Math.floor(Math.random() * 10) + 1;

    // merender view dengan membawa objek dengan key random dan value dari variabel math 
    res.render('random', {random: math});

    // atau bisa juga dengan cara ini 
    // res.render('random', {math});

});

// membuat localhost atau port yang akan kita gunakan 
app.listen(8080, () => {
    console.log(`Listening on host http://localhost:8080`);
});