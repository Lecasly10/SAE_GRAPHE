import { readFileSync, createWriteStream } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Arrete } from "./arete.ts";

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
        if (file != "")
            this.loadGraph(file);
    }

    private loadGraph(file : string){
        let contenu : Array<string> = readFileSync(file, "utf-8").split("\n");
        let n = contenu[0].split(" ");
        this.nbSo = parseInt(n[0]);
        this.nbAr = parseInt(n[1]);
        for (let i = 1; i <= this.nbAr; i++) {
            let s = contenu[i].split(" ");
            let s1 = new Sommet(s[0], []);
            let s2 = new Sommet(s[1], []);
            s1.addVoisin(s2);
            s2.addVoisin(s1);
            this.sommets.push(s1);
            this.sommets.push(s2);
            let a = new Arrete(s1, s2, parseInt(s[2]));
            this.aretes.push(a);
        }
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
        a.getS1().addVoisin(a.getS2());
        a.getS2().addVoisin(a.getS1());
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
    public saveGraph(file : string = "./graph.gr"){
        let output = createWriteStream(file);
        let contenu = "";
        contenu += this.nbSo + " " + this.nbAr + "\n";
        output.write(contenu);
        for (let i = 0; i < this.nbAr; i++) {
            contenu = "";
            contenu = this.aretes[i].getS1().getNom() + " " + this.aretes[i].getS2().getNom() + " " + this.aretes[i].getPoids() + "\n";
            output.write(contenu);
        }
        output.end();
    }


    /*

    */

    public redimensionner(nbSommet : number)
    {
        let i : number;
        let s : Sommet;
        if (nbSommet > this.nbSo) 
        {
            for (i = this.nbSo; i < nbSommet; i++)
            {
                s = new Sommet(i, []);
                this.sommets.push(s);
                this.nbSo++;
            }
        }
        else if (nbSommet < this.nbSo) 
        {
            for (i = this.nbSo; i > nbSommet; i--) 
            {
                s = this.sommets[i-1];
                this.removeSommet(s);
            }
        }
        this.nbSo = nbSommet;

    }
}
export { graph };