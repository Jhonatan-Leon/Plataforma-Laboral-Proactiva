import Estado from "./TipoEstado";

class postulacion {
	private _id_postulacion? : string | undefined;
	private _cod_vacacnte: string;
	private _id_usuario: string;
	private _estado: Estado;
	private _fecha_postulcion: Date;
	private _comentario? : string | undefined;

	constructor(cod_vacante: string, id_usuario: string, estado: Estado, fecha_postulacion: Date, id_postulacion?: string | null, comentario?: string | null ){
		this._cod_vacacnte = cod_vacante
		this._id_usuario = id_usuario;
		this._estado = estado;
		this._fecha_postulcion = fecha_postulacion;
		this._id_postulacion = id_postulacion ?? undefined;
		this._comentario = comentario ?? undefined;
	}	

	get idPostulacion(): string | undefined {
    return this._id_postulacion;
  }

  get codVacacnte(): string {
    return this._cod_vacacnte;
  }

  get idUsuario(): string {
    return this._id_usuario;
  }

  get estado(): Estado {
    return this._estado;
  }

  get fechaPostulacion(): Date {
    return this._fecha_postulcion;
  }

  get comentario(): string | undefined {
    return this._comentario;
  }

  set idPostulacion(value: string | undefined) {
    this._id_postulacion = value;
  }

  set codVacacnte(value: string) {
    this._cod_vacacnte = value;
  }

  set idUsuario(value: string) {
    this._id_usuario = value;
  }

  set estado(value: Estado) {
    this._estado = value;
  }

  set fechaPostulacion(value: Date) {
    this._fecha_postulcion = value;
  }

  set comentario(value: string | undefined) {
    this._comentario = value;
  }
	
}

export default postulacion;