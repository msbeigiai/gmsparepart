import { useAppDispatch, useAppSelector } from "@/app/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { addAddress, deleteAddress, fetchAddresses, updateAddress } from "@/features/address/addressSlice";
import { keycloak } from "@/features/auth/authSlice";
import { fetchFavorites } from "@/features/favorite/favoriteSlice";
import {
  Bell,
  CreditCard,
  ExternalLink,
  Heart,
  Minus,
  Package,
  Plus,
  ShoppingBag,
} from "lucide-react";
import { useEffect, useState } from "react";
import AddressForm from "../AddressForm";
import { Address } from "@/types";

const EcommerceProfile = () => {
  const dispatch = useAppDispatch();
  const { items: addresses } = useAppSelector((state) => state.addresses);
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  const { items: favorites } = useAppSelector((state) => state.favorites);
  const [newAddress, setNewAddress] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address>();

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchAddresses());
      dispatch(fetchFavorites());
    }
  }, [dispatch, isAuthenticated, addresses.length]);

  const handleEditAddress = (address: Address) => {
    setEditingAddress(address);
  };

  const handleNewAddress = () => {
    setNewAddress(!newAddress);
  };

  const handleDeleteAddress = (addressId: number) => {
    dispatch(deleteAddress({ addressId }));
  };

  const handleFormSubmit = (values) => {
    if (editingAddress) {
      dispatch(updateAddress({addressId: editingAddress.addressId, ...values}));
      setEditingAddress(null);
    } else {
      dispatch(addAddress({request: values}))
    }
  };

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
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-100 to-indigo-100 p-4">
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
                <AvatarFallback>JD</AvatarFallback>
              </Avatar>

              <div className="flex-1 text-center md:text-left space-y-2">
                <h1 className="text-2xl font-bold">{user!["email"]}</h1>
                <p className="text-gray-600">Member since January 2024</p>
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
                  Continue Shopping
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
                {[1, 2, 3].map((i) => (
                  <div key={i} className="border-b last:border-0 py-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="h-16 w-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Package className="h-8 w-8 text-gray-500" />
                        </div>
                        <div>
                          <p className="font-medium">Order #{2024000 + i}</p>
                          <p className="text-sm text-gray-600">
                            Placed on March {i}, 2024
                          </p>
                          <span className="inline-flex items-center px-2 py-1 mt-1 bg-green-100 text-green-800 text-xs rounded-full">
                            Delivered
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium">$149.99</p>
                        <Button variant="ghost" size="sm" className="mt-2">
                          View Details
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {addresses.map((address) => (
                <Card key={address.addressId}>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold mb-2">
                          {address.addressId === 1 ? "Home" : "Office"}
                          {address.addressId && (
                            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              Default
                            </span>
                          )}
                        </h3>
                        <p className="text-gray-600">{address.addressLine1}</p>
                        <p className="text-gray-600">{address.city}</p>
                        <p className="text-gray-600">{address.country}</p>
                        <p className="text-gray-600">
                          Phone: {address.postalCode}
                        </p>
                      </div>
                      <div className="space-x-2">
                        <Button variant="ghost" size="sm" onClick={()=>handleEditAddress(address)}>
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteAddress(address.addressId)}
                        >
                          Delete
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
              <Button
                className="h-full min-h-[200px]"
                variant="outline"
                onClick={handleNewAddress}
              >
                {newAddress === false ? (
                  <div className="flex">
                    <Plus className="h-6 w-6 mr-2" />
                    Add New Address
                  </div>
                ) : (
                  <div className="flex">
                    <Minus className="h-6 w-6 mr-2" />
                    Remove Form
                  </div>
                )}
                {/* <Plus className="h-6 w-6 mr-2" />
                {newAddress === false ? `Add New Address` : `Remove form`} */}
              </Button>
              {newAddress && (
                <Card className="h-full min-h-[200px]">
                  <CardHeader>
                    <CardTitle>Add new address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <AddressForm initialValues={editingAddress || undefined} onSubmit={handleFormSubmit} />
                  </CardContent>
                </Card>
              )}
            </div>
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
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {favorites.map((favorite) => (
                    <Card key={favorite.productId}>
                      <CardContent className="p-4">
                        <img src={favorite.productImageUrl} className="mb-2" />
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
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" defaultValue="Sarah Johnson" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    defaultValue="sarah.johnson@example.com"
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

