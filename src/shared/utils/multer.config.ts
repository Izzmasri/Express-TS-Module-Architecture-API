import multer from "multer";
import path from "path";

const destDirectory = path.join(__dirname, "../uploads");
const fileUpload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, destDirectory);
    },
    filename: (req, file, cb) => {
      const uniqeName = `${Date.now()}-${Math.round(
        Math.random() * 1e9
      )}${path.extname(file.originalname)}`;
      cb(null, uniqeName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith("image/")) {
      cb(null, true);
    } else {
      cb(new Error("the file type is not supported"));
    }
  },
});

export const uploadSingle = (fieldName: string) => fileUpload.single(fieldName);
export const uploadMultiple = (fieldName: string, maxCount: number) =>
  fileUpload.array(fieldName, maxCount);
