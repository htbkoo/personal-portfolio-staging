import {Output} from "rss-parser";

type RssParser = {
    // parseString(xml: string, callback?: (err: Error, feed: Output) => void): Promise<Output>;
    parseURL(feedUrl: string, callback?: (err: Error, feed: Output) => void, redirectCount?: number): Promise<Output>;
}

export default class CodePenRssFeedsParser {
    private readonly rssParser: RssParser;

    constructor(rssParser: RssParser) {
        this.rssParser = rssParser;
    }

    async parseUrl(url: string) {
        return this.rssParser.parseURL(url)
            .catch(e => {
                throw new Error(`Unable to parse from url: '${url} due to ${e}'`);
            });
    }
}