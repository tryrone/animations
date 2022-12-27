import React from "react";
import SortableList from "./components/SortableList";
import Tile from "./components/Tile";

const tiles = [
  {
    id: "facebook",
    url: "https://facebook.com",
  },
  {
    id: "reanimated",
    url: "https://docs.swmansion.com/react-native-reanimated",
  },
  {
    id: "github",
    url: "https://github.com",
  },
  {
    id: "rnnavigation",
    url: "https://reactnavigation.org",
  },
  {
    id: "youtube",
    url: "https://www.youtube.com",
  },
  {
    id: "google",
    url: "https://google.com",
  },
  {
    id: "twitter",
    url: "https://twitter.com",
  },
  {
    id: "snapchat",
    url: "https://www.snapchat.com/en-GB",
  },
  {
    id: "logrocket",
    url: "https://logrocket.com/",
  },
  {
    id: "9anime",
    url: "https://9anime.vc/",
  },
];

export default function DragToSort() {
  return (
    <SortableList>
      {[...tiles, ...tiles].map((tile, index) => (
        <Tile
          onLongPress={() => true}
          key={tile?.id + "-" + index}
          id={tile?.id + "-" + index}
          uri={tile?.url}
        />
      ))}
    </SortableList>
  );
}
