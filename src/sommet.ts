class Sommet {
    private nom : string;
    private voisins : Sommet[];

    constructor(n : string, v :Sommet[]){
        this.nom = n;
        this.voisins = v || [];
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
    public removeVoisin(v : Sommet):void{
        let index = this.voisins.indexOf(v);
        if(index > -1){
            this.voisins.splice(index, 1);
        }
    }
}
export { Sommet };