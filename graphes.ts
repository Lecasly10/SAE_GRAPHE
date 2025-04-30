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

class Arrete {
    private s1 : Sommet;
    private s2 : Sommet;
    private poids : number;

    constructor(s1, s2, poids){
        this.s1 = s1;
        this.s2 = s2;
        this.poids = poids;
    }

    public getS2(){
        return this.s2;
    }
    public getS1(){
        return this.s1;
    }
    public getPoids(){
        return this.poids;
    }
    public setPoids(poids : number){
        this.poids = poids;
    }
}

class graph {
    private nom : string;
    private sommets : Sommet[];
    private aretes : Arrete[];
    private nbSo : number;
    private nbAr : number;

    constructor(file : string = ""){
        this.sommets = [];
        this.aretes = [];
        this.nbSo = 0;
        this.nbAr = 0;
        this.nom = "";
        /*if(file != "")
            this.chargerGraph(file);*/
    }

    public getNom(){
        return this.nom;
    }
    public getSommets(){
        return this.sommets;
    }
    public getAretes(){
        return this.aretes;
    }
    public getNbSommet(){
        return this.nbSo;
    }
    public getNbArete(){
        return this.nbAr;
    }
    public setNom(nom : string){
        this.nom = nom;
    }
    public setSommets(sommets : Sommet[]){
        this.sommets = sommets;
    }
    public setAretes(aretes : Arrete[]){
        this.aretes = aretes;
    }
    public setNbSommet(nbSo : number){
        this.nbSo = nbSo;
    }
    public setNbArete(nbAr : number){
        this.nbAr = nbAr;
    }
    public addSommet(s : Sommet){
        this.sommets.push(s);
        this.nbSo++;
    }
    private inLink(s : Sommet){
        if (s.getVoisins().length > 0)
            return true;
        return false;
    }
    public removeSommet(s : Sommet){
        let index = this.sommets.indexOf(s);
        if(index > -1){
            this.sommets.splice(index, 1);
            this.nbSo--;
        }
        if (this.inLink(s)) {
            for (let i = 0; i < this.aretes.length; i++) {
                let s1 = this.aretes[i].getS1();
                let s2 = this.aretes[i].getS2();
                if (s1 == s) {
                    this.aretes[i].getS2().removeVoisin(s);
                    this.aretes.splice(i, 1);
                    this.nbAr--;
                } else if (s2 == s && s1 != s) {
                    this.aretes[i].getS1().removeVoisin(s);
                    this.aretes.splice(i, 1);
                    this.nbAr--;
                }
            }
        }

    }
    public addArete(a : Arrete){
        this.aretes.push(a);
        this.nbAr++;
    }
    public removeArete(a : Arrete){
        let index = this.aretes.indexOf(a);
        if(index > -1){
            this.aretes.splice(index, 1);
            this.nbAr--;
            let s1 = a.getS1();
            let s2 = a.getS2();
            s1.removeVoisin(s2);
            s2.removeVoisin(s1);
        }
    }
    public areteExist(a : Arrete){
        for (let i = 0; i < this.aretes.length; i++) {
            if (this.aretes[i].getS1() == a.getS1() && this.aretes[i].getS2() == a.getS2()) {
                return true;
            }
        }
        return false;
    }
}