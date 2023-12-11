"use client";
import Header from "@/components/header";
import AnimatedGraph from "@/components/graph";
import biggerGraph from "@/app/admin/graphFile";
import { useEffect, useState } from "react";
import axios from "axios";
import UploadFile from "@/components/UploadFile";

export default function Admin() {
  const [data, setData] = useState({});
  const [graph, setGraph] = useState({});
  const [nameConv, setNameConv] = useState({});
  const [allSymptons, setAllSymptons] = useState([]);

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
    var graph = [];

    var symptoms = {};
    for (var value of dictData[""]) {
      symptoms[nameConversion(value[0])] = true;
    }

    // nodes
    for (var key in dictData) {
      var node_str = nameConversion(key);
      if (node_str === undefined) node_str = key;
      var type = "";
      if (node_str.length == 0) {
        type = "Root";
      } else {
        type = symptoms[node_str] ? "Symptom" : "Cause";
        type = key.match(".*;.*") !== null ? "Association" : type;
      }

      var node = {};
      node.group = "nodes";
      node.data = {
        id: key.length != 0 ? key : "start",
        displayName: node_str.length != 0 ? node_str : "start",
        type: type,
        kind: "NetworkService",
        visited: "No",
        alarmSeverity: "cleared",
      };
      node.classes = "nodeIcon";
      graph.push(node);
    }

    // edges
    graph.forEach((node) => {
      var key =
        node.data.id === "start" ? "" : node.data.id.replaceAll("_", " ");
      for (var value of dictData[key]) {
        if (value[0] !== "!") {
          var target = value[0].replaceAll(" ", "_");
          value[0] = nameConversion(value[0]);

          var edge = {};
          edge.data = {
            group: "edges",
            label: value[1].toFixed(2).toString(),
            source: node.data.id,
            target: target,
          };
          graph.push(edge);
        }
      }
    });

    return graph;
  };

  useEffect(() => {
    // teste
    axios.get("http://localhost:8000/graph").then((res) => {
      setData(() => res.data.graph);
      setNameConv(() => res.data.nameConv);
      setAllSymptons(() => res.data.allSymptons);
    });
  }, []);

  useEffect(() => {
    if (Object.keys(data).length !== 0) {
      setGraph(dataToGraph(data));
    }
  }, [data]);

  return (
    <main className="w-full h-full bg-bglight">
      <Header title="PAA 4" />
      <div className="flex h-5/6">
        <UploadFile/>
        <div id="cy" className="flex justify-center items-center w-2/4">
          <AnimatedGraph data={graph} setData={setGraph} allowDelete={true} />
        </div>
      </div>
    </main>
  );
}
