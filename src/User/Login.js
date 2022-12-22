// import React, {useState,useEffect} from "react";
// import { Link, useHistory } from "react-router-dom";
// import {auth,provider,db} from '../firebase'
// import hero from '../assets/hero.jpeg'
// import TextField from '@mui/material/TextField';

// function Login() {
//     const history = useHistory();
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState(null);


//       const onChangeHandler = (event) => {
//           const {name, value} = event.currentTarget;

//           if(name === 'userEmail') {
//               setEmail(value);
//           }
//           else if(name === 'userPassword'){
//             setPassword(value);
//           }
//       };

//       const signInWithEmailAndPasswordHandler = (event, email, password) => {
//         event.preventDefault();
//         auth.signInWithEmailAndPassword(email, password)
//         .then((response) => {
//           setEmail(email)
//           setPassword(password)
//           history.push('/home')
//         })
//         .catch(error => {
//           setError("Error Signing in, Incorrect Email or password !!",error)
//           setEmail("");
//           setPassword("");
//         });
//       };

//       const signInWithGoogle = async () => {
//         try {
//           const res = await auth.signInWithPopup(provider);
//           const user = res.user;
//           const query = await db
//             .collection("users")
//             .where("uid", "==", user.uid)
//             .get();
//           if (query.docs.length === 0) {
//             await db.collection("users").add({
//               uid: user.uid,
//               name: user.displayName,
//               authProvider: "google",
//               email: user.email,
//             });
//           }
//           history.push('/home')
//         } catch (err) {
//           console.error(err);
//           alert(err.message);
//         }
//       };

//       useEffect(() => {
//         document.title = `Sign In | Netflix`;
//       },[],6000);

//   return (
//     <div className='flex'>
     
//      <div className="relative w-full ">
//   <img className='h-screen w-full bg-center bg-no-repeat bg-cover relative opacity-25' src={hero}/>
//         <div className="absolute w-full h-full top-0 left-0 flex flex-col  justify-center items-center ">
//           <h2 className=' text-white p-2 font-bold text-2xl'>Sign In</h2>
//             {error !== null && <div className = "py-4 bg-red-600 px-4 text-white font-sans font-medium text-center mb-3">{error}</div>}
//           <div className="flex flex-row p-2 items-center max-w-lg w-full justify-between">
//           <TextField
//           id="userEmail"
//           label="Email Address"
//           type="email"
//           variant="filled"
//           name="userEmail"
//           fullWidth
//           value={email}
//           className='bg-white w-full'
//           onChange = {(event) => onChangeHandler(event)}
//           required
//           error={error}
//         />
//     </div>
//     <div className="flex flex-row p-2 items-center max-w-lg w-full justify-between">
//     <TextField
//           id="userPassword"
//           label="Password"
//           type="password"
//           name="userPassword"
//           variant="filled"
//           fullWidth
//           value={password}
//           className='bg-white w-full'
//           onChange = {(event) => onChangeHandler(event)}
//           required
//           error={error}
//         />
//         </div>
//         <div className="flex flex-row p-2 items-center max-w-lg w-full justify-center">
//         <button onClick = {(event) => {signInWithEmailAndPasswordHandler(event, email, password)}}
//           className="bg-red-600 hover:bg-red-500 w-full py-4 font-base text-white rounded shadow-xl">
//           Sign In
//         </button>
        
//           </div>
//           <div className="flex flex-row p-2 items-center max-w-lg w-full justify-center">
//           <button onClick={signInWithGoogle}
//           className="bg-green-600 hover:bg-green-500 w-full py-4 font-base text-white rounded shadow-xl">
//           Sign in with Google
//         </button>
//         </div>
//         <div className="flex flex-row p-2 max-w-lg w-full justify-end float-right">
//         <Link to={'/register'}><span className="text-white font-medium border border-red-600 p-2">{' '} Register here</span></Link>
//         </div>
//           </div>
//       </div>
//     </div>

//   )
// }

// export default Login