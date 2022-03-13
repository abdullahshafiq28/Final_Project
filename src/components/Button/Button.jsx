const Button = props => (
  <div className={props.styling.container}>
    <button className={props.styling.button} onClick={props.onClick}>
      {props.title}
    </button>
  </div>
)

export default Button
