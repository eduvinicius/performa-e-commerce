export const checkCEP = (cep: string): boolean => {
    // Remove espaços em branco
    cep = cep.replace(/\s/g, '');
  
    // Verifica se o CEP possui exatamente 8 dígitos numéricos
    if (/^\d{8}$/.test(cep)) {
      return true;
    } else {
      return false;
    }
}