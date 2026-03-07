import { Weather } from '../Models/Weather';

export class WheatherResponseDTO {
    public Coord:any;
    public weather:Weather[] = new Array<Weather>();
    public base:any;
    
    public main:any;
    public visibility:any;
    public wind:any;
    public clouds:any;
    public Rain:any;
    public dt:any;
    public sys:any;
    public timezone:any;
    public id:any;
    public name:string = "";
    public cod:any;

    constructor() {

    }
  }