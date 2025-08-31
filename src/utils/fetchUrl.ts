import axios from 'axios';
import { config } from '../config';

export async function fetchUrl(url: string): Promise<number> {
  const res = await axios.get(url, {
    maxRedirects: 5,
    timeout: config.REQUEST_TIMEOUT_MS,
    validateStatus: () => true
  });

  return res.status;
}
