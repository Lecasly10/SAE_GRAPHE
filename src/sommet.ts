class Sommet {
    private nom : string;
    private voisins : Sommet[];
    private prec : Sommet[];
    private suiv : Sommet[];
    private duree : number;
    private tot : number;
    private tard : number;
    private estSommetCritique : boolean;
    private margetot : number;
    private margelib : number;

    constructor(n : string){
        this.nom = n;
        this.voisins = [];
        this.prec = [];
        this.suiv = [];
    }

    private findSuivTot(): number {
        let res : number = 0;
        let list = this.suiv;
        for (let i = 0; i < list.length; i++) {
            if (i === 0)
                res = list[i].tot;
            else
                if (list[i].tot < res)
                    res = list[i].tot;
        }
        return res;
    }
    public setMargeLibre(): number {
        let suivTot :number = this.findSuivTot();
        return suivTot - this.tot - this.duree;
    }
    public setMargeTotale(): number {
        return this.tard - this.tot;
    }
    public getMargeLibre():number{
        return this.margelib;
    }
    public getMargeTotale():number{
        return this.margetot;
    }
    public getTard():number{
        return this.tard;
    }
    public setTard(t : number):void{
        this.tard = t;
        if (this.tard === this.tot)
            this.estSommetCritique = true;
        else
            this.estSommetCritique = false;
    }
    public getEstSommetCritique():boolean{
        return this.estSommetCritique;
    }
    public setEstSommetCritique(e : boolean):void{
        this.estSommetCritique = e;
    }
    public getTot():number{
        return this.tot;
    }
    public setTot(t : number):void{
        this.tot = t;
        if (this.tot === this.tard)
            this.estSommetCritique = true;
        else
            this.estSommetCritique = false;
        this.setMargeTotale();
        this.getMargeLibre();
    }
    public getDuree():number{
        return this.duree;
    }
    public setDuree(d : number):void{
        this.duree = d;
        this.getMargeLibre();
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
        this.tot < s.getTot() + s.getDuree() ? this.setTot(s.tot + s.duree) : this.tot;
    }
    public getSuiv():Sommet[]{
        return this.suiv;
    }
    public addSuiv(s : Sommet):void{
        this.suiv[this.suiv.length] = s;
        this.addVoisin(s);
        this.getMargeLibre();
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

        for (let i = 0; i < this.prec.length; i++) {
            if (this.prec[i] === undefined) 
                console.log("Début de la liste");
            else console.log(this.prec[i].getNom());
        }
        console.log("Suivant : ");

        for (let i = 0; i < this.suiv.length; i++) {
            if (this.suiv.length === 0)
                console.log("Fin de la liste");
            else console.log(this.suiv[i].getNom());
        }
    }
}
export { Sommet };