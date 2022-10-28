export const sanitizePhone = (phone: string) => phone.replace(/[()" "-]/g, '')
