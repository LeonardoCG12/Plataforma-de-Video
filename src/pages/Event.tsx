import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import classNames from "classnames";
import { Header } from "../components/Header";
import { Video } from "../components/Video";
import { Sidebar } from "../components/Sidebar";

export function Event() {
  const { slug } = useParams<{ slug: string }>();
  const [isMobile, setIsMobile] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  function handleScreenSize() {
    if (window.innerWidth < 640) {
      setIsMobile(true);
    } else {
      setIsMobile(false);
      setIsOpen(false);
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleScreenSize);
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header
        isMobile={isMobile}
        isOpen={isOpen}
        handleSlide={() => setIsOpen(!isOpen)}
      />
      <main className="flex flex-1">
        {slug ? <Video lessonSlug={slug} /> : <div className="flex-1" />}
        {isMobile ? (
          <div
            className={classNames("ease-in-out duration-500 transition-all z-50", {
              "translate-x-0": isOpen,
              "translate-x-96": !isOpen,
            })}
          >
            <Sidebar />
          </div>
        ) : (
          <Sidebar />
        )}
      </main>
    </div>
  );
}
