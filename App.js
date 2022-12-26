import { SafeAreaView } from "react-native";
import Deck from "./src/Deck";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Text, Card, Button, Image } from "@rneui/themed";

const DATA = [
  {
    id: 1,
    text: "Card #1",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/1fbee3150199093.62f8ae934a9a4.jpg.webp?itok=nUEtw71t",
  },
  {
    id: 2,
    text: "Card #2",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_wine-jazz.jpg.webp?itok=bGzactgM",
  },
  {
    id: 3,
    text: "Card #3",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_casper.jpg.webp?itok=68MlSta6",
  },
  {
    id: 4,
    text: "Card #4",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_there-there.jpg.webp?itok=-BLhBSC2",
  },
  {
    id: 5,
    text: "Card #5",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_saio.jpg.webp?itok=saqxS8mr",
  },
  {
    id: 6,
    text: "Card #6",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_guayusa.jpg.webp?itok=qRKsAukI",
  },
  {
    id: 7,
    text: "Card #7",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_locale.jpg.webp?itok=THcdBlFJ",
  },
  {
    id: 8,
    text: "Card #8",
    uri: "https://abduzeedo.com/sites/default/files/styles/max_2600x2600/public/originals/hero_cubism.jpg.webp?itok=DslRxGGq",
  },
];

export default function App() {
  const renderCard = (item) => {
    return (
      <Card key={item.id} title={item.text}>
        <Image
          source={{ uri: item.uri }}
          style={{ width: "100%", height: 200 }}
        />
        <Text style={{ marginVertical: 10 }}>
          I can customize the Card further.
        </Text>
        <Button backgroundColor="#03A9F4" title="View Now!" />
      </Card>
    );
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView>
        <Deck data={DATA} renderCard={renderCard} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
