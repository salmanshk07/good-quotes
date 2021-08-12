import { Fragment } from "react";
import { useParams, Route, Link, useRouteMatch } from "react-router-dom";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import Comments from "../components/comments/Comments";

const QuoteDetail = ({ allQuotes, addCommentHandler }) => {
  const params = useParams();
  const match = useRouteMatch();

  const quote = allQuotes.find((quote) => quote.id === params.quoteId);

  if (!quote) {
    return <p>No quote found!</p>;
  }
  
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link classname="btn--flat" to={`${match.url}/comments`}>
            LOAD COMMENTS
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments
          comments={quote.comments}
          addCommentHandler={addCommentHandler}
          {...quote}
        />
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;
