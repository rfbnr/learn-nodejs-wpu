const { MongoClient, ObjectId } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri);

const dbName = "belajar-mongodb";

client.connect((error, connect) => {
    if (error) {
        return console.log("Koneksi gagal");
    }

    const db = client.db(dbName);
    const collection = db.collection("mahasiswa");

    // Menambahkan 1 data ke collection mahasiswa
    /*
    collection.insertOne(
        {
            nama: "Adis2",
            email: "adis2@gmail.com"
        },
        (error, result) => {
            if (error) {
                return console.log("Gagal menambahkan data");
            }

            console.log(result);
        }
    )
    */
    
    // Menambahkan lebih dari 1 data ke collection
    /*
    collection.insertMany(
        [
            {
                nama: "Raka Dzakwan",
                email: "rakadzak@gmail.com",
            },
            {
                nama: "Ryan Hesriana",
                email: "rianhes@gmail.com",
            },
        ],
        (error, result) => {
            if (error) {
                return console.log("Gagal menambahkan data");
            }

            console.log(result);
        }
    );
    */
    
    // Menampil semua data di collection mahasiswa
    /*
    const findResult = collection.find().toArray((err, res) => {
        if (error) {
            return console.log("Gagal menampilkan semua data")
        }
        console.log(res);
    });
    console.log(findResult);
    */
    
    // Menampilkan data berdasarkan kriteria yang ada di collection mahasiswa
    /*
    const findResult = collection
        .find({ _id: ObjectId("62b8255883ea550e02950597") }) // berdasarkan id
        .find({ nama: "Ridwan" }) // berdasarkan nama
        .toArray((err, res) => {
            if (error) {
                return console.log("Gagal menampilkan semua data");
            }
            console.log(res);
        });
    console.log(findResult);
    */
    
    // Mengubah data berdasarkan id
    /*
    const updateData = collection.updateOne(
        {
            _id: ObjectId("62b8246a56fc7a70347ca7fc"), // berdasarkan id
            // nama: "Adis" // berdasarkan nama
        },
        {
            $set: {
                nama: "Raka Rev2", // data yang diubah berdasarkan id
                // nama: "Adis Maulana" // data yang diubah berdasarkan nama
            }
        },
        (error, result) => {
            if (error) {
                return console.log("Gagal mengubah data");
            }
            console.log(result);
        }
    );
    console.log(updateData);
    */
    
    // Menghapus 1 data di collection mahasiswa
    /*
    collection.deleteOne(
        {
            _id: ObjectId("62b8246a56fc7a70347ca7fc")
        },
        (error, result) => {
            console.log(result);
        }
    );
    */
    
    // Menghapus beberapa data di collection mahasiswa
    /*
    collection.deleteMany(
        {
            nama: "Ryan"
        }
    ).then(result => console.log(result));
    */
});
