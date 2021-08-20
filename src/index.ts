import browserslist, {Options} from "browserslist";
import UAParser from "ua-parser-js";

const map: Record<string, string> = {
    "and_chr" : 'Chrome',
    "and_ff": 'Firefox',
    "and_qq": 'QQ',
    "and_uc": 'UCBrowser',
    "android": 'Android',
    "chrome": 'Chrome',
    "edge":'Edge',
    "firefox": 'Firefox',
    "ie": 'IE',
    "ie_mob": 'IE',
    "ios_saf": 'Safari',
    "kaios": 'KaiOS',
    "op_mini": 'Opera',
    "op_mob": 'Opera',
    "opera": 'Opera',
    "safari": 'Safari',
    "samsung": 'Samsung'
}

const browserslistInspect = (queries?: string, opts?: Options): 'error' | 'warning' | 'success' => {
    const list = browserslist(queries, opts);
    const browser = new UAParser(navigator.userAgent).getBrowser();
    const targetBrowserName = (browser.name ?? '').split(' ')[0];
    const targetBrowserMajor = (browser.version ?? '').split('.')[0];

    const listFormat = list.map(item => {
        const [browserCode, version] = item.split(' ')
        return [map[browserCode], version.split('.')[0]]
    })
    const browserMajorList = listFormat
        .filter(([browserName]) => browserName === targetBrowserName)
        .map(([_, major]) => major);

    if (browserMajorList.length === 0) {
        return 'error';
    }
    if (browserMajorList.includes(targetBrowserMajor)) {
        return 'success';
    }
    return 'warning';
}

export default browserslistInspect
