import { ArrowRight, Award, Trophy, Users } from "lucide-react";

import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full   bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    India’s Leading Online Skill Gaming Platform{" "}
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Sports, Entertainment, Economy or Finance.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <a href="#">
                    <Button size="lg" className="gap-1.5">
                      Download App
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </a>
                  <a href="/trade">
                    <Button size="lg" variant="outline">
                      Trade Online
                    </Button>
                  </a>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>10M+ Traders</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Trophy className="h-4 w-4" />
                    <span>₹100Cr+ Won</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Award className="h-4 w-4" />
                    <span>100% Legal</span>
                  </div>
                </div>
              </div>

              <div className="relative  w-full">
                <img
                  src="https://probo.in/_next/image?url=https%3A%2F%2Fd39axbyagw7ipf.cloudfront.net%2Fimages%2Fhome%2Fheader%2Fheader-23012025.webp&w=1200&q=75"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>

        <section className="w-full bg-black opacity-80  ">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-[1fr_400px] lg:gap-40 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl text-white font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Samachar Vichaar Vyapaar{" "}
                  </h1>
                  <p className="max-w-[600px] text-white text-muted-foreground md:text-xl">
                    Enhance your knowledge and apply your insights to engage
                    with real-world events.{" "}
                  </p>
                </div>
              </div>

              <div className="relative  w-full ">
                <img
                  className=" rounded-2xl h-[500px] "
                  src="https://is1-ssl.mzstatic.com/image/thumb/PurpleSource112/v4/9e/1d/87/9e1d8799-6ef9-cb2c-af12-f62e52b31ce8/9e5840cf-6c2b-49e0-afa9-36c5d9fb7afd_2.png/750x750bb.jpeg"
                  alt=""
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
