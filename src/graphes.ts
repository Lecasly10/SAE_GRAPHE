import { readFileSync, createWriteStream } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Arrete } from "./arete.ts";

class Graph {
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

    public som_aldready_exist(s: string): number {
        for (let i = 0; i < this.sommets.length; i++)
            if (this.sommets[i]?.getNom() === s)
                return i;
        return -1;
    }
    
    private loadGraph(file: string): void {
        let contenu: Array<string> = readFileSync(file, "utf-8").split("\n");
        let n = contenu[0].split(" ");
        this.nbSo = parseInt(n[0]);
        this.nbAr = parseInt(n[1]);
    
        for (let i = 1; i < parseInt(n[1]); i++) {
            let s = contenu[i]?.split(" ");
            let index1 = this.som_aldready_exist(s[0]);
            let index2 = this.som_aldready_exist(s[1]);
    
            let s1: Sommet;
            let s2: Sommet;
    
            if (index1 === -1) {
                s1 = new Sommet(s[0]);
                this.sommets.push(s1);
            } else
                s1 = this.sommets[index1];
    
            if (index2 === -1) {
                s2 = new Sommet(s[1]);
                this.sommets.push(s2);
            } else
                s2 = this.sommets[index2];
    
            let a = new Arrete(s1, s2, parseInt(s[2]));
            this.addArete(a);
            this.aretes.push(a);
        }
    }

    public getNom():string{ //fct
        return this.nom;
    }
    public getSommets():Sommet[]{ //fct
        return this.sommets;
    }
    public getAretes():Arrete[]{
        return this.aretes;
    }
    public getNbSommet():number{ //fct
        return this.nbSo;
    }
    public getNbArete():number{ //fct
        return this.nbAr;
    }
    public setNom(nom : string){ //fct
        this.nom = nom;
    }
    public setSommets(sommets : Sommet[]){ //fct
        this.sommets = sommets;
    }
    public setAretes(aretes : Arrete[]){ //fct
        this.aretes = aretes;
    }
    public setNbSommet(nbSo : number){ //fct
        this.nbSo = nbSo;
    }
    public setNbArete(nbAr : number){ //fct
        this.nbAr = nbAr;
    }
    public addSommet(s : Sommet){ //fct
        this.sommets.push(s);
        this.nbSo++;
    }
    private inLink(s : Sommet){ //fct
        if (s.getVoisins().length > 0)
            return true;
        return false;
    }
    public removeSommet(s : Sommet){ //fct
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
    public addArete(a : Arrete){ //fct
        a.getS1().addSuiv(a.getS2());
        a.getS2().addPrec(a.getS1());
        this.aretes.push(a);
        this.nbAr++;
    }
    public removeArete(a : Arrete){ //fct
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
    public saveGraph(file : string = "./graph.gr"){ //fct
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

    public redimensionner(nbSommet : number) //fct 
    {
        let i : number;
        let s : Sommet;
        if (nbSommet > this.nbSo) 
        {
            for (i = this.nbSo; i < nbSommet; i++)
            {
                s = new Sommet(i.toString());
                this.sommets.push(s);
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
        for (let j = 0; j < this.sommets.length; j++)
            console.log(this.sommets[j].getNom()+"\n");
    }
    public afficherGraph() {
        console.log("Le nombre de sommets est : " + this.nbSo);
        console.log("Le nombre d'aretes est : " + this.nbAr);
        for (let i = 0; i < this.sommets.length; i++) {
            this.sommets[i].afficherSommet();
            console.log("\n ");
        }
    }
}

export { Graph };