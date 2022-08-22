import React, { FC, memo } from "react";
import { GrClose } from "react-icons/gr";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Song } from "../../model";
import { imgNotFound } from "../../utils/contants";
import ListSong from "./ListSong";

interface PlayerThumnailProps {
  setPlayer: Function;
  thumbnail: string;
  title: string;
  artists: string;
  showListSong: boolean;
  setCurrentIndexMemo: Function;
  songMemo: Song[];
}

const PlayerThumnail: FC<PlayerThumnailProps> = ({
  setPlayer,
  title,
  thumbnail,
  artists,
  showListSong,
  setCurrentIndexMemo,
  songMemo,
}) => {
  return (
    <div
      className={`bg-[rgba(28,30,32,0.02)] rounded-md mb-10 relative ${
        showListSong && "h-full"
      }`}
    >
      {showListSong ? (
        <ListSong setCurrentIndex={setCurrentIndexMemo} songIds={songMemo} />
      ) : (
        <div>
          <div className="w-full flex justify-center pt-4 md:hidden">
            <GrClose onClick={() => setPlayer()} className="w-5 h-5" />
          </div>

          <div className="p-4">
            <div className="w-full aspect-auto">
              <LazyLoadImage
                className="rounded-md border"
                src={thumbnail || imgNotFound}
                effect="blur"
              />
            </div>

            <div className="mt-5">
              <h1 className="font-semibold line-clamp-1">{title}</h1>
              <p className="text-sm text-gray-400 font-normal line-clamp-1">
                {artists}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default memo(PlayerThumnail);
