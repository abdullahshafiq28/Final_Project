type style = {
  container: string;
  mytext: string;
}

type props = {
  styling: style;
  onChange:(event: React.ChangeEvent<HTMLInputElement>) => void;
  type:string;
}

const InputField = ({ styling, onChange, type }:props) => (
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
