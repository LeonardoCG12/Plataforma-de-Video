import { List, X } from "phosphor-react";
import { Logo } from "./Logo";

interface HeaderProps {
  isMobile: boolean;
  isOpen: boolean;
  handleSlide: () => void;
}

export function Header(props: HeaderProps) {
  return (
    <header className="pl-10 pr-10 py-5 flex items-center justify-between bg-gray-700 border-b border-gray-600 sm:w-full sm:pl-0 sm:flex sm:justify-center">
      <Logo />
      {props.isMobile && (
        <button onClick={props.handleSlide}>
          {props.isOpen ? (
            <X size={30} weight={"bold"} color={"#C4C4CC"} />
          ) : (
            <List size={30} weight={"bold"} color={"#C4C4CC"} />
          )}
        </button>
      )}
    </header>
  );
}
