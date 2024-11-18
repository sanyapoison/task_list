const isLocalhost = [
    'localhost',
    '127.0.0.1',
    '::1', // IPv6 localhost
    ...getLocalIpAddresses(),
].includes(window.location.hostname);

const isProduction = !isLocalhost; //process.env.NODE_ENV === 'production';

export const API_BASE_URL = isProduction
    ? 'http://89.23.115.219:5000'
    : 'http://localhost:5000';

export default {
    isProduction,
    API_BASE_URL,
};

function getLocalIpAddresses() {
    return [
        '192.168.0.0', '192.168.255.255',
        '10.0.0.0', '10.255.255.255',
        '172.16.0.0', '172.31.255.255',
    ];
}
