import { Graph } from "./src/graphes.ts";
import { Sommet } from "./src/sommet.ts";
import { Arrete } from "./src/arete.ts";
import { MPM } from "./src/mpm.ts";


const g = new Graph();
const s1 = new Sommet("A");
const s2 = new Sommet("B");
const s3 = new Sommet("C");
const s4 = new Sommet("D");
const s5 = new Sommet("E");
const s6 = new Sommet("F");
const s7 = new Sommet("G");
g.addSommet(s1);
g.addSommet(s2);
g.addSommet(s3);
g.addSommet(s4);
g.addSommet(s5);
g.addSommet(s6);
g.addSommet(s7);
const a1 = new Arrete(s1, s2, 1);
const a2 = new Arrete(s1, s3, 2);
const a3 = new Arrete(s2, s4, 3);
const a4 = new Arrete(s3, s5, 4);
const a5 = new Arrete(s4, s6, 5);
const a6 = new Arrete(s5, s7, 6);
const a7 = new Arrete(s6, s7, 7);
const a8 = new Arrete(s1, s4, 8);
const a9 = new Arrete(s2, s5, 9);
const a10 = new Arrete(s3, s6, 10);
g.addArete(a1);
g.addArete(a2);
g.addArete(a3);
g.addArete(a4);
g.addArete(a5);
g.addArete(a6);
g.addArete(a7);
g.addArete(a8);
g.addArete(a9);
g.addArete(a10);

g.afficherGraph();
g.saveGraph();
/*
const _mpm = new MPM("./missions_drones.mpm");*/