export interface ParsedError {
  message: string;
  httpCode: number | null;
}

export function parseError(error: unknown): ParsedError {
  let message: string;
  let httpCode: number | null = null;

  if (error instanceof Error) {
    message = error.message;
    httpCode = (error as any)?.response?.status ?? null;
  } else {
    message = String(error);
  }

  return { message, httpCode };
}
