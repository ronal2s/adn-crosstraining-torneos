import { StyledView } from "@components/styleds/styledView";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import { Image } from "react-native";
import OnboardingVideoContent from "@views/onboarding/onboardingVideo";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import Screens from "@utils/screens";
import { StyledText } from "@components/styleds/styledText";
import onboardingStyles from "@views/onboarding/onboardingStyles";
import OnboardingSignIn from "@views/onboarding/onboardingSignIn";
const logo = require("@assets/logo_white.png");

function OnboardingView() {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const [signInVisible, setSignInVisible] = useState(false);

  const onGetStartedPressed = () => {
    // navigation.replace(ScreensCommons.LOCATION_PERMISSION);
  };

  const openJoinAsTrainer = () => {
    // navigation.navigate(ScreensTrainer.JOIN_STEP_1);
  };

  const toggleSignInView = () => {
    setSignInVisible(!signInVisible);
  };

  const onSkip = () => {
    navigation.replace(Screens.TABS_CONTAINER);
  };

  return (
    <SafeAreaView
      edges={["right", "left"]}
      style={{ backgroundColor: "black" }}
    >
      <OnboardingVideoContent />
      <OnboardingSignIn isVisible={signInVisible} />

      <StyledView style={onboardingStyles.bottomButtons}>
        <Button mode="contained" color="white" onPress={toggleSignInView}>
          {signInVisible ? "Ocultar" : "Iniciar sesión"}
        </Button>
        <Button mode="outlined" color="white" onPress={onSkip}>
          Saltar
        </Button>
      </StyledView>
    </SafeAreaView>
  );
}

export default OnboardingView;
