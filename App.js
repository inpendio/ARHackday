import React from "react";
import {
  /* ViroVRSceneNavigator, */
  ViroARSceneNavigator
} from "react-viro";

import { ArScene } from "./src";

/*
 * TODO: Add your API key below!!
 */
const apiKey = "B0C6B3B5-84AC-4CFA-BDEE-1EF0E890E631";

export default function App() {
  console.log("App function.");
  return (
    <ViroARSceneNavigator
      initialScene={{
        scene: ArScene
      }}
      apiKey={apiKey}
    />
  );
}
