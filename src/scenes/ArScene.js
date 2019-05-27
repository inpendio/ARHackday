import React, { Component } from "react";
import { Platform, StyleSheet, Text, View } from "react-native";
import {
  ViroARScene,
  ViroText,
  ViroMaterials,
  ViroBox,
  Viro3DObject,
  ViroAmbientLight,
  ViroSpotLight,
  ViroARPlane,
  ViroARPlaneSelector,
  ViroQuad,
  ViroNode,
  ViroAnimations,
  ViroConstants,
  ViroARSceneNavigator
} from "react-viro";

ViroMaterials.createMaterials({
  grid: {
    diffuseTexture: require("../../res/grid_bg.jpg")
  }
});

ViroAnimations.registerAnimations({
  rotate: {
    properties: {
      rotateY: "+=90"
    },
    duration: 250 //.25 seconds
  }
});

const instructions = Platform.select({
  ios: "Press Cmd+R to reload,\n" + "Cmd+D or shake for dev menu",
  android:
    "Double tap R on your keyboard to reload,\n" +
    "Shake or press menu button for dev menu"
});

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "test",
      hasARInitialized: false
    };
  }

  _onTrackingUpdated = (state, reason) => {
    // if the state changes to "TRACKING_NORMAL" for the first time, then
    // that means the AR session has initialized!
    console.log(this);
    if (
      !this.state.hasARInitialized &&
      state == ViroConstants.TRACKING_NORMAL
    ) {
      this.setState({
        hasARInitialized: true,
        text: "Hello World!"
      });
    }
  };
  render() {
    return (
      <ViroARScene onTrackingUpdated={this._onTrackingUpdated}>
        <ViroText
          text={this.state.text}
          scale={[0.5, 0.5, 0.5]}
          position={[0, 0, -1]}
          style={styles.helloWorldTextStyle}
        />

        <ViroBox
          position={[0, -0.5, -1]}
          animation={{ name: "rotate", run: true, loop: true }}
          scale={[0.3, 0.3, 0.1]}
          materials={["grid"]}
        />

        <ViroAmbientLight color={"#aaaaaa"} influenceBitMask={1} />

        <ViroSpotLight
          innerAngle={5}
          outerAngle={90}
          direction={[0, -1, -0.2]}
          position={[0, 3, 1]}
          color="#aaaaaa"
          castsShadow={true}
        />

        {/* Node that contains a light, an object and a surface to catch its shadow
            notice that the dragType is "FixedToWorld" so the object can be dragged
            along real world surfaces and points. */}
        <ViroNode
          position={[-0.5, -0.5, -0.5]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={2}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          />

          <Viro3DObject
            source={require("../../res/emoji_smile/emoji_smile.vrx")}
            position={[0, 0.2, 0]}
            scale={[0.2, 0.2, 0.2]}
            type="VRX"
            lightReceivingBitMask={3}
            shadowCastingBitMask={2}
            transformBehaviors={["billboardY"]}
            resources={[
              require("../../res/emoji_smile/emoji_smile_diffuse.png"),
              require("../../res/emoji_smile/emoji_smile_specular.png"),
              require("../../res/emoji_smile/emoji_smile_normal.png")
            ]}
          />

          <ViroQuad
            rotation={[-90, 0, 0]}
            width={0.5}
            height={0.5}
            arShadowReceiver={true}
            lightReceivingBitMask={2}
          />
        </ViroNode>

        {/* Node that contains a light, an object and a surface to catch its shadow
          notice that the dragType is "FixedToWorld" so the object can be dragged
          along real world surfaces and points. */}
        <ViroNode
          position={[0.5, -0.5, -0.5]}
          dragType="FixedToWorld"
          onDrag={() => {}}
        >
          {/* Spotlight to cast light on the object and a shadow on the surface, see
              the Viro documentation for more info on lights & shadows */}
          <ViroSpotLight
            innerAngle={5}
            outerAngle={45}
            direction={[0, -1, -0.2]}
            position={[0, 3, 0]}
            color="#ffffff"
            castsShadow={true}
            influenceBitMask={4}
            shadowMapSize={2048}
            shadowNearZ={2}
            shadowFarZ={5}
            shadowOpacity={0.7}
          />

          <Viro3DObject
            source={require("../../res/object_soccerball/object_soccer_ball.vrx")}
            position={[0, 0.15, 0]}
            scale={[0.3, 0.3, 0.3]}
            type="VRX"
            lightReceivingBitMask={5}
            shadowCastingBitMask={4}
            transformBehaviors={["billboardY"]}
            resources={[
              require("../../res/object_soccerball/object_soccer_ball_diffuse.png"),
              require("../../res/object_soccerball/object_soccer_ball_normal.png"),
              require("../../res/object_soccerball/object_soccer_ball_specular.png")
            ]}
          />
          <ViroQuad
            rotation={[-90, 0, 0]}
            width={0.5}
            height={0.5}
            arShadowReceiver={true}
            lightReceivingBitMask={4}
          />
        </ViroNode>
      </ViroARScene>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  welcome: {
    fontSize: 20,
    textAlign: "center",
    margin: 10
  },
  arView: {
    flex: 1
  },
  instructions: {
    textAlign: "center",
    color: "#333333",
    marginBottom: 5
  }
});
