"use client";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowDown, ArrowUp, Settings } from "lucide-react";

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("ongoing");

  return (
    <>
      <div className="container py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Profile Info Column */}
          <div className="md:w-1/3">
            <Card>
              <CardHeader>
                <CardTitle>Profile</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center text-center">
                  <div className="h-24 w-24 rounded-full bg-primary/20 mb-4 overflow-hidden">
                    {/* Avatar placeholder */}
                    <div className="h-full w-full flex items-center justify-center text-primary font-bold text-2xl">
                      JD
                    </div>
                  </div>
                  <h2 className="text-xl font-bold mb-1">John Doe</h2>
                  <p className="text-muted-foreground text-sm mb-4">@johndoe</p>

                  <div className="grid grid-cols-3 w-full gap-2 mb-6">
                    <div className="text-center p-2">
                      <p className="text-sm text-muted-foreground">Balance</p>
                      <p className="font-semibold">$2,458</p>
                    </div>
                    <div className="text-center p-2">
                      <p className="text-sm text-muted-foreground">Win Rate</p>
                      <p className="font-semibold">68%</p>
                    </div>
                    <div className="text-center p-2">
                      <p className="text-sm text-muted-foreground">Trades</p>
                      <p className="font-semibold">73</p>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2"
                  >
                    <Settings className="h-4 w-4" />
                    Edit Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-4">
              <CardHeader>
                <CardTitle>Wallet</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <p className="text-sm text-muted-foreground mb-1">
                    Available Balance
                  </p>
                  <p className="text-2xl font-bold">$2,458.00</p>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <Button>Deposit</Button>
                  <Button variant="outline">Withdraw</Button>
                </div>

                <div className="mt-6">
                  <h4 className="text-sm font-medium mb-2">
                    Recent Transactions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-green-500/20 flex items-center justify-center mr-2">
                          <ArrowDown className="h-4 w-4 text-market-yes" />
                        </div>
                        <span>Deposit</span>
                      </div>
                      <span className="font-medium">+$500.00</span>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <div className="flex items-center">
                        <div className="w-8 h-8 rounded-full bg-red-500/20 flex items-center justify-center mr-2">
                          <ArrowUp className="h-4 w-4 text-market-no" />
                        </div>
                        <span>Withdrawal</span>
                      </div>
                      <span className="font-medium">-$120.00</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Column */}
          <div className="md:w-2/3">
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="w-full"
            >
              <TabsList className="w-full justify-start mb-6 bg-secondary">
                <TabsTrigger value="ongoing">Ongoing Trades</TabsTrigger>
                <TabsTrigger value="history">Trade History</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              {/* Ongoing Trades Tab */}
              <TabsContent value="ongoing" className="space-y-4">
                <h2 className="text-xl font-bold mb-4">
                  Your Active Positions
                </h2>

                {/* Market 1 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-secondary">
                            Politics
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Closes Apr 15, 2024
                          </span>
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Will the Federal Reserve cut interest rates in Q2
                          2024?
                        </h3>
                        <div className="flex items-center">
                          <Badge className="bg-market-yes text-white">
                            YES Position
                          </Badge>
                          <span className="ml-2 text-sm">
                            50 shares @ $0.65 ={" "}
                            <span className="font-medium">$32.50</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-right mb-2">
                          <p className="text-sm text-muted-foreground">
                            Current Value
                          </p>
                          <p className="text-xl font-bold text-market-yes">
                            $41.00
                          </p>
                        </div>
                        <span className="text-market-yes text-sm">+26.2%</span>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            Sell Position
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Market 2 */}
                <Card>
                  <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row justify-between">
                      <div className="mb-4 md:mb-0">
                        <div className="flex items-center gap-2 mb-2">
                          <Badge variant="outline" className="bg-secondary">
                            Sports
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            Closes Apr 12, 2024
                          </span>
                        </div>
                        <h3 className="text-lg font-medium mb-2">
                          Will Lakers win against Celtics in the next game?
                        </h3>
                        <div className="flex items-center">
                          <Badge className="bg-market-no text-white">
                            NO Position
                          </Badge>
                          <span className="ml-2 text-sm">
                            75 shares @ $0.40 ={" "}
                            <span className="font-medium">$30.00</span>
                          </span>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <div className="text-right mb-2">
                          <p className="text-sm text-muted-foreground">
                            Current Value
                          </p>
                          <p className="text-xl font-bold text-market-no">
                            $25.50
                          </p>
                        </div>
                        <span className="text-market-no text-sm">-15.0%</span>
                        <div className="mt-2">
                          <Button size="sm" variant="outline">
                            Sell Position
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Trade History Tab */}
              <TabsContent value="history">
                <h2 className="text-xl font-bold mb-4">Your Trade History</h2>
                <Card>
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 font-medium">Market</th>
                        <th className="text-left p-4 font-medium">Position</th>
                        <th className="text-left p-4 font-medium">Outcome</th>
                        <th className="text-left p-4 font-medium">P/L</th>
                        <th className="text-left p-4 font-medium">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              Will Twitter change its algorithm in Q1 2024?
                            </p>
                            <span className="text-xs text-muted-foreground">
                              Technology
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-market-yes text-white">
                            YES
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className="bg-market-yes/20 text-market-yes"
                          >
                            Won
                          </Badge>
                        </td>
                        <td className="p-4 text-market-yes">+$124.50</td>
                        <td className="p-4 text-muted-foreground">
                          Mar 30, 2024
                        </td>
                      </tr>

                      <tr className="border-b border-border">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              Will SpaceX launch Starship successfully in March?
                            </p>
                            <span className="text-xs text-muted-foreground">
                              Space
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-market-no text-white">NO</Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className="bg-market-no/20 text-market-no"
                          >
                            Lost
                          </Badge>
                        </td>
                        <td className="p-4 text-market-no">-$45.00</td>
                        <td className="p-4 text-muted-foreground">
                          Mar 25, 2024
                        </td>
                      </tr>

                      <tr className="border-b border-border">
                        <td className="p-4">
                          <div>
                            <p className="font-medium">
                              Will Apple release a new iPhone model in Q2?
                            </p>
                            <span className="text-xs text-muted-foreground">
                              Technology
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge className="bg-market-no text-white">NO</Badge>
                        </td>
                        <td className="p-4">
                          <Badge
                            variant="outline"
                            className="bg-market-yes/20 text-market-yes"
                          >
                            Won
                          </Badge>
                        </td>
                        <td className="p-4 text-market-yes">+$87.20</td>
                        <td className="p-4 text-muted-foreground">
                          Mar 15, 2024
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </Card>
              </TabsContent>

              {/* Settings Tab */}
              <TabsContent value="settings">
                <h2 className="text-xl font-bold mb-4">Account Settings</h2>

                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Profile Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Display Name
                        </label>
                        <input
                          type="text"
                          defaultValue="John Doe"
                          className="w-full px-3 py-2 rounded-md border border-border bg-secondary"
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium mb-1 block">
                          Email
                        </label>
                        <input
                          type="email"
                          defaultValue="john@example.com"
                          className="w-full px-3 py-2 rounded-md border border-border bg-secondary"
                        />
                      </div>
                      <Button className="w-fit">Save Changes</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="mb-4">
                  <CardHeader>
                    <CardTitle>Notifications</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Email Notifications</h4>
                          <p className="text-sm text-muted-foreground">
                            Receive updates about your account via email
                          </p>
                        </div>
                        <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                          <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Market Resolutions</h4>
                          <p className="text-sm text-muted-foreground">
                            Get notified when your markets are resolved
                          </p>
                        </div>
                        <div className="h-6 w-11 bg-primary rounded-full relative cursor-pointer">
                          <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium">Price Alerts</h4>
                          <p className="text-sm text-muted-foreground">
                            Notify me about significant market price movements
                          </p>
                        </div>
                        <div className="h-6 w-11 bg-muted rounded-full relative cursor-pointer">
                          <div className="h-5 w-5 bg-muted-foreground rounded-full absolute left-0.5 top-0.5"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>KYC Verification</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center mb-4">
                      <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center mr-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-market-yes"
                        >
                          <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                      </div>
                      <div>
                        <h4 className="font-medium">Verification Complete</h4>
                        <p className="text-sm text-muted-foreground">
                          Your account is fully verified
                        </p>
                      </div>
                    </div>
                    <Button variant="outline">View Verification Details</Button>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePage;
