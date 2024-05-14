import { motion } from "framer-motion";
export const UI = ({ currentScreen, onScreenChange, isAnimating }) => {
  return (
    <motion.main
      className="fixed inset-0 z-10"
      animate={isAnimating ? "" : currentScreen}
    >
      <section
        className={`ui ${
          currentScreen === "Intro" && !isAnimating ? "" : "ui_hidden"
        }`}
      >
        <motion.img
          src="/logo.svg"
          alt="Medieval Town"
          className="w-32"
          initial={{
            y: -80,
            opacity: 0,
          }}
          variants={{
            Home: {
              y: 0,
              opacity: 0.9,
              transition: {
                delay: 1,
                duration: 1.2,
              },
            },
          }}
        />
        <h1 className="text-7xl text-white opacity-90 font-extrabold">
          Medieval Town
        </h1>
        <motion.div
          className="flex items-center gap-3 mt-2"
          initial={{
            y: 80,
            opacity: 0,
          }}
          variants={{
            Home: {
              y: 0,
              opacity: 1,
              transition: {
                delay: 0.2,
                duration: 1.2,
              },
            },
          }}
        >
          <button
            onClick={() => onScreenChange("Section1")}
            className="bg-gray-400 bg-opacity-50 p-3 rounded-full text-white font-medium"
          >
            Visit the historic castle
          </button>
          <button
            onClick={() => onScreenChange("Section2")}
            className="bg-gray-400 bg-opacity-50 p-3 rounded-full text-white font-medium"
          >
            Discover the town windmill
          </button>
        </motion.div>
      </section>
      <motion.section
        className={`ui ${
          currentScreen === "Section1" && !isAnimating ? "" : "ui_hidden"
        }`}
      >
        <div className="md:max-w-2xl">
          <motion.h1
            className="text-7xl text-white opacity-90 font-extrabold -ml-1"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Castle: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.2,
                  duration: 1.2,
                },
              },
            }}
          >
            Castle
          </motion.h1>
          <motion.p
            className="text-white mt-2"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Castle: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.6,
                  duration: 1.2,
                },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, quia, quibusdam, voluptates voluptate quos quod
            voluptatibus quas doloribus quidem. Quisquam quae voluptatum, quia,
            quibusdam, voluptates voluptate quos quod voluptatibus quas
            doloribus quidem.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Intro")}
            className="bg-gray-400 bg-opacity-50  p-3 mt-3 rounded-full text-white font-medium"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Castle: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 1.2,
                },
              },
            }}
          >
            Back to the entrance
          </motion.button>
        </div>
      </motion.section>
      <motion.section
        className={`ui ${
          currentScreen === "Section2" && !isAnimating ? "" : "ui_hidden"
        }`}
      >
        <div className="md:max-w-2xl">
          <motion.h1
            className="text-7xl text-white opacity-90 font-extrabold -ml-1"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Windmill: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.2,
                  duration: 1.2,
                },
              },
            }}
          >
            Windmill
          </motion.h1>
          <motion.p
            className="text-white mt-2"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Windmill: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 0.6,
                  duration: 1.2,
                },
              },
            }}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            quae voluptatum, quia, quibusdam, voluptates voluptate quos quod
            voluptatibus quas doloribus quidem. Quisquam quae voluptatum, quia,
            quibusdam, voluptates voluptate quos quod voluptatibus quas
            doloribus quidem.
          </motion.p>
          <motion.button
            onClick={() => onScreenChange("Home")}
            className="bg-gray-400 bg-opacity-50  p-3 mt-3 rounded-full text-white font-medium"
            initial={{
              y: 80,
              opacity: 0,
            }}
            variants={{
              Windmill: {
                y: 0,
                opacity: 1,
                transition: {
                  delay: 1,
                  duration: 1.2,
                },
              },
            }}
          >
            Back to the entrance
          </motion.button>
        </div>
      </motion.section>
    </motion.main>
  );
};
