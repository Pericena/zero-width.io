// src/types/index.ts

/**
 * Tipos de pestañas disponibles en la aplicación
 */
export type TabType = 'encrypt' | 'decrypt' | 'analyze';

/**
 * Información generada tras un cifrado de mensaje
 * Inspirado en estilo hacker / terminal avanzada
 */
export interface EncryptionInfo {
  /** Mensaje secreto oculto en el texto público */
  secretMessage: string;

  /** Longitud del mensaje secreto en caracteres */
  messageLength: number;

  /** Cantidad de caracteres ZWSP (Zero-Width Space, Unicode 200B) usados */
  zwspUsed: number;

  /** Cantidad de caracteres ZWNJ (Zero-Width Non-Joiner, Unicode 200C) usados */
  zwnjUsed: number;

  /** Total de caracteres zero-width utilizados en el cifrado */
  totalZeroWidth: number;

  /** Representación binaria del mensaje cifrado, útil para análisis */
  binary: string;

  /** Timestamp opcional de cifrado para auditorías (opcional) */
  timestamp?: string;

  /** Algoritmo de cifrado usado (opcional) */
  algorithm?: string;
}
