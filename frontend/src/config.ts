const env = 'LOCAL'
export default {
    backendUrl: env === 'LOCAL' ? 'http://localhost:3000' : 'http://localhost:3000',
}
