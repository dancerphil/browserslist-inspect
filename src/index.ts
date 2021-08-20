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

export type BrowserInspectResult = 'MATCHED' | 'BROWSER_NOT_SUPPORTED' | 'VERSION_TOO_LOW' | 'VERSION_TOO_HIGH';

const browserInspect = (queries?: string, opts?: Options): BrowserInspectResult => {
    const list = browserslist(queries, opts);
    const currentBrowser = new UAParser(navigator.userAgent).getBrowser();
    const currentBrowserName = (currentBrowser.name ?? '').split(' ')[0];
    const currentBrowserMajor = (currentBrowser.version ?? '').split('.')[0];

    const listFormat = list.map(item => {
        const [browserCode, version] = item.split(' ')
        return [map[browserCode], version.split('.')[0]]
    })
    const browserMajorList = listFormat
        .filter(([browserName]) => browserName === currentBrowserName)
        .map(([_, major]) => major);

    if (browserMajorList.length === 0) {
        return 'BROWSER_NOT_SUPPORTED';
    }
    if (browserMajorList.includes(currentBrowserMajor)) {
        return 'MATCHED';
    }
    const maxMajor = Math.max(...browserMajorList.map(Number).filter(major => !Number.isNaN(major)))
    if (Number(currentBrowserMajor) > maxMajor) {
        return 'VERSION_TOO_HIGH'
    }
    if (Number(currentBrowserMajor) < maxMajor) {
        return 'VERSION_TOO_LOW'
    }
    // NaN & not matched
    return 'VERSION_TOO_LOW';
}

// @ts-ignore
global.process = global.process ?? {env: {}}

export default browserInspect
