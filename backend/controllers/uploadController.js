const { createClient } = require('@supabase/supabase-js');

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

async function getURL(req, res) {
    const userID = req.params.userID.toString();
    console.log(userID);
    const { data } = supabase.storage.from("avatars").getPublicUrl(userID);
    if (data) {
        console.log(data.publicUrl)
        return res.json(data.publicUrl);
    } else {
        return res.json(null)
    }
};

module.exports = {
    uploadAvatar,
    getURL
}
