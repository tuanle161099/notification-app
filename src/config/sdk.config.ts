import SenNotificationSDK from '../lib'
import storage from '../utils/storage'
import { Env } from './env'

/**
 * Constructor
 */

const access_token = storage.get('access_key')

type Config = {
  notificationSDK: SenNotificationSDK
}

const configs: Record<Env, Config> = {
  /**
   * Development configurations
   */
  development: {
    notificationSDK: new SenNotificationSDK(access_token),
  },

  /**
   * Staging configurations
   */
  staging: {
    notificationSDK: new SenNotificationSDK(access_token),
  },

  /**
   * Production configurations
   */
  production: {
    notificationSDK: new SenNotificationSDK(access_token),
  },
}

/**
 * Module exports
 */
export default configs
