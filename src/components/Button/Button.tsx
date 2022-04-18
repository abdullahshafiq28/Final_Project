type style = {
  container: string;
  button: string;
}

type props = {
  styling: style;
  onClick:(event: React.MouseEvent<HTMLButtonElement>) => void;
  title:string;

}

const Button = ({ styling, onClick, title }:props) => (
  <div className={styling.container}>
    <button className={styling.button} onClick={onClick}>
      {title}
    </button>
  </div>
);

export default Button;
