type RatePointProps = {
  pointID: number,
  onChange: (evt: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
};

function RatePoint(props: RatePointProps): JSX.Element {
  const {pointID, onChange} = props;

  return (
    <>
      <input
        onChange={onChange}
        className="rating__input"
        id={`star-${pointID}`}
        type="radio"
        name="rating"
        value={pointID}
      />
      <label
        className="rating__label"
        htmlFor={`star-${pointID}`}
      >Rating {pointID}
      </label>
    </>
  );
}

export default RatePoint;

