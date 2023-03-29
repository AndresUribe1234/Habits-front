import classes from "./../../styles/TermsContent.module.scss";
import { useRouter } from "next/router";

const TermsContent = () => {
  const router = useRouter();

  const backHandler = () => {
    router.back();
  };

  return (
    <div className={classes["terms-container"]}>
      <h1>Terms of Service Agreement for Habittus</h1>
      <h3>Effective Date: March 01, 2023</h3>
      <section>
        <p>
          Welcome to Habittus! By using our web app, you agree to the following
          terms and conditions:
        </p>
      </section>
      <section>
        <h3>1. Acceptance of Terms</h3>
        <p>
          By accessing or using Habittus, you agree to be bound by these Terms
          of Service, our Privacy Policy, and any other policies, guidelines, or
          terms that may be applicable to specific services offered by Habittus.
          If you do not agree with any of these terms, you should not use our
          web app.
        </p>
      </section>
      <section>
        <h3>2. Use of Habittus</h3>
        <p>
          You may use Habittus for lawful purposes only. You may not use our web
          app to transmit, distribute, store, or destroy any content that (a)
          violates any applicable law or regulation, (b) infringes on any
          third-party right, including intellectual property, privacy, or
          publicity rights, or (c) is harmful, fraudulent, misleading,
          defamatory, or offensive.
        </p>
      </section>
      <section>
        <h3>3. User Accounts</h3>
        <p>
          To use certain features of Habittus, you may be required to create a
          user account. You must provide accurate and complete information when
          creating your account, and you are responsible for maintaining the
          confidentiality of your login credentials. You are also responsible
          for any activity that occurs under your account.
        </p>
      </section>
      <section>
        <h3>4. Email Opt-In</h3>
        <p>
          By accepting these terms of service, you agree to receive promotional
          emails from Habittus, which may include updates on new features,
          special offers, and other information related to Habittus. You also
          agree to receive emails from Habittus related to password updates and
          changes to sensitive information. You may opt-out of receiving
          promotional emails at any time by following the instructions provided
          in the email.
        </p>
      </section>
      <section>
        <h3>5. Progress Tracking</h3>
        <p>
          Habittus allows users to track their progress in achieving their daily
          habits. Users can also view the progress of other users. By using our
          web app, you agree that your progress data may be visible to other
          users of the web app.
        </p>
      </section>
      <section>
        <h3>6. Termination</h3>
        <p>
          We reserve the right to terminate your access to Habittus at any time
          and for any reason, including if we believe that you have violated
          these Terms of Service or any other policies or guidelines related to
          our web app.
        </p>
      </section>
      <section>
        <h3>7. Disclaimer of Warranties</h3>
        <p>
          Habittus is provided on an "as is" and "as available" basis, and we
          make no warranties or representations of any kind, whether express,
          implied, or statutory, including but not limited to warranties of
          merchantability, fitness for a particular purpose, non-infringement,
          or uninterrupted access.
        </p>
      </section>
      <section>
        <h3>8. Limitation of Liability</h3>
        <p>
          In no event shall Habittus or its affiliates, licensors, or service
          providers be liable for any indirect, incidental, special,
          consequential, or punitive damages arising from or related to your use
          of Habittus, even if we have been advised of the possibility of such
          damages.
        </p>
      </section>
      <section>
        <h3>9. Governing Law</h3>
        <p>
          These Terms of Service shall be governed by and construed in
          accordance with the laws of the state or country where Habittus is
          based, without giving effect to any principles of conflicts of law.
        </p>
      </section>
      <section>
        <h3>10. Changes to Terms</h3>
        <p>
          We reserve the right to modify these Terms of Service at any time, so
          please review them regularly. If we make material changes to these
          terms, we will notify you by email or by posting a notice on our web
          app.
        </p>
      </section>
      <section>
        <h3>11. Contact Information</h3>
        <p>
          If you have any questions or concerns about these Terms of Service or
          our web app in general, please contact us at{" "}
          <span>habittusdev@gmail.com</span>.
        </p>
      </section>
      <a onClick={backHandler}>Back</a>
    </div>
  );
};

export default TermsContent;
