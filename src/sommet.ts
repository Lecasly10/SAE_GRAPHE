class Sommet {
    private nom : string;
    private voisins : Sommet[];
    private prec : Sommet[];
    private suiv : Sommet[];

    constructor(n : string){
        this.nom = n;
        this.voisins = [];
        this.prec = [];
        this.suiv = [];
    }

    public getNom():string{
        return this.nom;
    }
    public getVoisins():Sommet[]{
        return this.voisins;
    }
    public setVoisin(v : Sommet[]):void{
        this.voisins = v;
    }
    public addVoisin(v : Sommet):void{
        this.voisins.push(v);
    }
    public getPrec():Sommet[]{
        return this.prec;
    }
    public addPrec(s : Sommet):void{
        this.prec[this.prec.length] = s;
        this.addVoisin(s);
    }
    public getSuiv():Sommet[]{
        return this.suiv;
    }
    public addSuiv(s : Sommet):void{
        this.suiv[this.suiv.length] = s;
        this.addVoisin(s)
    }
    public removeVoisin(v : Sommet):void{
        let index = this.voisins.indexOf(v);
        if(index > -1)
            this.voisins.splice(index, 1);
        index = this.prec.indexOf(v);
        if(index > -1)
            this.prec.splice(index, 1);
        index = this.suiv.indexOf(v);
        if(index > -1)
            this.suiv.splice(index, 1);
    }
    public afficherSommet():void{
        console.log("Sommet : " + this.nom);
        console.log("Precedent : ");
        for (let i = 0; i < this.prec.length; i++) 
        {
            if (this.prec[i] === undefined) 
            {
                console.log("Début de la liste");
            }
            else console.log(this.prec[i].getNom());
        }
        console.log("Suivant : ");
        for (let i = 0; i < this.suiv.length; i++) 
        {
            if (this.suiv.length === 0)
            {
                console.log("Fin de la liste");
            }
            else console.log(this.suiv[i].getNom());
        }
    }
}
export { Sommet };