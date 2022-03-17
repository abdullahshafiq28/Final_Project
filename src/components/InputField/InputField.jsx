const InputField = (props) => (
  <div className='row '>
    <input
      className={props.styling.container}
      placeholder={props.styling.mytext}
      onChange={props.onChange}
      type={props.type}
    />
  </div>   
)

export default InputField