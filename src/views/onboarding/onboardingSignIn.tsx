import MyCard from "@components/card/card";
import MobileInput from "@components/mobile/mobile";
import ModalVerifyOTP from "@components/mobile/modalOTP";
import { StyledSpacer } from "@components/styleds/styledSpacer";
import { StyledTitle } from "@components/styleds/styledTitle";
import { StyledView } from "@components/styleds/styledView";
import * as FirebaseRecaptcha from "expo-firebase-recaptcha";
import { firebaseConfig } from "@utils/config";

import colors from "@utils/colors/colors";
import constants from "@utils/constants";
import helpers from "@utils/helpers";
import React, { useRef, useState } from "react";
import { Button } from "react-native-paper";
import { Alert } from "react-native";
import AuthController from "@controllers/authController";
import { saveKeyValue } from "@services/secureStorage";
import { SecureStorageKey } from "@utils/secureKeys";

function OnboardingSignIn() {
  const refCaptchaVerifier = useRef(null);
  const [modal, setModal] = useState(false);

  const [mobile, setMobile] = React.useState({
    areaCode: "+1",
    number: "8293733603",
  });
  const fullPhoneNumber = mobile.areaCode + mobile.number;

  const onChangeMobile = (mobile: { areaCode: string; number: string }) => {
    setMobile(mobile);
  };

  const sendOTPCode = async () => {
    if (!mobile.number || !mobile.areaCode) {
      Alert.alert("El teléfono es obligatorio");
      return;
    }

    try {
      const response = await AuthController.sendOTPCode({
        phoneNumber: fullPhoneNumber,
        recaptchaVerifier: refCaptchaVerifier,
      });

      if (response) {
        saveKeyValue(SecureStorageKey.verificationId, response);
        setModal(true);
        // Alert.alert(`Un código ha sido enviado a ${fullPhoneNumber}`);
      }
    } catch (error) {
      console.log(error);
      Alert.alert("Ha ocurrido un error enviando el código de verificación");
    }
  };

  return (
    <StyledView
      position="absolute"
      justifyContent="center"
      alignItems="center"
      height={"100%"}
      width={"100%"}
    >
      <MyCard
        color={CARD_COLOR}
        shadowColor={CARD_SHADOW_COLOR}
        width={helpers.screen.width / 1.2}
      >
        <StyledTitle
          color={colors.white}
          style={{ opacity: 0.8 }}
          fontSize={42}
          fontWeight="300"
          textAlign="center"
        >
          Iniciar
        </StyledTitle>

        <StyledSpacer height={constants.margin} />
        <MobileInput defaultValue={mobile} onChange={onChangeMobile} />
        <StyledSpacer />
        <Button
          mode="contained"
          style={{
            opacity: 0.7,
            backgroundColor: colors.white,
          }}
          onPress={sendOTPCode}
        >
          Iniciar sesión
        </Button>
        <StyledSpacer />
        <StyledTitle
          color={colors.white}
          fontSize={12}
          fontWeight="200"
          textAlign="center"
        >
          ADN Crosstraining
        </StyledTitle>
      </MyCard>
      <ModalVerifyOTP
        isVisible={modal}
        onSwipe={() => setModal(false)}
        resendOTP={sendOTPCode}
      />
      <FirebaseRecaptcha.FirebaseRecaptchaVerifierModal
        ref={refCaptchaVerifier}
        firebaseConfig={firebaseConfig}
        // attemptInvisibleVerification={true}
      />
    </StyledView>
  );
}

const CARD_COLOR = "rgba(0,0,0,0.5)";
const CARD_SHADOW_COLOR = "rgba(0,0,0,0.5)";

export default OnboardingSignIn;
