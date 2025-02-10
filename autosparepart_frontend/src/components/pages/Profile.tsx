import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { fetchAddresses } from "@/features/address/addressSlice";
import { keycloak } from "@/features/auth/authSlice";
import { fetchFavorites } from "@/features/favorite/favoriteSlice";
import { fetchAllOrders } from "@/features/order/orderSlice";
import { fetchUserProfile } from "@/features/user/userSlice";
import { Bell, CreditCard, Heart, Plus, ShoppingBag } from "lucide-react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import ProfileAddressesList from "../ProfileAddressesList";
import ProfileOrdersList from "../ProfileOrdersList";

// export enum OrderStatus {
//   COMPLETED = "COMPLETED",
//   PENDING = "PENDING",
//   DELIVERED = "DELIVERED",
//   PROCESSING = "PROCESSING",
// }

const EcommerceProfile = () => {
  const dispatch = useAppDispatch();
  const { items: addresses } = useAppSelector((state) => state.addresses);
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const { item: userProfile } = useAppSelector((state) => state.users);
  const { items: orders } = useAppSelector((state) => state.order);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAddresses());
      dispatch(fetchFavorites());
      dispatch(fetchUserProfile());
      dispatch(fetchAllOrders());
    }
  }, [dispatch, isAuthenticated, addresses.length, orders.length]);

  console.log("ORDERS: ", orders);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card className="w-full sm:w-96">
          <CardContent className="p-6">
            <h1 className="text-2xl font-bold mb-4">Please Sign In</h1>
            <p className="text-gray-600 mb-4">
              You need to be signed in to access your profile.
            </p>
            <Button onClick={() => keycloak.login()}>Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-300 to-indigo-100 p-4">
      <div className="max-w-6xl mx-auto">
        {/* Profile Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage
                  src="/api/placeholder/150/150"
                  alt="Profile picture"
                />
                <AvatarFallback className="h-24 w-24 bg-gray-100 flex items-center justify-center text-gray-500 text-2xl font-semibold">
                  {userProfile.firstName?.slice(0, 2).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-2xl font-bold">{userProfile.email}</h1>
                <p className="text-gray-600">
                  Member since {userProfile.createdDate?.split("T")[0]}
                </p>
                <div className="flex flex-wrap justify-center md:justify-start gap-4">
                  <span className="inline-flex items-center px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
                    Premium Member
                  </span>
                  <span className="inline-flex items-center px-3 py-1 bg-gold-100 text-amber-800 rounded-full text-sm">
                    Gold Tier
                  </span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <Button>
                  <ShoppingBag className="h-4 w-4 mr-2" />

                  <Link to="/products">Continue Shopping</Link>
                </Button>
                <Button variant="outline">
                  <Bell className="h-4 w-4 mr-2" />
                  Notifications
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="orders" className="space-y-6">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="orders">Orders</TabsTrigger>
            <TabsTrigger value="addresses">Addresses</TabsTrigger>
            <TabsTrigger value="payments">Payment Methods</TabsTrigger>
            <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Orders Tab */}
          <TabsContent value="orders">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Recent Orders</CardTitle>
                  <Button variant="ghost">View All Orders</Button>
                </div>
              </CardHeader>
              <CardContent>
                <ProfileOrdersList orders={orders} />
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <ProfileAddressesList addresses={addresses} />
          </TabsContent>

          {/* Payment Methods Tab */}
          <TabsContent value="payments">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2].map((i) => (
                <Card key={i}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="h-5 w-5" />
                          <span className="font-semibold">
                            •••• •••• •••• {i === 1 ? "4242" : "8888"}
                          </span>
                        </div>
                        <p className="text-gray-600">Expires 0{i}/2025</p>
                        {i === 1 && (
                          <span className="inline-block text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                            Default
                          </span>
                        )}
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button className="h-full min-h-[150px]" variant="outline">
                <Plus className="h-6 w-6 mr-2" />
                Add New Payment Method
              </Button>
            </div>
          </TabsContent>

          {/* Wishlist Tab */}
          <TabsContent value="wishlist">
            <Card>
              <CardContent className="p-6">
                {favorites.length !== 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favorite) => (
                      <Card key={favorite.productId}>
                        <CardContent className="p-4">
                          <img
                            src={favorite.productImageUrl}
                            className="mb-2"
                            alt="picture"
                          />
                          <h3 className="font-semibold">
                            Product Name: {favorite.productName}
                          </h3>
                          <p className="text-gray-600 mb-4">
                            ${(99.99 * favorite.productPrice).toFixed(2)}
                          </p>
                          <div className="flex space-x-2">
                            <Button className="flex-1">Add to Cart</Button>
                            <Button variant="outline" size="icon">
                              <Heart className="h-4 w-4 text-red-500 fill-red-500" />
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="flex justify-center text-lg text-slate-400">
                    No products added to wishlist
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue={userProfile.firstName} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue={userProfile.email}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input id="phone" defaultValue="(555) 123-4567" />
                </div>
                <div className="space-y-2">
                  <Label>Email Preferences</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Order Updates</p>
                        <p className="text-sm text-gray-600">
                          Receive updates about your orders
                        </p>
                      </div>
                      <Button variant="outline">Enabled</Button>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium">Promotions</p>
                        <p className="text-sm text-gray-600">
                          Receive deals and promotional offers
                        </p>
                      </div>
                      <Button variant="outline">Disabled</Button>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end space-x-2">
                  <Button variant="outline">Cancel</Button>
                  <Button>Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default EcommerceProfile;
