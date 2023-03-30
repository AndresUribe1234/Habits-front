import classes from "./../../styles/HabittusHome.module.scss";
import Link from "next/link";

const MainContent = () => {
  return (
    <div>
      <main className={classes["main-content"]}>
        <section className={classes["intro-section"]}>
          <div className={classes["intro"]}>
            <div className={classes["intro-text"]}>
              <h1 className={classes["main-title"]}>Welcome to Habittus</h1>
              <p className={classes["main-description"]}>
                Track your habits and achieve your goals with ease!
              </p>
              <button className={classes["main-button"]}>
                <Link href={"/login"}>Get Started</Link>
              </button>
            </div>
          </div>
        </section>

        <section className={classes["features-section"]}>
          <div className={classes["features"]}>
            <div className={classes["intro-text"]}>
              <h2>Transform Your Life with Our Habit-Tracking App</h2>
              <p>
                Are you ready to build better habits and achieve your goals? Our
                app can help!
              </p>
            </div>
            <h3 className={classes["feature-heading"]}>
              Our App Includes the Following Features:
            </h3>
            <ul className={classes["feature-titles"]}>
              <li>See What Others Are Doing</li>
              <li>Track Your Streaks</li>
              <li>Visualize Your Progress</li>
              <li>Track Your Progress with a Stunning Graph</li>
              <li>Compete with Friends</li>
              <li>Tailor Your Profile to Match Your Unique Habits</li>
            </ul>
            <p className={classes["main-description"]}>
              Are you ready to transform your life and achieve your goals? Join
              our vibrant community and harness the power of our habit-tracking
              app. See what others are doing, track your progress, and visualize
              your success. Challenge yourself and compete with friends to stay
              motivated, and create personalized habits that work for you. With
              our app by your side, building better habits has never been
              easier. Sign up now and start your journey to a better you!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainContent;
