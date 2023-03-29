import classes from "./../../styles/HabittusHome.module.scss";
import Link from "next/link";

const MainContent = () => {
  return (
    <div>
      <main class={classes["main-content"]}>
        <section class={classes["intro-section"]}>
          <div class={classes["intro"]}>
            <div class={classes["intro-text"]}>
              <h1 class={classes["main-title"]}>Welcome to Habittus</h1>
              <p class={classes["main-description"]}>
                Track your habits and achieve your goals with ease!
              </p>
              <button class={classes["main-button"]}>
                <Link href={"/login"}>Get Started</Link>
              </button>
            </div>
          </div>
        </section>

        <section class={classes["features-section"]}>
          <div class={classes["features"]}>
            <div class={classes["intro-text"]}>
              <h2>Transform Your Life with Our Habit-Tracking App</h2>
              <p>
                Are you ready to build better habits and achieve your goals? Our
                app can help!
              </p>
            </div>
            <h3 class={classes["feature-heading"]}>
              Our App Includes the Following Features:
            </h3>
            <ul class={classes["feature-titles"]}>
              <li>See What Others Are Doing</li>
              <li>Track Your Streaks</li>
              <li>Visualize Your Progress</li>
              <li>Track Your Progress with a Stunning Graph</li>
              <li>Compete with Friends</li>
              <li>Tailor Your Profile to Match Your Unique Habits</li>
            </ul>
            <p class={classes["main-description"]}>
              Join our community and start achieving your goals with our
              powerful habit-tracking app. With features like seeing what others
              are doing, tracking your streaks, visualizing your progress,
              competing with friends, and creating personalized habits, our app
              is the perfect tool to help you build better habits and transform
              your life. Sign up now and start your journey today!
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default MainContent;
