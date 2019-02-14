import {when} from "jest-when";

import CodePenItemContentParser from "../../../services/portfolio/CodePenItemContentParser";
import {
    credentialsExtractor,
    imgExtractor,
    linksExtractor,
    technologiesExtractor
} from "../../../services/portfolio/CodePenItemContentExtractor";

describe("CodePenItemContentParser", function () {
    describe("parseContent", function () {
        it("should parse content retrieved from rss feed with multiple extractors", async function () {
            // given
            /*
            <p>
            <a href="https://codepen.io/htbkoo/pen/MJWmGz"><img width="1024" height="600" src="https://codepen.io/htbkoo/pen/MJWmGz/image/large.png"></a>
            </p>
            <p>
            <a href="https://codepen.io/htbkoo/pen/MJWmGz">See the Code</a> -
            <a href="https://codepen.io/htbkoo/full/MJWmGz">See it Full Page</a> -
            <a href="https://codepen.io/htbkoo/details/MJWmGz">See Details</a>
            </p>
            <p>
            </p>
            <p><small>This Pen uses: HTML, CSS, JavaScript, and </small></p>
            * */
            const rawContent = "\n    \n    <p>\n      <a href=\"https://codepen.io/htbkoo/pen/MJWmGz\"><img width=\"1024\" height=\"600\" src=\"https://codepen.io/htbkoo/pen/MJWmGz/image/large.png\"></a>\n    </p>\n    <p>\n      <a href=\"https://codepen.io/htbkoo/pen/MJWmGz\">See the Code</a> -\n      <a href=\"https://codepen.io/htbkoo/full/MJWmGz\">See it Full Page</a> -\n      <a href=\"https://codepen.io/htbkoo/details/MJWmGz\">See Details</a>\n    </p>\n    <p>\n      \n    </p>\n    <p><small>This Pen uses: HTML, CSS, JavaScript, and </small></p>\n    \n  ";
            const parser = CodePenItemContentParser.newParser(rawContent);

            // when
            const extractors = [imgExtractor, linksExtractor, technologiesExtractor, credentialsExtractor];
            const content = await parser.parseContent(extractors);

            // then
            expect(content.img).toEqual({
                screenshot: {
                    src: "https://codepen.io/htbkoo/pen/MJWmGz/image/large.png",
                    width: "1024",
                    height: "600"
                }
            });
            expect(content.links).toEqual({
                code: "https://codepen.io/htbkoo/pen/MJWmGz",
                full: "https://codepen.io/htbkoo/full/MJWmGz",
                details: "https://codepen.io/htbkoo/details/MJWmGz",
            });
            expect(content.technologies).toEqual(["HTML", "CSS", "JavaScript"]);
            expect(content.credentials).toEqual({
                user: "htbkoo",
                hash: "MJWmGz"
            });
        });
    });
});