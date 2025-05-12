import { readFileSync } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Graph } from "./graphes.ts";
import { Bellman } from "./bellman.ts";

class MPM {
    private graph: Graph;
    private source: Sommet;
    private puit: Sommet;

    constructor(file : string = ""){
        this.graph = new Graph();
        
        if (file != "")
            this.loadMpm(file);
        this.findSourceAndPuit();
    }

    private findSourceAndPuit(): void {
        let s: Sommet;
        for (let i = 0; i < this.graph.getSommets().length; i++) {
            s = this.graph.getSommets()[i];
            if (s.getPrec().length === 0)
                this.source = s;
            if (s.getSuiv().length === 0)
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
}

//horaires de début au plus tard  ---  marges libres et totales  ---  trajets critiques et chemin critique
export { MPM };