const mongoose = require("mongoose");

const connectDB = async() => {
    await
        mongoose.connect(
            'mongodb+srv://shubhamb:h6JJI94aomXLzlQY@namastenode.ciolm.mongodb.net/devTinder'
        );
}

module.exports = connectDB;