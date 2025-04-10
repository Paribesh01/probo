import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import Link from "next/link";

// interface MarketCardProps {
//   id: string;
//   title: string;
//   category: string;
//   yesPrice: number;
//   noPrice: number;
//   yesTrend: number;
//   noTrend: number;
//   endTime: string;
//   isTrending?: boolean;
// }
// interface Trade {
//   id: number;
//   symbol: string;
//   yesPrice: number;
//   noPrice: number;
//   image: string;
// }

const MarketCard = ({
  id,
  symbol,
  category,
  yesPrice,
  //   yesTrend,
  //   noTrend,
  //   endTime,
  isTrending = false,
}: any) => {
  return (
    <Link href={`/market/${symbol}`}>
      <Card className="h-full hover:shadow-lg transition-all duration-200 hover:border-primary/50 overflow-hidden">
        <CardContent className="p-4 md:p-6">
          <div className="flex justify-between items-start mb-4">
            <Badge variant="outline" className="bg-secondary text-foreground">
              {category}
            </Badge>
            {isTrending && (
              <Badge
                variant="outline"
                className="bg-primary/20 text-primary flex items-center gap-1"
              >
                <TrendingUp className="h-3 w-3" />
                Trending
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-medium mb-4 text-balance">{symbol}</h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">YES</p>
              <p className="text-lg font-semibold text-market-yes">
                ${yesPrice.toFixed(2)}
              </p>
              <div className="flex items-center">
                {/* <span
                  className={`text-xs ${
                    yesTrend >= 0 ? "text-market-yes" : "text-market-no"
                  }`}
                >
                  {yesTrend >= 0 ? "+" : ""}
                  {yesTrend}%
                </span> */}
              </div>
            </div>

            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">NO</p>
              <p className="text-lg font-semibold text-market-no">
                ${(10 - yesPrice).toFixed(2)}
              </p>
              <div className="flex items-center">
                {/* <span
                  className={`text-xs ${
                    noTrend >= 0 ? "text-market-yes" : "text-market-no"
                  }`}
                >
                  {noTrend >= 0 ? "+" : ""}
                  {noTrend}%
                </span> */}
              </div>
            </div>
          </div>

          <div className="flex items-center text-xs text-muted-foreground">
            <Clock className="h-3 w-3 mr-1" />
            {/* <span>Closes: {endTime}</span> */}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default MarketCard;
