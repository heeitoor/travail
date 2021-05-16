import { RedisClient, createClient, print } from 'redis';
import { appConfig } from 'src/app.config';
import { promisify } from 'util';

class RedisService {
  constructor() {}

  private _client: RedisClient;
  private _getAsync: { (key: string): Promise<any> };
  private _setAsync: { (key: string, value: string): Promise<any> };

  private get client(): RedisClient {
    if (!this._client) {
      this._client = createClient({
        url: appConfig.REDISCLOUD_URL,
      });

      this.client.on('error', (error) => {
        console.log(error);
      });

      this.client.keys('*', (error, keys) => {
        console.log(keys);
      });

      this._getAsync = promisify(this.client.get).bind(this.client);
      this._setAsync = promisify(this.client.set).bind(this.client);
    }

    return this._client;
  }

  private get getAsync(): { (key: string): Promise<any> } {
    return this._getAsync;
  }

  private get setAsync(): { (key: string, value: string): Promise<any> } {
    return this._setAsync;
  }

  private ensureConnection() {
    if (!this.client) {
      throw new Error('Invalid redis');
    }
  }

  async getValue<T>(key: string): Promise<T> {
    this.ensureConnection();

    const result: T = await this.getAsync(key);

    return result;
  }

  async setValue(key: string, value: any): Promise<void> {
    this.ensureConnection();

    await this.setAsync(key, value);
  }
}

export { RedisService };
