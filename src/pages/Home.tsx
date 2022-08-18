import useSWR from "swr";
import MainLayout from "../layout/MainLayout";
import { getHome } from "nhaccuatui-api-full";
import Slider from "../components/Slider";
import { Song, TopicEvent } from "../model";
import SongItem from "../components/Song/SongItem";
import Banner from "../components/Slider/Banner";
import WrapSong from "../components/Song/WrapSong";
import { HomeData } from "../model/home";
import Error from "../components/Error";
import HomeSkeleton from "../components/Skeleton/HomeSkeleton";

const Home = () => {
  const { data, error } = useSWR("home", (): Promise<HomeData> => {
    return getHome();
  });

  if (error) {
    return <Error />;
  }

  return (
    <MainLayout>
      {!data ? (
        <HomeSkeleton />
      ) : (
        <div className="px-4 w-full">
          <div className="mb-10">
            <Banner banners={data?.showcase} />
          </div>

          <div>
            {data?.topicEvent?.map((item: TopicEvent) => (
              <div key={item.groupName} className="mb-5">
                <h1 className="mb-5 font-semibold text-xl">
                  {item.groupName.split("_")[0]}
                </h1>
                <Slider banners={item.listPlaylist} spacer={20} />
              </div>
            ))}

            <div className="mb-5">
              <h1 className="mb-5 font-semibold text-xl">Mới Phát Hành</h1>
              <Slider banners={data?.newRelease?.song} spacer={20} />
            </div>

            <div className="mb-5">
              <h1 className="mb-5 font-semibold text-xl">Top 100</h1>
              <Slider banners={data?.top100} spacer={20} />
            </div>

            <div className="mb-5">
              <h1 className="mb-5 font-semibold text-xl">Chủ Đề Hot</h1>
              <Slider type="TOPIC" banners={data?.topic} spacer={20} />
            </div>

            <div className="mb-5">
              <h1 className="mb-5 font-semibold text-xl">Video Hot</h1>
              <Slider radio="16/9" banners={data?.video} spacer={20} />
            </div>

            <div className="mb-5">
              <h1 className="mb-5 font-semibold text-xl">Bài Hát</h1>
              <WrapSong songs={data?.song} />
            </div>
          </div>
        </div>
      )}
    </MainLayout>
  );
};

export default Home;
