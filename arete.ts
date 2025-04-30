import { Sommet } from "./sommet";

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
export { Arrete };