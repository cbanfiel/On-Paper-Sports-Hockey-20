import * as FileSystem from "./FileSystem";
import * as StoreReview from "expo-store-review";
import { Platform, Alert } from "react-native";

export const requestReview = (appName) => {
  FileSystem.loadFromFileSystem(FileSystem.FILES.SETTINGS, settings => {
    if (!settings.reviewRequestShown) {
      if (Platform.OS === "ios") {
        displayRatingAlert(appName, settings);
      }
    }
  })
};

const updateSettings = (settings) => {
  settings.reviewRequestShown = true;
  FileSystem.saveToFileSystem(FileSystem.FILES.SETTINGS, settings);
};

const displayRatingAlert = (appName, settings) => {
  Alert.alert(
    `Rate ${appName}`,
    `Would you mind spending a moment to rate ${appName}?`,
    [
      {
        text: "Don't Ask Again",
        onPress: () => {
          updateSettings(settings);
        },
      },
      {
        text: "Remind Me Later",
        onPress: () => {},
      },
      {
        text: "Rate Now!",
        onPress: () => {
          updateSettings(settings);
          StoreReview.requestReview();
        },
      },
    ]
  );
};
