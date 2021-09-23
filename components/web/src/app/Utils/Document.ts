export class Document {
  id:Number;
  nom :string;
  description : string;
  contenu :string;
etablissements_nom : string;
sujet_document_nom : string;
  etablissement_id :Number;
  sujet_document_id :Number;

  constructor(id,nom,description,contenu,etablissement_id,sujet_document_id,etablissements_nom,sujet_document_nom) {
    this.id = id;
    this.contenu = contenu ;
    this.description = description;
    this.nom = nom;
    this.etablissement_id = etablissement_id;
    this.sujet_document_id = sujet_document_id;
    this.etablissements_nom =etablissements_nom;
    this.sujet_document_nom=sujet_document_nom;
  }
}



