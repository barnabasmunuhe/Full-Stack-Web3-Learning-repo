import { ConnectButton } from "@rainbow-me/rainbowkit";
import { FaGithub } from "react-icons/fa";

export default function Header() {
  return (
    <header className="flex items-center justify-between p-4 border-b bg-grey-100 shadow-md">
      {/* Left Side */}
      <div className="flex items-center gap-6">
        <a
          href="https://github.com/barnabasmunuhe/Full-Stack-Web3-Learning-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="text-2xl hover:text-gray-600 transition-colors"
        >
          <FaGithub />
        </a>

        <h1 className="text-2xl font-bold">TSender</h1>
      </div>

      {/* Right Side */}
      <ConnectButton />
    </header>
  );
}
