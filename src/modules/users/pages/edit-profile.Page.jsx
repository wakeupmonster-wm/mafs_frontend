import React from "react";
import { useLocation, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import {
  IconArrowLeft,
  IconUser,
  IconMapPin,
  IconShield,
  IconDeviceFloppy,
  IconMoodSmile,
  IconRadar,
  IconTarget,
  IconMail,
  IconDeviceMobile,
} from "@tabler/icons-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

export default function EditProfilePage() {
  const location = useLocation();
  const navigate = useNavigate();
  const userData = location.state?.userData;

  const form = useForm({
    defaultValues: userData || {},
  });

  const onSubmit = (data) => {
    console.log("Updated User Data: ", data);
    // Integration point: dispatch(updateUser(data))
    alert("Profile Updated Successfully");
    navigate(-1);
  };

  if (!userData)
    return (
      <div className="flex h-[80vh] items-center justify-center text-muted-foreground italic">
        No user data found. Please return to the user list.
      </div>
    );

  return (
    <div className="p-6 w-full mx-auto space-y-8 animate-in fade-in duration-500">
      {/* --- STICKY HEADER --- */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-6 sticky top-0 bg-background/95 backdrop-blur z-20 pt-2">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigate(-1)}
            className="rounded-full shadow-sm"
          >
            <IconArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold tracking-tight flex items-center gap-2">
              Edit Account{" "}
              <Badge variant="outline" className="font-mono text-[10px]">
                {userData._id.slice(-6)}
              </Badge>
            </h1>
            <p className="text-sm text-muted-foreground">
              Update {userData.profile?.nickname}'s public profile and
              administrative settings.
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            onClick={form.handleSubmit(onSubmit)}
            className="gap-2 px-6 shadow-md bg-primary hover:bg-primary/90"
          >
            <IconDeviceFloppy size={18} /> Save Changes
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl">
              <TabsTrigger value="basic" className="rounded-lg gap-2 px-6">
                <IconUser size={16} />{" "}
                <span className="hidden md:inline">Profile</span>
              </TabsTrigger>
              <TabsTrigger value="lifestyle" className="rounded-lg gap-2 px-6">
                <IconMoodSmile size={16} />{" "}
                <span className="hidden md:inline">Lifestyle</span>
              </TabsTrigger>
              <TabsTrigger value="discovery" className="rounded-lg gap-2 px-6">
                <IconRadar size={16} />{" "}
                <span className="hidden md:inline">Discovery</span>
              </TabsTrigger>
              <TabsTrigger value="account" className="rounded-lg gap-2 px-6">
                <IconShield size={16} />{" "}
                <span className="hidden md:inline">Settings</span>
              </TabsTrigger>
            </TabsList>

            {/* --- TAB 1: BASIC PROFILE --- */}
            <TabsContent value="basic" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1 space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">
                    Identity
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    These details are visible to other members of the community.
                  </p>
                </div>
                <div className="md:col-span-2">
                  <Card className="shadow-sm">
                    <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
                      <FormField
                        control={form.control}
                        name="profile.nickname"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Nickname</FormLabel>
                            <FormControl>
                              <Input placeholder="Display Name" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          control={form.control}
                          name="profile.age"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Age</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="profile.height"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Height (cm)</FormLabel>
                              <FormControl>
                                <Input type="number" {...field} />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                      <FormField
                        control={form.control}
                        name="profile.jobTitle"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Job Title</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="profile.company"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Company</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <div className="md:col-span-2">
                        <FormField
                          control={form.control}
                          name="profile.about"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio / About</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Tell the world about this user..."
                                  className="min-h-[120px] resize-none"
                                  {...field}
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            {/* --- TAB 2: LIFESTYLE & ATTRIBUTES --- */}
            <TabsContent value="lifestyle" className="space-y-6 pt-6">
              <Card className="shadow-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Lifestyle Details</CardTitle>
                  <CardDescription>
                    Personal habits and cultural background information.
                  </CardDescription>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  <FormField
                    control={form.control}
                    name="attributes.zodiac"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Zodiac Sign</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attributes.religion"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Religion</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attributes.education"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Education</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select Level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="Bachelor's">
                              Bachelor's Degree
                            </SelectItem>
                            <SelectItem value="Master's">
                              Master's Degree
                            </SelectItem>
                            <SelectItem value="PhD">Doctorate (PhD)</SelectItem>
                            <SelectItem value="High School">
                              High School
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attributes.smoking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Smoking Habit</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attributes.drinking"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Drinking Habit</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="attributes.dietary"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Dietary Preference</FormLabel>
                        <FormControl>
                          <Input {...field} />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            {/* --- TAB 3: DISCOVERY & LOCATION --- */}
            <TabsContent value="discovery" className="space-y-6 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="shadow-sm">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                      <IconMapPin size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">Geography</CardTitle>
                      <CardDescription>
                        User's physical location.
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="location.city"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>City</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="location.country"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Country</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form.control}
                      name="location.full_address"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Full Map Address</FormLabel>
                          <FormControl>
                            <Textarea className="h-24" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </CardContent>
                </Card>

                <Card className="shadow-sm border-pink-100 bg-pink-50/10">
                  <CardHeader className="flex flex-row items-center gap-3">
                    <div className="p-2 bg-pink-100 text-pink-600 rounded-lg">
                      <IconTarget size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Discovery Preferences
                      </CardTitle>
                      <CardDescription>
                        Who is the user looking for?
                      </CardDescription>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <FormField
                      control={form.control}
                      name="discovery.relationshipGoal"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Relationship Goal</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="e.g. Long-term dating"
                              {...field}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="discovery.distanceRange"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Distance Range (km)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="discovery.ageRange.min"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Min Age Pref</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="discovery.ageRange.max"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Max Age Pref</FormLabel>
                            <FormControl>
                              <Input type="number" {...field} />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* --- TAB 4: ACCOUNT SETTINGS --- */}
            <TabsContent value="account" className="space-y-6 pt-6">
              <Card className="shadow-sm border-blue-100">
                <CardHeader className="bg-blue-50/50 rounded-t-xl border-b mb-6">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                      <IconShield size={20} />
                    </div>
                    <div>
                      <CardTitle className="text-lg">
                        Administrative & Security
                      </CardTitle>
                      <CardDescription>
                        Critical account status and verification controls.
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <FormField
                      control={form.control}
                      name="account.status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-blue-900">
                            Current Account Status
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger className="h-12 border-blue-200">
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="active">
                                Active (Normal Access)
                              </SelectItem>
                              <SelectItem value="banned">
                                Banned (Access Revoked)
                              </SelectItem>
                              <SelectItem value="inactive">
                                Inactive (Self-deactivated)
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="account.isPremium"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-xl border-2 border-blue-100 p-4 bg-white shadow-sm">
                          <div className="space-y-0.5">
                            <FormLabel className="text-base font-bold flex items-center gap-2">
                              Premium Member{" "}
                              <Badge variant="premium" className="h-fit">
                                PRO
                              </Badge>
                            </FormLabel>
                            <FormDescription className="text-xs">
                              Grants access to premium discovery features.
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>

                  <Separator />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="isEmailVerified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <IconMail
                              className="text-muted-foreground"
                              size={20}
                            />
                            <div>
                              <FormLabel>Email Verified</FormLabel>
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="isPhoneVerified"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 hover:bg-muted/30 transition-colors">
                          <div className="flex items-center gap-3">
                            <IconDeviceMobile
                              className="text-muted-foreground"
                              size={20}
                            />
                            <div>
                              <FormLabel>Phone Verified</FormLabel>
                            </div>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}

// Small Badge helper if not globally available
function Badge({ children, variant = "default", className = "" }) {
  const variants = {
    default: "bg-primary text-primary-foreground",
    outline: "border text-muted-foreground",
    premium: "bg-amber-100 text-amber-700 border-amber-200",
  };
  return (
    <span
      className={cn(
        "px-2 py-0.5 rounded-full text-xs font-bold",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
