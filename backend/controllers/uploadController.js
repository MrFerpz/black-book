const multer = require('multer');
const upload = multer({dest: 'uploads/'});

export function uploadAvatar(req, res) {
    upload.single('avatar');
    return res.json("Successfully uploaded avatar");
}
