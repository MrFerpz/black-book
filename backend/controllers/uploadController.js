const { createClient } = require('@supabase/supabase-js');
const prisma = require('../prisma/prisma');

const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)

async function uploadAvatar(req, res) {
    const userID = req.params.userID;

    const { data, error } = await supabase.storage.from('avatars').upload(userID, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: true,
    });

    if (data) {
        return res.json("Successfully uploaded file!");
    } else {
        return res.json(error)
    };
}

async function getAvatarURL(req, res) {
    const userID = req.params.userID.toString();
    const { data } = supabase.storage.from("avatars").getPublicUrl(userID);
    if (data) {
        return res.json(data.publicUrl);
    } else {
        return res.json(null)
    }
};

async function uploadPhotoPost(req, res, next) {
    const postID = req.postID.toString();
    console.log(req.file);

    const { data, error } = await supabase.storage.from('photoposts').upload(postID, req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: true,
    });

    if (data) {
        return next();
    } else {
        return res.json(error)
    }
}

async function getPhotoPostURL(req, res) {
    const { data } = supabase.storage.from("posts").getPublicUrl(postID);
    if (data) {
        return res.json(data.publicUrl);
    } else {
        return res.json(null)
    }
};

async function addURLtoDatabase(req, res) {
    const postID = req.postID.toString();
    const { data } = supabase.storage.from("photoposts").getPublicUrl(postID);
    if (data) {
        try {
            await prisma.addURLtoDatabase(postID, data);
            return res.json("Attach URL to prisma complete.")
        } catch(err) {
            return err
        }
    } else {
        return res.json(err)
    }
}

module.exports = {
    uploadAvatar,
    getAvatarURL,
    uploadPhotoPost,
    getPhotoPostURL,
    addURLtoDatabase
}
