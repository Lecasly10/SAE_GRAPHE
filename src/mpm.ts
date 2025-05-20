import { readFileSync } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Graph } from "./graphes.ts";

class MPM {
    private graph: Graph;
    private source: Sommet;
    private puit: Sommet;

    constructor(file : string = "") {
        this.graph = new Graph();
        
        if (file != "")
            this.loadMpm(file);
        this.findSourceAndPuit();
        console.log("puit : ");
        console.log(this.puit.getNom());
        console.log("source : ");
        console.log(this.source.getNom());
        console.log("duree minimum : ");
        console.log(this.DureesMin().toString());
        this.printInfoSommet(this.source);
    }

    private findSourceAndPuit(): void {
        let s: Sommet;
        for (let i = 0; i < this.graph.getSommets().length; i++) {
            s = this.graph.getSommets()[i];
            if (s.getPrec().length === 0 && this.source === undefined) {
                this.source = s;
                s.setTot(0);
            } if (s.getSuiv().length === 0 && this.puit === undefined)
                this.puit = s;
        }
    }
    private loadMpm(file: string): void {
        let contenu: Array<string> = readFileSync(file, "utf-8").split("\n");
        let n = contenu[0].split(" ");
        this.graph.setNbSommet(parseInt(n[0]));
    
        for (let i = 1; i < contenu.length; i++) {
            let l = contenu[i]?.split(" ");
            let s = new Sommet(l[0]);
            this.graph.addSommet(s);
            s.setDuree(parseInt(l[1]));
            for (let i = 2; l[i] != undefined; i++) {
                let index = this.graph.som_aldready_exist(l[i]);
                let s2: Sommet;
                if (index === -1) {
                    s2 = new Sommet(l[i]);
                    this.graph.addSommet(s2);
                } else
                    s2 = this.graph.getSommets()[index];
                s.addPrec(s2);
                s2.addSuiv(s);
            }
        }
    }
    public DureesMin(): number {
        let s: Sommet;
        let d: number = 0;
        for (let i = 0; i < this.graph.getSommets().length; i++) {
            s = this.graph.getSommets()[i];
            if (s.getDuree() > d)
                d = s.getDuree();
        }
        return d;
    }
    public printInfoSommet(s:Sommet):void {
        console.log("Sommet : " + s.getNom() + "  --  Duréé : " + s.getDuree().toString() + "  --  Plus tôt : " + s.getTot() + "  --  Plus tard : " + s.getTard() + "\nMarges :\n\tLibre : " + s.getMargeLibre() + "  --  Totale : " + s.getMargeTotale() + "\nEst critique : " + s.getEstSommetCritique());
    }
    public parcoursGraph():void {
        console.log("Parcours du MPM\n\nLa source : " + this.source.getNom() + "\nDurée : " + this.source.getDuree() + "  --   Sommets suivants : ");
        let res : string = "";
        let list = this.source.getSuiv();
        for (let i = 0; i < list.length; i++) {
            res += list[i].getNom() + " ; ";
        }
        res += "\n\n";
        console.log(res);

    }
    public cheminCritique():void {
        let liste = this.graph.getSommets;
        let res = "Chemin critique : ";

        for (let i = 0; i < liste.length; i++) {
            if (liste[i].getEstSommetCritique)
                res += liste[i].getNom + " -- ";
        }
        console.log(res);
    }
    /*
    public getMarges():void {

    }*/
}

//horaires de début au plus tard
export { MPM };