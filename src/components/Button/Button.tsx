import "./Button.scss";

export const Button = ({ handleClick }: { handleClick: () => void }) => {
  return (
    <button type="button" className="button" onClick={handleClick}>
      <div className="button-top"></div>
      <div className="button-bottom"></div>
      <div className="button-base"></div>
    </button>
  );
};
