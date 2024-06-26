import TabBar from "@/components/tabBar";
import Top10Movies from "@/components/top10";
import UpcomingMovies from "@/components/upcoming";

export default function Home() {
  return (
    <div className="flex flex-col mb-10">
      <TabBar />
    </div>
  );
}
