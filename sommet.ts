class Sommet {
    private nom : string;
    private voisins : Sommet[];

    constructor(n : string, v :Sommet[]){
        this.nom = n;
        this.voisins = v || [];
    }

    public getNom(){
        return this.nom;
    }
    public getVoisins(){
        return this.voisins;
    }
    public setVoisin(v : Sommet[]){
        this.voisins = v;
    }
    public addVoisin(v : Sommet){
        this.voisins.push(v);
    }
    public removeVoisin(v : Sommet){
        let index = this.voisins.indexOf(v);
        if(index > -1){
            this.voisins.splice(index, 1);
        }
    }
}
export { Sommet };