import { readFileSync, createWriteStream } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Arrete } from "./arete.ts";

/**
 * Classe représentant un graphe orienté avec sommets et arêtes.
 */
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
        if (file != "") {
            try {
                this.loadGraph(file);
            } catch (err) {
                console.error("Erreur lors du chargement du graphe :", err);
            }
        }
    }

    /**
     * Vérifie si un sommet existe déjà dans le graphe.
     * @param s Nom du sommet à vérifier
     * @returns Index du sommet ou -1 s'il n'existe pas
     */
    public som_aldready_exist(s: string): number {
        for (let i = 0; i < this.sommets.length; i++)
            if (this.sommets[i]?.getNom() === s)
                return i;
        return -1;
    }
    
    /**
     * Charge un graphe à partir d'un fichier.
     * @param file Chemin du fichier à charger
     */
    private loadGraph(file: string): void {
        try {
            const contenu: Array<string> = readFileSync(file, "utf-8").split("\n");
            const n = contenu[0].split(" ");
            this.nbSo = parseInt(n[0]);
            this.nbAr = parseInt(n[1]);
        
            for (let i = 1; i < parseInt(n[1]); i++) {
                if (!contenu[i]?.trim()) continue;
                const s = contenu[i]?.split(" ");
                if (!s || s.length < 3) continue;
                const index1 = this.som_aldready_exist(s[0]);
                const index2 = this.som_aldready_exist(s[1]);
        
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
        
                const poids = parseInt(s[2]);
                if (isNaN(poids)) throw new Error(`Poids invalide pour l'arête ${s[0]} -> ${s[1]}`);
                const a = new Arrete(s1, s2, poids);
                this.addArete(a);
                this.aretes.push(a);
            }
        } catch (err) {
            throw new Error("Erreur lors du chargement du fichier de graphe : " + err);
        }
    }

    // --- Getters et setters avec commentaires ---
    public getNom():string{ return this.nom; }
    public getSommets():Sommet[]{ return this.sommets; }
    public getAretes():Arrete[]{ return this.aretes; }
    public getNbSommet():number{ return this.nbSo; }
    public getNbArete():number{ return this.nbAr; }
    public setNom(nom : string){ this.nom = nom; }
    public setSommets(sommets : Sommet[]){ this.sommets = sommets; }
    public setAretes(aretes : Arrete[]){ this.aretes = aretes; }
    public setNbSommet(nbSo : number){ this.nbSo = nbSo; }
    public setNbArete(nbAr : number){ this.nbAr = nbAr; }

    /**
     * Ajoute un sommet au graphe.
     */
    public addSommet(s : Sommet){
        this.sommets.push(s);
        this.nbSo++;
    }

    /**
     * Vérifie si un sommet a des voisins.
     */
    private inLink(s : Sommet){
        return s.getVoisins().length > 0;
    }

    /**
     * Supprime un sommet du graphe et ses arêtes associées.
     */
    public removeSommet(s : Sommet){
        const index = this.sommets.indexOf(s);
        if(index > -1){
            this.sommets.splice(index, 1);
            this.nbSo--;
        }
        if (this.inLink(s)) {
            for (let i = 0; i < this.aretes.length; i++) {
                const s1 = this.aretes[i].getS1();
                const s2 = this.aretes[i].getS2();
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

    /**
     * Ajoute une arête au graphe.
     */
    public addArete(a : Arrete){
        a.getS1().addSuiv(a.getS2());
        a.getS2().addPrec(a.getS1());
        this.aretes.push(a);
        this.nbAr++;
    }

    /**
     * Supprime une arête du graphe.
     */
    public removeArete(a : Arrete){
        const index = this.aretes.indexOf(a);
        if(index > -1){
            this.aretes.splice(index, 1);
            this.nbAr--;
            const s1 = a.getS1();
            const s2 = a.getS2();
            s1.removeVoisin(s2);
            s2.removeVoisin(s1);
        }
    }

    /**
     * Vérifie si une arête existe déjà dans le graphe.
     */
    public areteExist(a : Arrete){
        for (let i = 0; i < this.aretes.length; i++) {
            if (this.aretes[i].getS1() == a.getS1() && this.aretes[i].getS2() == a.getS2()) {
                return true;
            }
        }
        return false;
    }

    /**
     * Sauvegarde le graphe dans un fichier.
     */
    public saveGraph(file : string = "./graph.gr"){
        try {
            const output = createWriteStream(file);
            let contenu = "";
            contenu += this.nbSo + " " + this.nbAr + "\n";
            output.write(contenu);
            for (let i = 0; i < this.nbAr; i++) {
                contenu = "";
                contenu = this.aretes[i].getS1().getNom() + " " + this.aretes[i].getS2().getNom() + " " + this.aretes[i].getPoids() + "\n";
                output.write(contenu);
            }
            output.end();
        } catch (err) {
            console.error("Erreur lors de la sauvegarde du graphe :", err);
        }
    }

    /**
     * Redimensionne le nombre de sommets du graphe.
     */
    public redimensionner(nbSommet : number) {
        let i : number;
        let s : Sommet;
        if (nbSommet > this.nbSo) {
            for (i = this.nbSo; i < nbSommet; i++) {
                s = new Sommet(i.toString());
                this.sommets.push(s);
            }
        }
        else if (nbSommet < this.nbSo) {
            for (i = this.nbSo; i > nbSommet; i--) {
                s = this.sommets[i-1];
                this.removeSommet(s);
            }
        }
        this.nbSo = nbSommet;
        for (let j = 0; j < this.sommets.length; j++)
            console.log(this.sommets[j].getNom()+"\n");
    }

    /**
     * Affiche le graphe dans la console.
     */
    public afficherGraph() {
        console.log("Le nombre de sommets est : " + this.nbSo);
        console.log("Le nombre d'aretes est : " + this.nbAr + "\n");
        for (let i = 0; i < this.sommets.length; i++) {
            this.sommets[i].afficherSommet();
            console.log("\n ");
        }
    }
}

export { Graph };