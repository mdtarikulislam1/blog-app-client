import { Button } from "@/components/ui/button";
import { userService } from "@/services/user.service";

export default async function Home() {
  const { data, error } = await userService.getSession();


  return (
    <div>
      <Button>Button</Button>
    </div>
  );
}
