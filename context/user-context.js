// https://github.com/Ngineer101/nextjs-supabase-crud/blob/main/utils/user-context.js
import {
    useEffect,
    useState,
    createContext,
    useContext,
  } from 'react'
import { supabase } from '../lib/supabase';
  
// Create user context
export const UserContext = createContext(null);

// UserContextProvider is the parent element of the entire application
export function UserContextProvider(props) {
  // we store the session inside state here, and expose the value through 
  // our hook below
  const [session, setSession] = useState(null)

  useEffect(() => {

    // get session for user
    const session = supabase.auth.session();
    setSession(session);

    // configure the auth state listener
    // if the auth state changes the session will be updated
    // and a POST request will be made to the /api/auth route
    const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
      setSession(session)
      await fetch('/api/auth', {
        method: 'POST',
        body: JSON.stringify({ event, session }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
    });

    // our clean up function
    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  const value = {
    session,
  };

  return <UserContext.Provider value={value} {...props} />;
};

// hook that can be used to get the session data
export function useSession() {
  const context = useContext(UserContext);
  return context;
};