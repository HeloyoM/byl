// routes/mediaRoutes.js

const express = require("express");
const router = express.Router();
const Media = require("../models/Media");
const cloudinary = require("cloudinary").v2;

// Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
  secure: true
});

console.log(cloudinary.config());

/////////////////////////
// Uploads an image file
/////////////////////////
// const uploadImage = async (imagePath) => {

  // Use the uploaded file's name as the asset's public ID and 
  // allow overwriting the asset with new versions
//   const options = {
//     use_filename: true,
//     unique_filename: false,
//     overwrite: true,
//   };

//   try {
//     // Upload the image
//     const result = await cloudinary.uploader.upload(imagePath, options);
//     console.log(result);
//     return result.public_id;
//   } catch (error) {
//     console.error(error);
//   }
// };


/////////////////////////////////////
// Gets details of an uploaded image
/////////////////////////////////////
// const getAssetInfo = async (publicId) => {

//   // Return colors in the response
//   const options = {
//     colors: true,
//   };

//   try {
//     // Get details about the asset
//     const result = await cloudinary.api.resource(publicId, options);
//     console.log(result);
//     return result.colors;
//   } catch (error) {
//     console.error(error);
//   }
// };


//////////////////////////////////////////////////////////////
// Creates an HTML image tag with a transformation that
// results in a circular thumbnail crop of the image  
// focused on the faces, applying an outline of the  
// first color, and setting a background of the second color.
//////////////////////////////////////////////////////////////
// const createImageTag = (publicId, ...colors) => {

//   // Set the effect color and background color
//   const [effectColor, backgroundColor] = colors;

//   // Create an image tag with transformations applied to the src URL
//   let imageTag = cloudinary.image(publicId, {
//     transformation: [
//       { width: 250, height: 250, gravity: 'faces', crop: 'thumb' },
//       { radius: 'max' },
//       { effect: 'outline:10', color: effectColor },
//       { background: backgroundColor },
//     ],
//   });

//   return imageTag;
// };



//////////////////
//
// Main function
//
//////////////////
// (async () => {

//   // Set the image to upload
//   const imagePath = 'https://cloudinary-devs.github.io/cld-docs-assets/assets/images/happy_people.jpg';

//   // Upload the image
//   const publicId = await uploadImage(imagePath);
//   console.log({ publicId })
//   // Get the colors in the image
//   const colors = await getAssetInfo(publicId);

//   // Create an image tag, using two of the colors in a transformation
//   const imageTag = await createImageTag(publicId, colors[0][0], colors[1][0]);

//   // Log the image tag to the console
//   console.log(imageTag);

// })();


// Upload media
// router.post("/upload", async (req, res) => {
//   try {
//     const { type, description, file } = req.body; // You may want to handle file uploads using a middleware (e.g., multer)

//     // Upload to Cloudinary
//     const result = await cloudinary.uploader.upload(file, { resource_type: type });

//     const newMedia = new Media({
//       url: result.secure_url,
//       type: type,
//       description: description,
//       uploadedBy: req.user._id, // Assuming user is authenticated
//     });

//     await newMedia.save();
//     res.status(200).json(newMedia);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

// Delete media
router.delete("/delete/:id", async (req, res) => {
  try {
    const media = await Media.findByIdAndDelete(req.params.id);
    if (!media) return res.status(404).json({ error: "Media not found" });

    // Optionally, delete from Cloudinary as well
    await cloudinary.uploader.destroy(media.public_id);

    res.status(200).json({ message: "Media deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//get resources
router.get("/resources", async (req, res) => {
  try {
    console.log({ cloudinary })
    const media = await cloudinary.api.resource().then(result => console.log({ result }))
    console.log({ media })
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
