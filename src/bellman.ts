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

    public bellmanArborescence(source: number): { dist: number[], parent: number[] }
    {
        const dist = new Array(this.nbSo).fill(Infinity);
        const parent = new Array(this.nbSo).fill(-1);
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
                        parent[v] = u;
                    }
                }
            }
        }
        return { dist, parent };
    }

    public inverserGraphe(): Map<number, [number, number][]> 
    {
        const grapheInverse = new Map<number, [number, number][]>();

        for (let i = 0; i < this.nbSo; i++) 
        {
            grapheInverse.set(i, []);
        }

        for (let [u, voisins] of this.arcs) 
        {
            for (let [v, poids] of voisins) 
            {
                grapheInverse.get(v)?.push([u, poids]);
            }
        }
        return grapheInverse;
    }


    public bellmanAntiArborescence(destination: number): { dist: number[], parent: number[] } 
    {
        const grapheInverse = this.inverserGraphe();
        const dist = new Array(this.nbSo).fill(Infinity);
        const parent = new Array(this.nbSo).fill(-1);
        dist[destination] = 0;

        for (let i = 0; i < this.nbSo - 1; i++) 
        {
            for (let [v, voisins] of grapheInverse) 
            {
                for (let [u, poids] of voisins) 
                {
                    if (dist[v] + poids < dist[u]) 
                    {
                        dist[u] = dist[v] + poids;
                        parent[u] = v;
                    }
                }
            }
        }
        return { dist, parent };
    }
}

export { Bellman };