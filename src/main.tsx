import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import '../app/globals.css'
import {ThemeProvider} from "@/components/theme-provider.tsx";
import kc from "@/lib/keycloak.ts";
import {KeycloakProvider} from "keycloak-react-web";


const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <KeycloakProvider client={kc} initOptions={{onLoad: 'check-sso', checkLoginIframe: false}}>
            <App />
        </KeycloakProvider>
    </ThemeProvider>,
);
