import { colors } from "./colors";

export const nodes:any = [];
export const links:any = [];

const MAIN_NODE_SIZE = 40;
const CHILD_NODE_SIZE = 15;
const LEAF_NODE_SIZE = 5;
const DEFAULT_DISTANCE = 20;
const MAIN_NODE_DISTANCE = 90;
const LEAF_NODE_DISTANCE = 30;
export const MANY_BODY_STRENGTH = -20;

let i = 0;

const addMainNode = (node:any) => {
  node.size = MAIN_NODE_SIZE;
  node.color = colors[i++][1];
  nodes.push(node);
};

const addChildNode = (
  parentNode:any,
  childNode:any,
  size = CHILD_NODE_SIZE,
  distance = DEFAULT_DISTANCE
) => {
  childNode.size = size;
  childNode.color = parentNode.color;
  nodes.push(childNode);
  links.push({
    source: parentNode,
    target: childNode,
    distance,
    color: parentNode.color,
  });
};

const assembleChildNode = (parentNode:any, id:any, numLeaves = 20) => {
  const childNode = { id };
  addChildNode(parentNode, childNode);

  for (let i = 0; i < numLeaves; i++) {
    addChildNode(childNode, { id: "" }, LEAF_NODE_SIZE, LEAF_NODE_DISTANCE);
  }
};

const connectMainNodes = (source: any, target: any) => {
  links.push({
    source,
    target,
    distance: MAIN_NODE_DISTANCE,
    color: source.color,
  });
};

const artsWeb = { id: "Arts Web" };
addMainNode(artsWeb);
assembleChildNode(artsWeb, "Community Vision");
assembleChildNode(artsWeb, "Silicon Valley Creates");

const socialImpactCommons = { id: "Social Impact Commons" };
addMainNode(socialImpactCommons);
assembleChildNode(socialImpactCommons, "Theatre Bay Area");
assembleChildNode(socialImpactCommons, "EastSide Arts Alliance");
assembleChildNode(socialImpactCommons, "Local Color");

const cast = { id: "Community Arts Stabilization Trust" };
addMainNode(cast);
assembleChildNode(cast, "CounterPulse");
assembleChildNode(cast, "Luggage Store Gallery");
assembleChildNode(cast, "Performing Arts Workshop");
assembleChildNode(cast, "447 Minna St.", 5);
assembleChildNode(cast, "Keeping Space Oakland");

const ambitioUS = { id: "AmbitioUS" };
addMainNode(ambitioUS);
assembleChildNode(ambitioUS, "EBPREC");
assembleChildNode(ambitioUS, "SELC", 3);
assembleChildNode(ambitioUS, "The Runway Project", 3);
assembleChildNode(ambitioUS, "Common Future", 3);
assembleChildNode(ambitioUS, "Freelancers Union", 3);
assembleChildNode(ambitioUS, "US Federation of Worker Cooperatives", 3);

connectMainNodes(artsWeb, socialImpactCommons);
connectMainNodes(artsWeb, cast);
connectMainNodes(socialImpactCommons, cast);
connectMainNodes(ambitioUS, cast);
connectMainNodes(ambitioUS, socialImpactCommons);
connectMainNodes(ambitioUS, artsWeb);
