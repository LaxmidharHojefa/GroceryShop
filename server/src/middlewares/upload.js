const multer = require("multer");
const path = require("path");

// Storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // 🔥 CHANGE: decide upload folder dynamically based on route
    if (req.baseUrl.includes("categories")) {
      cb(null, "public/images/categories");
    } else if (req.baseUrl.includes("products")) {
      cb(null, "public/images/products");
    } else {
      cb(new Error("Invalid upload route"), false);
    }
  },
  // filename: (req, file, cb) => {
  //   cb(
  //     null,
  //     `category-${Date.now()}${path.extname(file.originalname)}`
  //   );
  // },

  filename: (req, file, cb) => {
    // 🔥 CHANGE: keep original name + add timestamp to avoid overwrite
    const ext = path.extname(file.originalname);
    const baseName = path.basename(file.originalname, ext);

    cb(null, `${baseName}-${Date.now()}${ext}`);
  },
});

// File filter (allow only images)
// const fileFilter = (req, file, cb) => {
//   if (file.mimetype.startsWith("image")) {
//     cb(null, true);
//   } else {
//     cb(new Error("Only image files are allowed"), false);
//   }
// };


// 🔥 CHANGE: strict image-only validation
const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp|gif/;

  // check mime type
  const mimeType = allowedTypes.test(file.mimetype);

  // check file extension
  const extName = allowedTypes.test(
    path.extname(file.originalname).toLowerCase()
  );

  if (mimeType && extName) {
    cb(null, true);
  } else {
    cb(
      new Error("Only image files are allowed (jpg, jpeg, png, webp, gif)"),
      false
    );
  }
};

// Multer config
const upload = multer({
  storage,
  fileFilter,
});

module.exports = upload;



