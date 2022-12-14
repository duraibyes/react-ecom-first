import { useState, useContext } from "react";
import { userContext } from "../../contexts/user.context";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth, signInWithGooglePopup, signInAuthWithEmailAndPassword  } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-in-form.styles.scss';

const defaultFormFields = {
    email : '',
    password : '',
}

const SignInForm = () => {
    const [formFields, setFormFields]  = useState( defaultFormFields );
    const {email, password } = formFields;

    const { setCurrentUser } = useContext(userContext);

    
    const resetFrom = () => {
        setFormFields(defaultFormFields);
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const {user} = await signInAuthWithEmailAndPassword(email, password);
            // console.log( user );
            setCurrentUser(user);
            resetFrom();
        } catch (error) {
            console.log( error );
            switch (error.code) {
                case 'auth/wrong-password':
                    alert( ' Incorrect password for email' ); 
                    break;
                case 'auth/user-not-found':
                    alert( 'No user associated with this email' ); 
                    break;
                default:
                    console.log( error );
                    break;
            }
        }
    }

    const handleChange = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]:value});
    }

    const signInWithGoogle = async () => {
        const {user} = await signInWithGooglePopup();
        setCurrentUser(user);
        await createUserDocumentFromAuth(user);
    };

    return (
        <div className="sign-up-container">
            <h2> Already have an account </h2>
            <span>Sign in with your email and password </span>
            <form onSubmit={handleSubmit}>

                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    onChange={handleChange} 
                    name="email" 
                    value={email}  
                />

                <FormInput 
                    label="Password"
                    type="password" 
                    required 
                    onChange={handleChange} 
                    name="password" 
                    value={password}
                />
                <div className="buttons-container">
                    <Button buttonType="inverted" type="submit"> SignIn </Button >
                    <Button buttonType="google" type="button" onClick={signInWithGoogle}> Google Signin </Button>
                </div>
               

            </form>
        </div>
    );
}

export default SignInForm;