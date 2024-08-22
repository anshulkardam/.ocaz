import { Header } from "../components/Header";
import { UpdateProfileCard } from "../components/UpdateProfileCard";

export const UpdateProfile = () => {
  return (
    <div className="bg-black min-h-screen flex flex-col">
      <Header />
      <div className="flex-grow flex items-center justify-center">
        <UpdateProfileCard />
      </div>
    </div>
  );
};
