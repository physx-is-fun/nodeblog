const rateLimit = require("express-rate-limit");

exports.getIndex = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getContact = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postContact = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getPosts = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getPost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getRegister = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postRegister = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postLogin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getLogout = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getForgotPassword = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postForgotPassword = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getResetPassword = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postResetPassword = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getVerifyEmail = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getRecoverEmail = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postRecoverEmail = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getChangeEmail = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAccountProfile = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postAccountProfile = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.deleteAccountProfile = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAccountPosts = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAccountCategories = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAccountTags = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAccountHeadings = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postChangePassword = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postChangeEmail = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getOauthUnlink = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getGoogle = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getGoogleCallback = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getFacebook = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getFacebookCallback = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getLocal = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postLocal = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getCreatePost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getDemoPosts = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getDemoPost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postCategory = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.updateCategory = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.deleteCategory = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAdminHeadings = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postHeading = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.updateHeading = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.deleteHeading = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAdmin = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getStatusMonitor = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAdminPosts = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAdminCategories = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getAdminTags = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postTag = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.updateTag = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.deleteTag = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});













exports.getCategoryPosts = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postUpdatePost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.getUpdatePost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.deletePost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.categories = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});

exports.postCreatePost = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 perccel később
  max: 500,  //  maximum 500 kérés
  message: "Too much requests, please return 15 minutes later."  //  üzenet
});