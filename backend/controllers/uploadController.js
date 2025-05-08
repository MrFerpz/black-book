const { createClient } = require('@supabase/supabase-js');

const supabase = createClient("https://xojkgyryuzebqbbahcbh.supabase.co", process.env.SUPABASE_KEY)

async function uploadAvatar(req, res) {
    console.log("called");
    console.log(req.file);
    const userID = req.params.userID;

    const { data, error } = await supabase.storage.from('avatars').upload(userID + "/", req.file.buffer, {
        contentType: req.file.mimetype,
        cacheControl: '3600',
        upsert: true,
    });

    if (data) {
        console.log("Successfully uploaded file!")
    } else {
        console.log(error)
    }
}

// file.buffer, {
//     contentType: file.mimetype,
//     cacheControl: '3600',
//     upsert: false,


module.exports = {
    uploadAvatar
}
