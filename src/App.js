import { Route, Switch, Redirect, useHistory } from "react-router-dom";
import AllQuotes from "./pages/AllQuotes";
import QuoteDetail from "./pages/QuoteDetail";
import NewQuote from "./pages/NewQuote";
import Layout from "./components/layout/Layout";
import NotFound from "./pages/NotFound";
import { useState } from "react";

const DUMMY_QUOTES = [
  { id: "q1", author: "Max", text: "Learning React is fun!", comments: [] },
  {
    id: "q2",
    author: "Maximilian",
    text: "Learning React is great!",
    comments: [{ author: "jack", comment: "Nice saying!" }],
  },
];

const randomAuthors = ["jack", "john", "harry"];

function App() {
  const [quotes, updateQuotes] = useState(DUMMY_QUOTES);
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    const quoteId = `q${quotes.length + 1}`;
    const updatedQuotes = [
      ...quotes,
      { ...quoteData, id: quoteId, comments: [] },
    ];
    updateQuotes(updatedQuotes);
    history.push("/quotes");
  };

  const addCommentHandler = (quoteId, commentData) => {
    const quoteIndex = quotes.findIndex((quote) => quote.id === quoteId);
    var author =
      randomAuthors[Math.floor(Math.random() * randomAuthors.length)];
    const updatedQuotes = [...quotes];
    const quoteTobeUpdated = updatedQuotes[quoteIndex];
    const updatedQuote = {
      ...quoteTobeUpdated,
      comments: [
        ...quoteTobeUpdated.comments,
        { author: author, comment: commentData },
      ],
    };

    updatedQuotes[quoteIndex] = updatedQuote;
    updateQuotes(updatedQuotes);
  };

  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes allQuotes={quotes} />
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail
            allQuotes={quotes}
            addCommentHandler={addCommentHandler}
          />
        </Route>
        <Route path="/new-quote">
          <NewQuote addQuoteHandler={addQuoteHandler} />
        </Route>
        <Route path="*">
          <NotFound />
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;
