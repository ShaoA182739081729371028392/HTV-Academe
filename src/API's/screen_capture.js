export default async function get_screenshot(query) {
    // Query is useless, but they always send something 
    chrome.tabs.captureVisibleTab((screenshotUrl) => {
        console.log(screenshotUrl);
    });

}