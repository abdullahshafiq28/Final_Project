const Button = ({ styling, onClick, title }:any) => (
  <div className={styling.container}>
    <button className={styling.button} onClick={onClick}>
      {title}
    </button>
  </div>
)

export default Button
