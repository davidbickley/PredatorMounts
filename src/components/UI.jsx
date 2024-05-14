export const UI = ({ currentSection, onSectionChange, scrollToSection }) => {
  return (
    <>
      <main className="ui-main">
        {/* Section 1 */}
        <section
          className={`ui-section Section1 ${
            currentSection === "Section1" ? "" : "ui-section--hidden"
          }`}
          style={{
            transitionDuration: currentSection === "Section1" ? "1s" : "0.5s",
          }}
        >
          {/* Section 1 content */}
          <div className="ui-section__wrapper">
            <h1>Don't Let Inferior Mounts Ground You</h1>
            <p>
              You've worked hard to build your ideal sim setup. Carefully chosen
              joysticks, throttles, and pedals, all positioned for maximum
              comfort and control. But there's a weak link holding you back...
            </p>
            <p>Subpar mounts undermine even the most well-planned sim rigs.</p>
            <p>
              Poorly positioned controls lead to inaccurate inputs and
              discomfort over long sessions.
            </p>
            <p>
              Shaky mounts break your immersion and your concentration.
              Inflexible setups force you to adapt to them, rather than the
              other way around. These issues can frustrate your progress and sap
              your enjoyment of flight simulation.
            </p>
            <p>
              You deserve better. You deserve mounts that enhance your setup,
              not compromise it. Mounts that provide a stable, comfortable, and
              fully adjustable foundation for your controls. Mounts that let you
              focus on what really matters - savoring the joys and thrills of
              flight.
            </p>

            <button
              className="ui-clickable"
              onClick={() => scrollToSection("Section2")}
            >
              Learn More
            </button>
          </div>
        </section>

        {/* Section 2 */}
        <section
          className={`ui-section Section2 ${
            currentSection === "Section2" ? "" : "ui-section--hidden"
          }`}
          style={{
            transitionDuration: currentSection === "Section2" ? "1s" : "0.5s",
          }}
        >
          {/* Section 2 content */}
          <div className="ui-section2__wrapper">
            <img className="ui-section2__img" src="./APEX.png" />
            <div>
              <h1>Secure Your Setup</h1>
              <p>
                We're sim enthusiasts, just like you. We've felt your pain, and
                we refused to settle for second-rate solutions. So we built a
                better one.
              </p>
              <p>
                Engineered for rock-solid stability, and fully adjustable
                positioning, our mounts let you create the perfect layout for
                your specific gear and ergonomic preferences — remaining exactly
                where you need them, even in the most intense encounters.
              </p>
              <p>
                Our quick-release clamps allow for fast, tool-free adjustments
                and convenient storage. And with options for every budget, you
                don't need to spend a fortune to upgrade your mounting game.
              </p>
              <p>
                For those seeking the ultimate in performance and adjustability,
                we offer the <strong>APEX Predator Tracker Rail System</strong>.
                This flagship model takes our acclaimed mounts to the next
                level, with reinforced support rods for zero flex,
                smooth-gliding bearing wheels for effortless adjustments, and
                quick-lock cam levers for instantaneous security. It's{" "}
                <em>the</em> choice for sim enthusiasts who refuse to
                compromise.
              </p>
              <p>
                No matter your skill level or equipment, you deserve a mounting
                system that works with you, not against you.
              </p>
              <button
                className="ui-clickable"
                onClick={() => console.log("clicked")}
              >
                Shop Now
              </button>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};
