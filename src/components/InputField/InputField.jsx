const InputField = (props) => (
  <div className='row '>
    <input
      className={props.styling.container}
      placeholder={props.styling.mytext}
      onChange={props.onChange}
    />
  </div>   
)

export default InputField