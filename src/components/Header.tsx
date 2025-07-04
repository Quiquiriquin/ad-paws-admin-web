import { Link } from "@tanstack/react-router";
import { Avatar } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSession } from "@/hooks/useSession";

export default function Header() {
  const { user } = useSession();
  return (
    <header className="rounded-lg shadow-sm p-4 flex gap-2 bg-white text-black justify-between">
      <div className="flex gap-4">
        <label className="font-bold">Dogapp</label>
        <Link
          activeProps={{
            className: "font-bold bg-[#4B946099] text-neutral-200",
          }}
          activeOptions={{
            exact: true,
          }}
          to="/dashboard/inicio"
          className="text-gray-500 flex items-center px-4 py-2 rounded-sm hover:not-active:bg-[#c7c7c7] hover:not-active:text-neutral-200"
        >
          <span className="">Dashboard</span>
        </Link>
        <Link
          activeProps={{
            className:
              "font-bold bg-[#4B946099] text-neutral-200 hover:bg-[#4B946099] active",
          }}
          to="/dashboard/mascotas"
          className="text-gray-500 flex items-center px-4 py-2 rounded-sm hover:not-active:bg-[#c7c7c7] hover:not-active:text-neutral-200"
        >
          <span className="">Mascotas</span>
        </Link>
      </div>
      <div className="flex gap-4 items-center">
        <label>Hola, {user?.name}</label>
        <Avatar icon={<UserOutlined />} />
      </div>
    </header>
  );
}
