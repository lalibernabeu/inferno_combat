/**
 * Utilidades generales para la aplicación INFERNO COMBAT
 */

/**
 * Genera la URL directa a WhatsApp con el número del gimnasio y un mensaje opcional codificado
 * @param number Número de WhatsApp (con o sin signos, preferentemente con código de país ej: 5492617078248)
 * @param customMessage Mensaje opcional a enviar
 */
export function getWhatsAppUrl(
  number = '5492617078248',
  customMessage = '¡Hola! Quisiera consultar por las clases de combate en INFERNO COMBAT.'
): string {
  const cleanNumber = number.replace(/[^0-9]/g, '');
  const encodedMessage = encodeURIComponent(customMessage);
  return `https://wa.me/${cleanNumber}?text=${encodedMessage}`;
}

/**
 * Formatea un número telefónico para visualización en UI
 */
export function formatPhoneNumber(phone: string): string {
  if (!phone) return '';
  return phone;
}
