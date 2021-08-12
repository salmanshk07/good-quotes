import QuoteForm from "../components/quotes/QuoteForm";

const NewQuote = ({ addQuoteHandler }) => {
  return <QuoteForm onAddQuote={addQuoteHandler} />;
};

export default NewQuote;
