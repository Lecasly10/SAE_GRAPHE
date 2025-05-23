import { Graph } from "./graphes.ts";
import { Sommet } from "./sommet.ts";
import { Arrete } from "./arete.ts";


class Bellman {
    private nbSo : number;
    private arcs;
    
    public bellmanCourtChemin(source: number): number[] 
    {
        const dist = new Array(this.nbSo).fill(Infinity);
        dist[source] = 0;

        for (let i = 0; i < this.nbSo - 1; i++) 
        {
            for (let [u, voisins] of this.arcs) 
            {
                for (let [v, poids] of voisins) 
                {
                    if (dist[u] + poids < dist[v]) 
                    {
                        dist[v] = dist[u] + poids;
                    }
                }
            }
        }
        return dist;
    }


    public bellmanLongChemin(source: number): number[] 
    {
        const dist = new Array(this.nbSo).fill(-Infinity);
        dist[source] = 0;
        for (let i = 0; i < this.nbSo - 1; i++) 
        {
            for (let [u, voisins] of this.arcs) 
            {
                for (let [v, poids] of voisins) 
                {
                    if (dist[u] + poids > dist[v]) 
                    {
                        dist[v] = dist[u] + poids;
                    }
                }
            }
        }
        return dist;
    }

    public bellmanArborescence(source: number): number[] 
    {
        return this.bellmanCourtChemin(source);
    }

    public bellmanAntiArborescence(source: number): number[]
    {
        return this.bellmanLongChemin(source);
    }
} 

export { Bellman };