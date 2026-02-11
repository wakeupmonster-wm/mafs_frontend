import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

export const NameUpdateCard = ({ currentName }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(profileSchema),
    defaultValues: { fullName: currentName },
  });

  const onSubmit = (data) => {
    dispatch(updateAdminName(data.fullName)).then(() => setIsEditing(false));
  };

  return (
    <Card className="border-slate-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg">Full Name</CardTitle>
        <Button variant="ghost" onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <form onSubmit={handleSubmit(onSubmit)} className="flex gap-2">
            <div className="flex-1">
              <Input {...register("fullName")} placeholder="Full Name" />
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>
            <Button type="submit">Save</Button>
          </form>
        ) : (
          <p className="font-semibold text-slate-700">
            {currentName || "Not Set"}
          </p>
        )}
      </CardContent>
    </Card>
  );
};
