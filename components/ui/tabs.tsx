"use client";

import { useDevice } from "@/lib/hooks/useMediaQuery";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useState } from "react";

type Tab = {
  title: React.ReactNode;
  value: string;
  content?: string | React.ReactNode | any;
};

export const Tabs = ({
  tabs: propTabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
}) => {
  const [active, setActive] = useState<Tab>(propTabs[0]);
  const [tabs, setTabs] = useState<Tab[]>(propTabs);

  const moveSelectedTabToTop = (idx: number) => {
    const newTabs = [...propTabs];
    const selectedTab = newTabs.splice(idx, 1);
    newTabs.unshift(selectedTab[0]);
    setTabs(newTabs);
    setActive(newTabs[0]);
  };

  const [hovering, setHovering] = useState(false);

  const { isMobile } = useDevice();

  if (isMobile)
    return (
      <div className="h-fit">
        <div className="flex flex-row items-center justify-center [perspective:1000px]">
          <div
            className={cn(
              "relative overflow-hidden no-visible-scrollbar max-w-full w-fit",
              containerClassName
            )}
          >
            {propTabs.map((tab, idx) => (
              <button
                key={tab.value}
                onClick={() => {
                  moveSelectedTabToTop(idx);
                }}
                onMouseEnter={() => setHovering(true)}
                onMouseLeave={() => setHovering(false)}
                className={cn(
                  "mx-1 my-1 px-4 py-1.5 rounded-full bg-muted/[0.2]",
                  tabClassName
                )}
                style={{
                  transformStyle: "preserve-3d",
                }}
              >
                {active.value === tab.value && (
                  <motion.div
                    layoutId="clickedbutton"
                    transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                    className={cn(
                      "absolute inset-0 bg-muted rounded-full ",
                      activeTabClassName
                    )}
                  />
                )}

                <span className="relative block text-foreground">
                  {tab.title}
                </span>
              </button>
            ))}
          </div>
        </div>
        <FadeInDiv
          tabs={tabs}
          active={active}
          key={active.value}
          hovering={hovering}
          className={cn("mt-12", contentClassName, "h-fit")}
        />
      </div>
    );

  return (
    <div className="h-fit">
      <div className="flex flex-row items-center justify-center [perspective:1000px]">
        <div
          className={cn(
            " relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-fit border-muted border-2 rounded-full p-1.5 shadow-md",
            containerClassName
          )}
        >
          {propTabs.map((tab, idx) => (
            <button
              key={tab.value}
              onClick={() => {
                moveSelectedTabToTop(idx);
              }}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("px-4 py-1.5 rounded-full", tabClassName)}
              style={{
                transformStyle: "preserve-3d",
              }}
            >
              {active.value === tab.value && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-muted shadow-lg rounded-full ",
                    activeTabClassName
                  )}
                />
              )}

              <span className="relative block text-foreground">
                {tab.title}
              </span>
            </button>
          ))}
        </div>
      </div>
      <FadeInDiv
        tabs={tabs}
        active={active}
        key={active.value}
        hovering={hovering}
        className={cn("mt-12", contentClassName, "h-fit")}
      />
    </div>
  );
};

export const FadeInDiv = ({
  className,
  tabs,
  hovering,
}: {
  className?: string;
  key?: string;
  tabs: Tab[];
  active: Tab;
  hovering?: boolean;
}) => {
  const isActive = (tab: Tab): boolean => {
    return tab.value === tabs[0].value;
  };
  return (
    <div className="w-full h-fit mt-4">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            overflow: isActive(tab) ? "visible" : "auto",
            zIndex: -idx,
          }}
          animate={{
            opacity: isActive(tab) ? 1 : 0,
            maxHeight: isActive(tab) ? "100%" : 0,
            height: isActive(tab) ? "100%" : 0,
          }}
          className={cn("w-full h-full", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
