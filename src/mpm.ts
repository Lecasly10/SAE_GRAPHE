import { readFileSync } from "node:fs";
import { Sommet } from "./sommet.ts";
import { Graph } from "./graphes.ts";

class MPM {
    private graph: Graph;
    private source: Sommet;
    private puit: Sommet;
    private durreeMin: number;

    constructor(file : string = "") {
        this.graph = new Graph();
        this.durreeMin = 0;
        this.source = new Sommet("s");
        this.puit = new Sommet("p");
        
        try {
            if (file != "")
                this.loadMpm(file);
            this.findSourceAndPuit();
            this.calculerDates();
            console.log("Durrée minimale : " + this.durreeMin);
            this.printAllSommetsInfo();
        } catch (err) {
            console.error("Erreur lors de l'initialisation du MPM :", err);
        }
    }

    // Recherche la source (aucun prédécesseur) et le puit (aucun successeur)
    private findSourceAndPuit(): void {
        this.source = undefined as unknown as Sommet;
        this.puit = undefined as unknown as Sommet;
        for (let i = 0; i < this.graph.getSommets().length; i++) {
            const s = this.graph.getSommets()[i];
            if (s.getPrec().length === 0 && this.source === undefined)
                this.source = s;
            if (s.getSuiv().length === 0 && this.puit === undefined)
                this.puit = s;
        }
        if (!this.source || !this.puit) {
            throw new Error("Source ou puit non trouvés dans le graphe.");
        }
    }

    // Charge le graphe à partir d'un fichier .mpm
    private loadMpm(file: string): void {
        try {
            const contenu: Array<string> = readFileSync(file, "utf-8").split("\n");
            const n = contenu[0].split(" ");
            this.graph.setNbSommet(parseInt(n[0]));

            for (let i = 1; i < contenu.length; i++) {
                if (!contenu[i].trim()) continue; // Ignore les lignes vides
                const l = contenu[i].trim().split(" ");
                const nomSommet = l[0].trim();
                if (!nomSommet) continue; // Ignore si le nom du sommet est vide

                // Vérifie si le sommet existe déjà
                const indexSommet = this.graph.som_aldready_exist(nomSommet);
                let s: Sommet;
                if (indexSommet === -1) {
                    s = new Sommet(nomSommet);
                    this.graph.addSommet(s);
                } else
                    s = this.graph.getSommets()[indexSommet];

                // Gestion d'exception pour la durée
                try {
                    s.setDuree(parseInt(l[1]));
                } catch (err) {
                    throw new Error(`Erreur de parsing de la durée pour le sommet ${nomSommet}` + err);
                }

                // Ajoute les prédécesseurs
                for (let j = 2; l[j] != undefined; j++) {
                    const nomPrec = l[j].trim();
                    if (!nomPrec) continue;
                    const indexPrec = this.graph.som_aldready_exist(nomPrec);
                    let s2: Sommet;
                    if (indexPrec === -1) {
                        s2 = new Sommet(nomPrec);
                        this.graph.addSommet(s2);
                    } else
                        s2 = this.graph.getSommets()[indexPrec];
                    s.addPrec(s2);
                    s2.addSuiv(s);
                }
            }
        } catch (err) {
            throw new Error("Erreur lors du chargement du fichier MPM : " + err);
        }
    }

    // Calcule la durée minimale du projet
    public DureesMin(): void {
        this.durreeMin = this.puit.getDuree() + this.puit.getTot();
    }

    // Affiche les infos d'un sommet
    public printInfoSommet(s:Sommet):void {
        console.log("Sommet : " + s.getNom() + "  --  Durée : " + s.getDuree().toString() + "  --  Plus tôt : " + s.getTot() + "  --  Plus tard : " + s.getTard() + "\nMarges :\n\tLibre : " + s.getMargeLibre() + "  --  Totale : " + s.getMargeTotale() + "\nEst critique : " + s.getEstSommetCritique());
    }

    // Affiche les infos de tous les sommets
    public printAllSommetsInfo(): void {
        try {
            for (const s of this.graph.getSommets()) {
                this.printInfoSommet(s);
            }
        } catch (err) {
            console.error("Erreur lors de l'affichage des sommets :", err);
        }
    }

    // Affiche le parcours du graphe à partir de la source
    public parcoursGraph():void {
        console.log("Parcours du MPM\n\nLa source : " + this.source.getNom() + "\nDurée : " + this.source.getDuree() + "  --   Sommets suivants : ");
        let res : string = "";
        const list = this.source.getSuiv();
        for (let i = 0; i < list.length; i++) {
            res += list[i].getNom() + " ; ";
        }
        res += "\n\n";
        console.log(res);
    }

    // Affiche le chemin critique
    public cheminCritique(): void {
        const liste = this.graph.getSommets();
        let res = "Chemin critique : ";
        for (let i = 0; i < liste.length; i++) {
            if (liste[i].getEstSommetCritique())
                res += liste[i].getNom() + " -- ";
        }
        console.log(res);
    }

    // Calcule les dates au plus tôt et au plus tard pour chaque sommet
    public calculerDates(): void {
        try {
            for (const s of this.graph.getSommets())
                s.setTot(0);
            this.initTot(this.source);
            this.DureesMin();
            for (const s of this.graph.getSommets())
                if (s !== this.puit)
                    s.setTard(this.durreeMin);
                else
                    s.setTard(this.durreeMin - s.getDuree());
            this.initTard(this.puit);

            // Met à jour les marges
            for (const s of this.graph.getSommets()) {
                s.setMargeLibre();
                s.setMargeTotale();
            }
        } catch (err) {
            throw new Error("Erreur lors du calcul des dates : " + err);
        }
    }

    // Calcul récursif des dates au plus tôt
    private initTot(som:Sommet): void {
        if (som != this.puit) {
            for (const s in som.getSuiv()) {
                const suivant = som.getSuiv()[s];
                if (suivant.getTot() < som.getTot() + som.getDuree())
                    suivant.setTot(som.getTot() + som.getDuree());
                this.initTot(suivant);
            }
        }
    }

    // Calcul récursif des dates au plus tard
    private initTard(s: Sommet): void {
        if (s != this.source) {
            for (const prec of s.getPrec()) {
                if (prec.getTard() >= s.getTard() - prec.getDuree()) {
                    prec.setTard(s.getTard() - prec.getDuree());
                }
                this.initTard(prec);
            }
        }
    }
}

export { MPM };