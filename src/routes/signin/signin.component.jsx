import { createUserDocumentFromAuth, signInWithGooglePopup } from "../../utils/firebase/firebase.utils";

const SignIn = () => {

    const logGoogleUser = async () => {
        const {user} = await signInWithGooglePopup();
        // console.log(response);
        createUserDocumentFromAuth(user);
    };

    return(
        <div>
            <h1>Signin Page</h1>
            <button onClick={logGoogleUser}>Signin with Google </button>
        </div>
    );
}

export default SignIn;