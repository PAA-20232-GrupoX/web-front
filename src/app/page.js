"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import Header from "@/components/header";
import Quiz from "@/components/quiz";
import AnimatedGraph from "@/components/graph";
import AnimatedTree from "@/components/tree";
import axios from "axios";

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
  const [nameConv, setNameConv] = useState({});
  const [allSymptoms, setallSymptoms] = useState([]);

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
      if (ids.every((e) => allSymptoms.includes(e))) {
        return "Symptom";
      }
      // if all ids are causes
      if (ids.every((e) => !allSymptoms.includes(e))) {
        return "Cause";
      }
    }
    if (allSymptoms.includes(id)) {
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
        setNameConv(res.data.nameConv);
        setallSymptoms(res.data.allSymptoms);
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
      setNameConv(res.data.nameConv);
      setallSymptoms(res.data.allSymptoms);

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
