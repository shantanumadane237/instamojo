// module.exports={
//     API_KEY:"c04a44bfb5fdaaf12d8b978ac42ed72b",
//     AUTH_KEY:"641a88592b733138a3463f0477c7cf49",
//     BOT_API_KEY:"08eae480061c4983c9a0f9d4ad36fdba",
//     SANDBOX:true,
//     SANDBOX_API_KEY:"204e3d37a07089330f9095c177522b3c",
//     SANDBOX_AUTH_KEY:"da78839cdfbab517e673bc75ce7b718d",
//     SANDBOX_API_LINK:"https://test.instamojo.com/",
//     API_LINK:"https://www.instamojo.com/"
// }
var prod = {
    settings: {
        BOT_API_KEY:"08eae480061c4983c9a0f9d4ad36fdba",
        API_KEY:"c04a44bfb5fdaaf12d8b978ac42ed72b",
        AUTH_KEY:"641a88592b733138a3463f0477c7cf49",
        BASE_URL:"https://www.instamojo.com/"
    },
   
};

var sandbox = {
    settings: {
        BOT_API_KEY:"08eae480061c4983c9a0f9d4ad36fdba",
        API_KEY:"204e3d37a07089330f9095c177522b3c",
        AUTH_KEY:"da78839cdfbab517e673bc75ce7b718d",
        BASE_URL:"https://test.instamojo.com/",
    },

};



module.exports.ENV_CONFIG = sandbox;