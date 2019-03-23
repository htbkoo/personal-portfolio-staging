import * as React from "react";

import RssFeedsParser from "../../services/portfolio/RssFeedsParser";
import {PortfoliosFactory} from "./PortfoliosFactory";
import CircularProgress from "@material-ui/core/CircularProgress";

export default class EmbeddedPenPortfoliosFactory implements PortfoliosFactory {
    private readonly parser: RssFeedsParser;
    private readonly rssFeedUrl: string;

    constructor(parser: RssFeedsParser, rssFeedUrl: string) {
        this.parser = parser;
        this.rssFeedUrl = rssFeedUrl;
    }

    createPortfolios() {
        return Promise.resolve([<CircularProgress/>]);
    }

    /*

interface PortfoliosPanelProps extends WithStyles<typeof styles> {
rssFeedUrl: string,
parser: RssFeedsParser
}


import RssFeedsParser from "../../services/portfolio/RssFeedsParser";



    this.props.parser.parseUrl(this.props.rssFeedUrl)
        .then(items => this.setState({items}))

    {
        this.state.items.map(({content = "", link = "", title = ""}: Items, index: number) =>
            <div className={this.props.classes.portfolio} key={`${index}_${title}`}>
                <Portfolio content={content} link={link} title={title}/>
            </div>
        )
    }
  */
}
