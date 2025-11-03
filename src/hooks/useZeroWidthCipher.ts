import { useState } from 'react';
import type { EncryptionInfo } from '../types/index';

/**
 * Hook personalizado para ocultar (cifrar) y recuperar (descifrar)
 * mensajes usando caracteres invisibles (Zero-Width Spaces).
 */
function useZeroWidthCipher() {
  const [cipherText, setCipherText] = useState('');
  const [encryptionInfo, setEncryptionInfo] = useState<EncryptionInfo | null>(null);
  const [decryptedPublic, setDecryptedPublic] = useState('');
  const [decryptedSecret, setDecryptedSecret] = useState('');
  const [error, setError] = useState('');

  /**
   * Cifra un mensaje secreto dentro de un texto público
   * usando caracteres invisibles (ZWSP y ZWNJ).
   */
  const encrypt = (publicMessage: string, secretMessage: string) => {
    try {
      if (!publicMessage.trim() || !secretMessage.trim()) {
        throw new Error('Ambos mensajes son requeridos para cifrar.');
      }

      setError('');

      // 🔹 Convertir el mensaje secreto a binario (8 bits por carácter)
      const binary = Array.from(secretMessage)
        .map((char) => char.charCodeAt(0).toString(2).padStart(8, '0'))
        .join('');

      // 🔹 Codificar binario con caracteres invisibles
      let result = '';
      let binaryIndex = 0;
      let zwspUsed = 0;
      let zwnjUsed = 0;

      for (const char of publicMessage) {
        if (char === ' ' && binaryIndex < binary.length) {
          const bit = binary[binaryIndex++];
          result += bit === '1' ? ' ' + '\u200B' : ' ' + '\u200C';
          bit === '1' ? zwspUsed++ : zwnjUsed++;
        } else {
          result += char;
        }
      }

      // 🔹 Si el mensaje secreto no cabía en todos los espacios disponibles
      while (binaryIndex < binary.length) {
        const bit = binary[binaryIndex++];
        result += bit === '1' ? '\u200B' : '\u200C';
        bit === '1' ? zwspUsed++ : zwnjUsed++;
      }

      // Guardar resultados
      setCipherText(result);
      setEncryptionInfo({
        secretMessage,
        messageLength: secretMessage.length,
        zwspUsed,
        zwnjUsed,
        totalZeroWidth: zwspUsed + zwnjUsed,
        binary,
      });
    } catch (err) {
      console.error('Encryption error:', err);
      setError(err instanceof Error ? err.message : 'Error al cifrar el mensaje.');
    }
  };

  /**
   * Descifra un texto que contiene caracteres zero-width
   * para recuperar el mensaje público y el mensaje secreto.
   */
  const decrypt = (text: string) => {
    try {
      if (!text.trim()) {
        throw new Error('No se proporcionó texto para descifrar.');
      }

      setError('');

      let binary = '';
      let publicMessage = '';

      // 🔹 Separar caracteres invisibles y texto visible
      for (const char of text) {
        if (char === '\u200B') binary += '1';
        else if (char === '\u200C') binary += '0';
        else publicMessage += char;
      }

      // 🔹 Convertir binario en texto ASCII
      let secretMessage = '';
      for (let i = 0; i < binary.length; i += 8) {
        const byte = binary.slice(i, i + 8);
        if (byte.length === 8) {
          secretMessage += String.fromCharCode(parseInt(byte, 2));
        }
      }

      setDecryptedPublic(publicMessage);
      setDecryptedSecret(secretMessage);
    } catch (err) {
      console.error('Decryption error:', err);
      setError(err instanceof Error ? err.message : 'Error al descifrar el mensaje.');
    }
  };

  return {
    encrypt,
    decrypt,
    cipherText,
    encryptionInfo,
    decryptedPublic,
    decryptedSecret,
    error,
  };
}

export default useZeroWidthCipher;
