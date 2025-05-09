import { Bellman } from "./bellman";

class MissionDrone
{
    HorraireDepartPlusTot : number;
    HorraireDepartPlusTard : number;
    DurééMinimale : number;
    MargeLibre : number;
    MargeTotal : number;
    TrajetCritique : number;
    CheminCritique : number;

    constructor(HorraireDepartPlusTot : number, HorraireDepartPlusTard : number, DurééMinimale : number, MargeLibre : number, MargeTotal : number, TrajetCritique : number, CheminCritique : number)
    {
        this.HorraireDepartPlusTot = HorraireDepartPlusTot;
        this.HorraireDepartPlusTard = HorraireDepartPlusTard;
        this.DurééMinimale = DurééMinimale;
        this.MargeLibre = MargeLibre;
        this.MargeTotal = MargeTotal;
        this.TrajetCritique = TrajetCritique;
        this.CheminCritique = CheminCritique;
    }


    public max(n:number, m:number) : number
    {
        return n > m ? n : m;
    }
    public min(n:number, m:number) : number
    {
        return n < m ? n : m;
    }

    
}