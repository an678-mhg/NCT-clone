import React, { FC, useContext } from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { PlayerContext } from "../../context/PlayerContext";
import { Item } from "../../model";

interface SongItemProps {
  item: Item;
}

const SongItem: FC<SongItemProps> = ({ item }) => {
  const { setSongId } = useContext(PlayerContext);

  return (
    <div
      className="flex items-start p-2 rounded-md hover:bg-gray-200 transition-colors cursor-pointer"
      onClick={() => setSongId(item.key)}
    >
      <div className="w-[54px] h-[54px] shadow-md">
        <LazyLoadImage
          src={
            item.thumbnail ||
            "https://thumbs.dreamstime.com/b/no-image-available-icon-vector-illustration-flat-design-140476186.jpg"
          }
          alt={item.title}
          width="100%"
          height="100%"
          className="rounded-md"
          effect="blur"
        />
      </div>
      <div className="ml-4 flex-1">
        <p className="font-semibold line-clamp-1 text-sm">{item.title}</p>
        <div className="flex items-center gap-2 text-xs w-full mt-1">
          {
            <p className="rounded-sm line-clamp-1 text-gray-400">
              {item.artists.map((item) => item.name).join(", ")}
            </p>
          }
        </div>
      </div>
    </div>
  );
};

export default SongItem;
