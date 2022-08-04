type ShowMoreProps = {
  onShowMore: () => void;
};

function ShowMore({onShowMore}: ShowMoreProps): JSX.Element {
  return (
    <div className="catalog__more">
      <button
        className="catalog__button"
        type="button"
        onClick={onShowMore}
      >
        Show more
      </button>
    </div>
  );
}

export default ShowMore;
