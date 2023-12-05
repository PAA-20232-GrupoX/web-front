export default [
	{
	  group: "nodes",
	  data: {
		id: "s1.1",
		displayName: "S1",
    type: "Symptom",
		kind: "NetworkService",
		visited: "Yes",
		alarmSeverity: "cleared",
    // probability: "0.8"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s2.1",
		displayName: "S2",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.8"
  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s2.2",
		displayName: "S2",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.4"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s2.3",
		displayName: "S2",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.6"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s3.1",
		displayName: "S3",
    type: "Symptom",
		kind: "TelcoCloudVirtualDevice",
		visited: "No",
		alarmSeverity: "warning",
    probability: "0.5"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s3.2",
		displayName: "S3",
    type: "Symptom",
		kind: "TelcoCloudVirtualDevice",
		visited: "No",
		alarmSeverity: "warning",
    probability: "0.2"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s4.1",
		displayName: "S4",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "critical",
    probability: "0.7"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s4.2",
		displayName: "S4",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "critical",
    probability: "0.45"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s4.3",
		displayName: "S4",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "critical",
    probability: "0.56"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "s4.4",
		displayName: "S4",
    type: "Symptom",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "critical",
    probability: "0.1"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c1.1",
		displayName: "C1",
    type: "Cause",
		kind: "TelcoCloudPhysicalDevice",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.9"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c1.2",
		displayName: "C1",
    type: "Cause",
		kind: "TelcoCloudPhysicalDevice",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.6"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c1.3",
		displayName: "C1",
    type: "Cause",
		kind: "TelcoCloudPhysicalDevice",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.85"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c2.1",
		displayName: "C2",
    type: "Cause",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.71"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c2.2",
		displayName: "C2",
    type: "Cause",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "cleared",
    probability: "0.6"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c3.1",
		displayName: "C3",
    type: "Cause",
		kind: "TelcoCloudPhysicalDevice",
		visited: "No",
		alarmSeverity: "critical",
    probability: "0.6"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c4.1",
		displayName: "C4",
    type: "Cause",
		kind: "VNF",
		visited: "No",
		alarmSeverity: "minor",
    probability: "0.3"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c5.1",
		displayName: "C5",
    type: "Cause",
		kind: "TelcoCloudVirtualDevice",
		visited: "No",
		alarmSeverity: "major",
    probability: "0.5"
	  },
	  classes: "nodeIcon"
	},
	{
	  group: "nodes",
	  data: {
		id: "c5.2",
		displayName: "C5",
    type: "Cause",
		kind: "TelcoCloudVirtualDevice",
		visited: "No",
		alarmSeverity: "major",
    probability: "0.9"
	  },
	  classes: "nodeIcon"
	},
	{ data: { group: "edges", label:"sim", source: "s1.1", target: "s2.1" } },
	{ data: { group: "edges", label:"não", source: "s1.1", target: "s3.1" } },
	{ data: { group: "edges", label:"não sei", source: "s1.1", target: "s4.1" } },
	{ data: { group: "edges", label:"sim", source: "s2.1", target: "c1.1" } },
	{ data: { group: "edges", label:"não", source: "s2.1", target: "s3.2" } },
	{ data: { group: "edges", label:"sim", source: "s3.2", target: "c4.1" } },
	{ data: { group: "edges", label:"não", source: "s3.2", target: "s4.2" } },
	{ data: { group: "edges", label:"sim", source: "s4.2", target: "c3.1" } },
	{ data: { group: "edges", label:"não", source: "s4.2", target: "c1.2" } },
	{ data: { group: "edges", label:"sim", source: "s3.1", target: "s2.2" } },
	{ data: { group: "edges", label:"não", source: "s3.1", target: "s2.3" } },
	{ data: { group: "edges", label:"sim", source: "s2.2", target: "c2.1" } },
	{ data: { group: "edges", label:"não", source: "s2.2", target: "s4.3" } },
	{ data: { group: "edges", label:"sim", source: "s4.3", target: "c5.1" } },
	{ data: { group: "edges", label:"não", source: "s4.3", target: "c2.2" } },
	{ data: { group: "edges", label:"sim", source: "s2.3", target: "s4.4" } },
	{ data: { group: "edges", label:"não", source: "s2.3", target: "s4.1" } },
	{ data: { group: "edges", label:"sim", source: "s4.4", target: "c5.2" } },
	{ data: { group: "edges", label:"sim", source: "s4.4", target: "c1.3" } },
  ];
  