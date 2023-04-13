import { LeagueDataType } from "@/types/cringe";
import { Line } from "@/types/poe-ninja";

type LeagueInfoProps = {
  leagueData: LeagueDataType;
  priceData: Line[];
};

const getPrice = (item: string, data: Line[]): number => {
  let itemData = data.find((p) => p.name === item);
  if (!itemData) itemData = data.find((p) => p.currencyTypeName === item);

  if (itemData?.chaosEquivalent) {
    return itemData.chaosEquivalent;
  }
  return itemData?.chaosValue ?? 0;
};

const LeagueInfo = ({ leagueData, priceData }: LeagueInfoProps) => {
  return (
    <div className="flex flex-col rounded border p-3">
      <h1 className="text-lg font-black">{leagueData.league}</h1>
      {leagueData.items
        .sort((a, b) => {
          const aPrice = getPrice(a, priceData);
          const bPrice = getPrice(b, priceData);
          return bPrice - aPrice;
        })
        .slice(0, 10)
        .map((i, idx) => (
          <a
            className="transition duration-200 hover:text-gray-400"
            key={`price ${idx}`}
            target="blank"
            href={`https://www.poewiki.net/wiki/${i.replaceAll(" ", "_")}`}
          >
            {i} - {getPrice(i, priceData)}c
          </a>
        ))}
    </div>
  );
};

export default LeagueInfo;
