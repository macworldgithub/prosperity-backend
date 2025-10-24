// src/common/types/soap-response.type.ts
export interface SoapError {
  message: string;
  code?: string;
}

export interface SoapSuccess<T = any> {
  return: T;
}

export type SoapResponse<T = any> = SoapSuccess<T> | { error: SoapError };
