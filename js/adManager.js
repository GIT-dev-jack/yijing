// 广告管理
let adInstance;
let adSDKLoaded = false;
let adSDKFailed = false;
let adLoadAttempts = 0;
const MAX_AD_LOAD_ATTEMPTS = 3;

function loadAdSDK() {
    // ... 保持原有的 loadAdSDK 函数内容 ...
}

function initAdsgram() {
    // ... 保持原有的 initAdsgram 函数内容 ...
}

function showAd() {
    // ... 保持原有的 showAd 函数内容 ...
}

function onReward() {
    console.log('Reward received');
    showRewardMessage();
}

function onError(result) {
    console.error('Ad error:', result);
    showErrorMessage(result.description || 'An error occurred with the ad');
}