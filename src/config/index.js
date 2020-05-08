const REDIS = {
  host: '127.0.0.1',
  port: 6379,
  password: ''
}
const JWT_SECRET =
  'a&*38QthAKuiRwISGLodge^3%^$zvA3A6Hfr8MF$jM*HY4*dWcwAW&9NGp7*b53!'

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? 'http://refuse.aiyund.top'
    : 'http://localhost:5000'

export default {
  REDIS,
  JWT_SECRET,
  baseUrl
}
