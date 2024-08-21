// keycloak.js
import Keycloak from 'keycloak-js';

const keycloakConfig = {
    url: 'http://localhost:8080/',
    realm: 'job.mg',
    clientId: 'Job',
    client_secret: 'syJTq2lNXAxVmkoM12tNanUirRebfCve',
    grant_type: 'authorization_code',
    ssl_required: 'external',
    resource: 'Job',
};

const kc = new Keycloak(keycloakConfig);

export default kc;