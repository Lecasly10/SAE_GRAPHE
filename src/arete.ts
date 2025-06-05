import { Sommet } from "./sommet.ts";

/**
 * Classe représentant une arête orientée entre deux sommets avec un poids.
 */
class Arrete {
    private s1 : Sommet;
    private s2 : Sommet;
    private poids : number;

    /**
     * Crée une arête entre deux sommets avec un poids donné.
     * @param s1 Sommet de départ
     * @param s2 Sommet d'arrivée
     * @param poids Poids de l'arête
     */
    constructor(s1:Sommet, s2:Sommet, poids:number) {
        if (!s1 || !s2) {
            throw new Error("Les sommets de l'arête ne peuvent pas être nuls.");
        }
        if (typeof poids !== "number" || isNaN(poids)) {
            throw new Error("Le poids de l'arête doit être un nombre.");
        }
        this.s1 = s1;
        this.s2 = s2;
        this.poids = poids;
    }

    /** Retourne le sommet d'arrivée de l'arête. */
    public getS2(){
        return this.s2;
    }

    /** Retourne le sommet de départ de l'arête. */
    public getS1(){
        return this.s1;
    }

    /** Retourne le poids de l'arête. */
    public getPoids(){
        return this.poids;
    }

    /** Modifie le poids de l'arête. */
    public setPoids(poids : number){
        if (typeof poids !== "number" || isNaN(poids)) {
            throw new Error("Le poids de l'arête doit être un nombre.");
        }
        this.poids = poids;
    }
}

export { Arrete };