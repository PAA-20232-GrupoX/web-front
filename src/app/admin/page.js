"use client"
import Header from "@/components/header";
import AnimatedGraph from "@/components/graph";
import biggerGraph from "@/app/admin/graphFile"
import { useEffect, useState } from "react";
import axios from "axios";

const nameConv = {
  "rede convolutiva": 0,
  0: "rede convolutiva",
  imagens: 1,
  1: "imagens",
  "reconhecimento de padrões": 2,
  2: "reconhecimento de padrões",
  "grande volume de dados": 3,
  3: "grande volume de dados",
  "alta variabilidade": 4,
  4: "alta variabilidade",
  "modelo baseado em transformadores": 5,
  5: "modelo baseado em transformadores",
  "tarefa de segmentação": 6,
  6: "tarefa de segmentação",
  "BERT para análise de sentimento": 7,
  7: "BERT para análise de sentimento",
  texto: 8,
  8: "texto",
  "análise de sentimento": 9,
  9: "análise de sentimento",
  "LSTM para sequências temporais": 10,
  10: "LSTM para sequências temporais",
  "sequência temporal": 11,
  11: "sequência temporal",
  "transformador para tradução": 12,
  12: "transformador para tradução",
  "tarefa de tradução": 13,
  13: "tarefa de tradução",
  "árvore de decisão": 14,
  14: "árvore de decisão",
  "dados categóricos": 15,
  15: "dados categóricos",
  "pequeno volume de dados": 16,
  16: "pequeno volume de dados",
  "Random Forest": 17,
  17: "Random Forest",
  "dados faltantes": 18,
  18: "dados faltantes",
  SVM: 19,
  19: "SVM",
  "dados contínuos": 20,
  20: "dados contínuos",
  "pequena quantidade de features": 21,
  21: "pequena quantidade de features",
  "regressão linear": 22,
  22: "regressão linear",
  "dados lineares": 23,
  23: "dados lineares",
  "grande complexidade": 24,
  24: "grande complexidade",
  "K-means": 25,
  25: "K-means",
  "dados agrupáveis": 26,
  26: "dados agrupáveis",
  "sem rótulos": 27,
  27: "sem rótulos",
  "rede neural profunda": 28,
  28: "rede neural profunda",
  "alta complexidade": 29,
  29: "alta complexidade",
  "algoritmo genético": 30,
  30: "algoritmo genético",
  "otimização de parâmetros": 31,
  31: "otimização de parâmetros",
  "espaço de solução grande": 32,
  32: "espaço de solução grande",
  "redes Bayesianas": 33,
  33: "redes Bayesianas",
  incerteza: 34,
  34: "incerteza",
  "dados probabilísticos": 35,
  35: "dados probabilísticos",
  "algoritmo de agrupamento hierárquico": 36,
  36: "algoritmo de agrupamento hierárquico",
  "dados não rotulados": 37,
  37: "dados não rotulados",
  "necessidade de hierarquia": 38,
  38: "necessidade de hierarquia",
  "regressão logística": 39,
  39: "regressão logística",
  "classificação binária": 40,
  40: "classificação binária",
  "Naive Bayes": 41,
  41: "Naive Bayes",
  classificação: 42,
  42: "classificação",
  "dados textuais": 43,
  43: "dados textuais",
  "algoritmo A*": 44,
  44: "algoritmo A*",
  "busca de caminho": 45,
  45: "busca de caminho",
  "espaço de estado grande": 46,
  46: "espaço de estado grande",
  "algoritmo de Floresta Aleatória": 47,
  47: "algoritmo de Floresta Aleatória",
  "grande quantidade de dados": 48,
  48: "grande quantidade de dados",
};

const allSymptons = [
  "3",
  "31",
  "2",
  "8",
  "27",
  "32",
  "18",
  "34",
  "11",
  "48",
  "42",
  "16",
  "26",
  "13",
  "29",
  "1",
  "38",
  "45",
  "15",
  "37",
  "21",
  "20",
  "35",
  "23",
  "4",
  "40",
  "43",
  "46",
  "6",
  "24",
  "9",
];

export default function Admin() {
  const [data, setData] = useState({});
  const [graph, setGraph] = useState({});

  const nameConversion = (name) => {
    // if ; in name
    if (name.includes(";")) {
      const names = name.split(";");
      const convNames = names.map((e) => {
        if (e.includes("*")) {
          return "não " + nameConv[e.replace("*", "")];
        }
        return nameConv[e];
      });
      return convNames.join(" e ");
    }

    if (name.includes("*")) {
      return "não " + nameConv[name.replace("*", "")];
    }

    return nameConv[name];
  };

  const dataToGraph = (dictData) => {
    var graph = []
  
    var symptoms = {}
    for (var value of dictData['']) {
      symptoms[nameConversion(value[0])] = true
    }
  
    // nodes
    for (var key in dictData) {
      var node_str = nameConversion(key)
      if (node_str === undefined) node_str = key
      var type = ""
      if (node_str.length == 0) {
        type = "Root"
      } else {
        type = symptoms[node_str] ? "Symptom" : "Cause"
        type = key.match(".*;.*") !== null ? "Association" : type
      }
     
      var node = {}
      node.group = "nodes"
      node.data = {
        id: key.length != 0 ? key : 'start',
        displayName: node_str.length != 0 ? node_str : 'start',
        type: type,
        kind: "NetworkService",
        visited: "No",
        alarmSeverity: "cleared"
      }
      node.classes = "nodeIcon"
      graph.push(node)
    }
  
    // edges
    graph.forEach((node) => {
      var key = node.data.id === 'start' ? '' : node.data.id.replaceAll('_', ' ')
      for (var value of dictData[key]) {
        
        if (value[0] !== '!') {
          var target = value[0].replaceAll(' ', '_')
          value[0] = nameConversion(value[0])
  
          var edge = {}
          edge.data = {
            group: "edges",
            label: value[1].toFixed(2).toString(),
            source: node.data.id,
            target: target
          }
          graph.push(edge)
        }
      }
    });
  
    return graph
  }

  useEffect(() => {
    // teste
    axios.get("http://localhost:8000/graph").then((res) => {
      setData(() => res.data.graph);
    });
  }, []);

  useEffect (() => {
    if (Object.keys(data).length !== 0) {
      setGraph(dataToGraph(data))
    }  
  },  [data]);

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />
      <div className="flex h-5/6">
        <div id="cy" className="flex justify-center items-center w-2/4">
            <AnimatedGraph data={graph} setData={setGraph}/>
        </div>
      </div>
    </main>
  );
}
