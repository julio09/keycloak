import Login from "@/components/login.tsx";
import {useKeycloak} from "keycloak-react-web";
import {useEffect} from "react";

import { InfinitySpin } from 'react-loader-spinner'

function App() {

    const { keycloak, initialized } = useKeycloak();

    useEffect(() => {
        if (initialized) {
            if (!keycloak.authenticated) {
                keycloak.login();
            }
        }
    }, [initialized, keycloak]);

    if (!initialized) {
        return <InfinitySpin/>;
    }

    if (!keycloak.authenticated) {
        return <p>Authenticating...</p>;
    }

  return (
      <>
          <Login />
      </>
  )
}

export default App
