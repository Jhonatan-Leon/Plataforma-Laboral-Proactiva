import  TipoDocumento  from '../DTO/TipoDocumento';

const map: Record<string, TipoDocumento> = {
  CC: TipoDocumento.CC,
  PP: TipoDocumento.PP,
  NIT: TipoDocumento.NIT,
  CE: TipoDocumento.CE,
};

export const normalizaTipoDoc = async (raw: string): Promise<TipoDocumento> => {
  const key = raw.toUpperCase().replace('.', '').trim(); // "cc" → "CC"
  const val = map[key];
  if (!val) throw new Error(`Tipo de documento inválido: ${raw}`);
  return val;
};