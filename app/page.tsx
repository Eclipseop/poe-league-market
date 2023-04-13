import { Line, Root } from "@/types/poe-ninja";
import LeagueData from "../public/LeagueData.json";
import { LeagueDataType } from "@/types/cringe";

const leagueData = LeagueData as LeagueDataType[];

const urls = [
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Scarab&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueWeapon&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueArmour&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueAccessory&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=DivinationCard&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Artifact&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Oil&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueFlask&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueJewel&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=SkillGem&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=ClusterJewel&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Map&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=BlightedMap&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=BlightRavagedMap&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=UniqueMap&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=DeliriumOrb&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Invitation&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=BaseType&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Fossil&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Resonator&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Beast&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Essence&language=en",
  "https://poe.ninja/api/data/itemoverview?league=Crucible&type=Vial&language=en",
  "https://poe.ninja/api/data/currencyoverview?league=Crucible&type=Fragment&language=en",
  "https://poe.ninja/api/data/currencyoverview?league=Crucible&type=Currency&language=en",
];

const getData = async () => {
  const promises: Promise<Root>[] = urls.map((url) =>
    fetch(url).then((data) => data.json())
  );

  const data: Root[] = await Promise.all(promises);
  const lines: Line[] = [];
  data.flatMap((val) => val.lines).forEach((l) => lines.push(l));
  return lines;
};

const LeagueItems = ({
  leagueData,
  data,
}: {
  leagueData: LeagueDataType;
  data: Line[];
}) => {
  return (
    <div className="rounded border p-3">
      <h1 className="font-black">{leagueData.league}</h1>
      {leagueData.items
        .sort((a, b) => {
          const aPrice = getPrice(a, data);
          const bPrice = getPrice(b, data);
          return bPrice - aPrice;
        })
        .slice(0, 10)
        .map((i, idx) => (
          <p key={`price ${idx}`}>
            {i} - {getPrice(i, data)}c
          </p>
        ))}
    </div>
  );
};

const getPrice = (item: string, data: Line[]): number => {
  let itemData = data.find((p) => p.name === item);
  if (!itemData) itemData = data.find((p) => p.currencyTypeName === item);

  if (itemData?.chaosEquivalent) {
    return itemData.chaosEquivalent;
  }
  return itemData?.chaosValue ?? 0;
};

const Home = async () => {
  const data = await getData();

  return (
    <div className="grid grid-cols-3 gap-3">
      {leagueData.map((ld, idx) => (
        <LeagueItems key={idx} leagueData={ld} data={data} />
      ))}
    </div>
  );
};

export default Home;
