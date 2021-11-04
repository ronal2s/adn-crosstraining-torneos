import { StyledView } from "@components/styleds/styledView";
import { useNavigation } from "@react-navigation/core";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";

function HomeView() {
  const navigation = useNavigation<StackNavigationProp<any>>();

  return (
    <StyledView>
      <StyledView></StyledView>
    </StyledView>
  );
}

export default HomeView;
