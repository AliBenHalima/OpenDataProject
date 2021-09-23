export class Event {
  id:Number;
  title :string;
  description :string;
  localisation : string;
  start : string;
  end : string;
  etablissement_id :Number;
  eventtype_id :Number;
  photo? : string;
  color?:string
  backgroundColor?:string
  constructor(id,title,description,localisation,start,end,etablissement_id,eventtype_id,photo?,color?,backgroundColor?) {
    this.id = id;
    this.title = title ;
    this.description = description;
    this.localisation = localisation;
    this.start = start ;
    this.end = end;
    this.etablissement_id = etablissement_id;
    this.eventtype_id = eventtype_id;
    this.photo= photo;
    this.color= color;
    this.backgroundColor= backgroundColor;


  }
}
