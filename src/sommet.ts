/**
 * Classe représentant un sommet d'un graphe orienté.
 */
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

    /**
     * Constructeur du sommet.
     * @param n Nom du sommet
     */
    constructor(n : string){
        if (!n || typeof n !== "string") {
            throw new Error("Le nom du sommet doit être une chaîne non vide.");
        }
        this.nom = n;
        this.voisins = [];
        this.prec = [];
        this.suiv = [];
        this.duree = 0;
        this.tot = 0;
        this.tard = 0;
        this.estSommetCritique = false;
        this.margetot = 0;
        this.margelib = 0;
    }

    /**
     * Trouve le plus petit tot parmi les successeurs.
     */
    private findSuivTot(): number {
        if (this.suiv.length === 0) return 0;
        let res : number = this.suiv[0].tot;
        for (let i = 1; i < this.suiv.length; i++) {
            if (this.suiv[i].tot < res)
                res = this.suiv[i].tot;
        }
        return res;
    }

    /**
     * Calcule la marge libre du sommet.
     */
    public setMargeLibre(): void {
        if (this.suiv.length === 0)
            this.margelib = this.tard - this.tot;
        else {
            const suivTot: number = this.findSuivTot();
            this.margelib = suivTot - this.tot - this.duree;
        }
    }

    /**
     * Calcule la marge totale du sommet.
     */
    public setMargeTotale(): void {
        this.margetot = this.tard - this.tot;
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
        if (typeof t !== "number" || isNaN(t)) {
            throw new Error("La date au plus tard doit être un nombre.");
        }
        this.tard = t;
        this.estSommetCritique = (this.tard === this.tot);
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
        if (typeof t !== "number" || isNaN(t)) {
            throw new Error("La date au plus tôt doit être un nombre.");
        }
        this.tot = t;
        this.estSommetCritique = (this.tot === this.tard);
        this.setMargeTotale();
        this.setMargeLibre();
    }
    public getDuree():number{
        return this.duree;
    }
    public setDuree(d : number):void{
        if (typeof d !== "number" || isNaN(d)) {
            throw new Error("La durée doit être un nombre.");
        }
        this.duree = d;
        this.setMargeLibre();
    }
    public getNom():string{
        return this.nom;
    }
    public getVoisins():Sommet[]{
        return this.voisins;
    }
    public setVoisin(v : Sommet[]):void{
        if (!Array.isArray(v)) {
            throw new Error("Les voisins doivent être un tableau de Sommets.");
        }
        this.voisins = v;
    }
    public addVoisin(v : Sommet):void{
        if (!(v instanceof Sommet)) {
            throw new Error("Le voisin doit être un Sommet.");
        }
        this.voisins.push(v);
    }
    public getPrec():Sommet[]{
        return this.prec;
    }
    public addPrec(s : Sommet):void{
        if (!(s instanceof Sommet)) {
            throw new Error("Le prédécesseur doit être un Sommet.");
        }
        this.prec.push(s);
        this.addVoisin(s);
        if (this.tot < s.getTot() + s.getDuree()) {
            this.setTot(s.getTot() + s.getDuree());
        }
    }
    public getSuiv():Sommet[]{
        return this.suiv;
    }
    public addSuiv(s : Sommet):void{
        if (!(s instanceof Sommet)) {
            throw new Error("Le successeur doit être un Sommet.");
        }
        this.suiv.push(s);
        this.addVoisin(s);
        this.setMargeLibre();
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
    /**
     * Affiche les informations du sommet dans la console.
     */
    public afficherSommet():void{
        console.log("Sommet : " + this.nom);
        console.log("\nPrecedent : ");
        if (this.prec.length === 0) 
            console.log("Début de la liste");
        else {
            for (let i = 0; i < this.prec.length; i++)
                console.log(this.prec[i].getNom());
        }
        console.log("\nSuivant : ");
        if (this.suiv.length === 0) 
            console.log("Fin de la liste");
        else {
            for (let i = 0; i < this.suiv.length; i++)
                console.log(this.suiv[i].getNom());
        }
    }
}

export { Sommet };