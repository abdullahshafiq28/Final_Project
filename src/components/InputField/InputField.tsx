const InputField = ({ styling, onChange, type }:any) => (
  <div className='row '>
    <input
      className={styling.container}
      placeholder={styling.mytext}
      onChange={onChange}
      type={type}
    />
  </div>
)

export default InputField
