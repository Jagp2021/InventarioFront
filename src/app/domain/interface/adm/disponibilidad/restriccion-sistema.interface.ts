import { IRestriccionHorario } from './restriccion-horario.interface';
import { IRestriccionPeriodo } from './restriccion-predio.interface';
import { IRestriccionEntidadPci } from './restriccion-entidad-pci.interface';
import { IRestriccionFuncionalidad } from './restriccion-funcionalidad.interface';
import { IRestriccionPerfil } from './restriccion-perfil.interface';
import { IRestriccionUsuario } from './restriccion-usuario.interface';

export interface IRestriccionSistema {
  id?: number;
  descripcion?: string;
  activo?: boolean;
  restriccionesHorarios?: IRestriccionHorario;
  restriccionesPeriodo?: IRestriccionPeriodo;
  restriccionesEntidadPci?: IRestriccionEntidadPci;
  restriccionesFuncionalidad?: IRestriccionFuncionalidad;
  restriccionesPerfil?: IRestriccionPerfil;
  restriccionesUsuario?: IRestriccionUsuario;
}
