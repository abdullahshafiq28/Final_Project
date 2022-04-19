import { createUserWithEmailAndPassword } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useState } from 'react';

import { auth } from '../../FirebaseConfig';
import { InputField } from '../../components';
import { setName } from '../../redux/actions';

const Register = () => {
  const [registerEmail, setRegisterEmail] = useState<string>('');
  const [registerPassword, setRegisterPassword] = useState<string>('');
  const [registerName, setRegisterName] = useState<string>('');
  const [displayError, setDisplayError] = useState<string>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const register = async () => {
    try {
      await createUserWithEmailAndPassword(auth, registerEmail, registerPassword);
      dispatch(setName(registerName));
      navigate('/');
    } catch (error) {
      setDisplayError('User Registeration Failed!!!');
    }
  };

  return (
    <div className='boxDesign'>
      <div className='row'>
        <h1> Register User </h1>
      </div>
      <InputField
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
          setRegisterName(event.target.value);
        }}
        styling={{ container: 'smallStyle', mytext: 'Name' }}
        type={'name'}
      />
      <InputField
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
          setRegisterEmail(event.target.value);
        }}
        styling={{ container: 'smallStyle', mytext: 'Email...' }}
        type={'email'}
      />
      <InputField
        onChange={(event:React.ChangeEvent<HTMLInputElement>) => {
          setRegisterPassword(event.target.value);
        }}
        styling={{ container: 'smallStyle', mytext: 'Password...' }}
        type={'password'}
      />
      <div className='errorclass'>
        <h5> {displayError} </h5>
      </div>
      <div className='row'>
        <button
          disabled={!registerPassword || !registerEmail || !registerName}
          className='loginbutton'
          onClick={register}
        >
          {' '}
          Create User
        </button>
      </div>
    </div>
  );
};

export default Register;
