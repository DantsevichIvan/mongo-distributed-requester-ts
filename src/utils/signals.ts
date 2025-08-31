import { SHUTDOWN_SIGNALS } from '../constants/signals';

type ShutdownHandler = (signal: NodeJS.Signals) => void;

export const registerShutdownSignals = (handler: ShutdownHandler): void => {
  SHUTDOWN_SIGNALS.forEach((signal: NodeJS.Signals) => {
    process.on(signal, (): void => handler(signal));
  });
};
