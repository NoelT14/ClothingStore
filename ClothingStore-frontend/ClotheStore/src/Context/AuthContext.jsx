import { createContext, useState, useEffect, useContext } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut
} from "firebase/auth";

import { db ,auth} from "./Firebase";
import { doc, setDoc, getDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";


const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const [isLogged,setIsLogged] = useState(false)
  const [userRole,setUserRole]= useState('')

  function logOut() {
    return signOut(auth)
      .then(() => {
        setUser(null);
        setIsLogged(false)
        navigate("/login");
      })
      .catch((err) => console.log("Failed Signing out: ", err.message));
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password) // Pass 'auth' directly here
      .then((userCredential) => {
        const user = userCredential.user;

        return setDoc(doc(db, "users", user.uid), {
          
          email: user.email,
          role: "USER" // or "ADMIN"
        });
      })
      .catch((err) => console.log("Could not create user", err));
  }

  function getUserRole(userId) {
    const userDoc = doc(db, "users", userId);
    return getDoc(userDoc).then((docSnap) => {
      if (docSnap.exists()) {
        
        return docSnap.data().role;
      } else {
        console.log("No such document!");
       
        return null;
      }
    });
  }

  async function logIn(email, password) {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const role = await getUserRole(user.uid); // Await role fetching

      if (role) {
        setUserRole(role);
        setUser({ ...user, role });
        setIsLogged(true);
        return true; // Indicate success
      } else {
        throw new Error("Role not found for user");
      }
    } catch (err) {
      console.log("Login failed: ", err.message);
      throw err; // Re-throw to be caught in the login component
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        getUserRole(currentUser.uid).then((role) => {
          setUser({ ...currentUser, role }); 
          setIsLogged(true)
          setUserRole(role)
        });
      } else {
        setUser(null); 
        setIsLogged(false)
        setUserRole("")
      }
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <AuthContext.Provider value={{ user,userRole, logOut, logIn, signUp,isLogged }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
