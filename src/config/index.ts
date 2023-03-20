import env from './env'
import sdk from './sdk.config'

const configs = {
  sdk: sdk[env],
  env,
}

export default configs
