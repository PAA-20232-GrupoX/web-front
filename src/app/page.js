"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Quiz from "@/components/quiz";
import AnimatedGraph from "@/components/graph";
import AnimatedTree from "@/components/tree";
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

export default function Home() {
  const [treePath, setTreePath] = useState([]);
  const [graph, setGraph] = useState({});
  const [stack, setStack] = useState([]);
  const [tree, setTree] = useState([]);
  const [currentNode, setCurrentNode] = useState("");
  const [finished, setFinished] = useState(false);
  const [solution, setSolution] = useState("");
  const [loading, setLoading] = useState(true);
  const [seeTree, setSeeTree] = useState(false);

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

  const SymptomOrCause = (id) => {
    id = id.replace("*", "");
    if (id.includes(";")) {
      const ids = id.split(";");
      // if all ids are symptoms
      if (ids.every((e) => allSymptons.includes(e))) {
        return "Symptom";
      }
      // if all ids are causes
      if (ids.every((e) => !allSymptons.includes(e))) {
        return "Cause";
      }
    }
    if (allSymptons.includes(id)) {
      return "Symptom";
    }

    return "Cause";
  };

  const calculateTree = (tree) => {
    var lastNode = tree[0][0][tree[0][1]][0];
    var data = [
      {
        group: "nodes",
        data: {
          id: lastNode,
          displayName: nameConversion(lastNode),
          type: "Symptom",
          kind: "VNF",
          visited: "No",
          alarmSeverity: "cleared",
          probability: tree[0][0][tree[0][1]][1].toFixed(1),
        },
        classes: "nodeIcon",
      },
    ];

    const path = [{ id: lastNode }];

    tree.shift();

    tree.forEach((level, index) => {
      level[0].forEach((node) => {
        data.push({
          group: "nodes",
          data: {
            // add (index + 1) dots to id
            id: `${node[0]}.${".".repeat(index + 1)}`,
            displayName: nameConversion(node[0]),
            type: SymptomOrCause(node[0]),
            kind: "VNF",
            visited: "No",
            // clamp probability to 1 decimal digit
            probability: node[1].toFixed(1),
          },
          classes: "nodeIcon",
        });
      });
    });

    tree.forEach((level, index) => {
      level[0].forEach((node) => {
        data.push({
          data: {
            group: "edges",
            source: lastNode,
            target: `${node[0]}.${".".repeat(index + 1)}`,
            label: "",
          },
        });
      });
      lastNode = `${level[0][level[1]][0]}.${".".repeat(index + 1)}`;
      path.push({ id: lastNode });
    });

    setTree(data);
    setTreePath(path);
  };

  const answer = (answer) => {
    setLoading(true);
    {
      axios
        .post("http://localhost:8000/answer", {
          graph: graph,
          stack: stack,
          answer: answer,
        })
        .then((res) => {
          setStack(res.data.stack);
          calculateTree([...res.data.stack]);

          if (res.data.result) {
            setSolution(res.data.result);
            setFinished(true);
            return;
          }

          const nextNode = res.data.next_symptom;
          setCurrentNode(nextNode);
        });
    }
    setLoading(false);
  };

  const restart = () => {
    setLoading(true);
    {
      axios.get("http://localhost:8000/tree").then((res) => {
        setStack(res.data.stack);
        setGraph(res.data.graph);
        setCurrentNode(res.data.next_symptom);

        calculateTree([...res.data.stack]);
      });
      setFinished(false);
    }
    setLoading(false);
  };

  useEffect(() => {
    // teste
    axios.get("http://localhost:8000/tree").then((res) => {
      setStack(res.data.stack);
      setGraph(res.data.graph);
      setCurrentNode(res.data.next_symptom);

      calculateTree([...res.data.stack]);

      setLoading(false);
    });
  }, []);

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />

      <div className="flex h-full">
        {!finished ? (
          <div className="flex justify-center items-center w-full">
            {!loading && (
              <Quiz currentNode={nameConv[currentNode]} answer={answer} />
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-6 justify-center items-center w-full">
            <h1 className="text-4xl text-primary">
              A sua solução é <span className="capitalize">{nameConv[solution]}</span>
            </h1>
            <button
              className="px-4 py-2 rounded-md text-xl bg-primary text-bgdark hover:text-primary hover:bg-bgdark"
              onClick={() => restart()}
            >
              Recomeçar
            </button>
          </div>
        )}
        {seeTree && (
          <div id="cy">
            {!loading && (
              <AnimatedTree
                data={tree}
                treePath={treePath}
                setTreePath={setTreePath}
              />
            )}
          </div>
        )}
      </div>

      <button
        className="rounded-full fixed bottom-0 right-0 m-2 p-2 bg-primary"
        onClick={() => setSeeTree(!seeTree)}
      >
        <p className="text-2xl px-2">{!seeTree ? "S" : "N"}</p>
      </button>
    </main>
  );
}
