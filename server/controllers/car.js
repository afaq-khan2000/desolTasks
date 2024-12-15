const cloudinary = require('cloudinary').v2;
const Car = require('../models/Car');
require('dotenv').config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const submitCar = async (req, res) => {
    const { model, price, phone, city, user } = req.body;
    const images = [];

    try {
        for (const file of req.files) {
            const result = await new Promise((resolve, reject) => {
                const uploadStream = cloudinary.uploader.upload_stream(
                    { resource_type: "image" },
                    (error, result) => {
                        if (error) reject(error);
                        else resolve(result);
                    }
                );
                uploadStream.end(file.buffer);
            });

            images.push(result.secure_url);
        }
        const car = new Car({ user, model, price, phone, city, images });
        await car.save();

        res.json({ message: "Car submitted successfully", car });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Failed to submit car", error: error.message });
    }
};

module.exports = { submitCar };
