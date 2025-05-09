import { readFileSync, createWriteStream } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Arrete } from "./arete.ts";
import { Graph } from "./graphes.ts";

class MPM {
    private graph: Graph;
    private source: Sommet;
    private puis: Sommet;

    constructor(file : string = ""){
        this.graph = new Graph();
        
        if (file != "")
            this.loadMpm(file);
    }

    private loadMpm(file: string): void {
        let contenu: Array<string> = readFileSync(file, "utf-8").split("\n");
        let n = contenu[0].split(" ");
        this.graph.nbSo = parseInt(n[0]);
        this.graph.nbAr = parseInt(n[1]);
    
        for (let i = 1; i < parseInt(n[1]); i++) {
            let s = contenu[i]?.split(" ");
            let index1 = this.graph.som_aldready_exist(s[0]);
            let index2 = this.graph.som_aldready_exist(s[1]);
    
            let s1: Sommet;
            let s2: Sommet;
    
            if (index1 === -1) {
                s1 = new Sommet(s[0]);
                this.graph.sommets.push(s1);
            } else
                s1 = this.graph.sommets[index1];
    
            if (index2 === -1) {
                s2 = new Sommet(s[1]);
                this.graph.sommets.push(s2);
            } else
                s2 = this.graph.sommets[index2];
    
            let a = new Arrete(s1, s2, parseInt(s[2]));
            this.graph.addArete(a);
            this.graph.aretes.push(a);
        }
    }
}