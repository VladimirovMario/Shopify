import { useState } from 'react';
import styles from './ConsentBanner.module.css';

export default function ConsentBanner() {
  const [isBannerVisible, setIsBannerVisible] = useState(false);

  function gtag() {
    window.dataLayer.push(arguments);
  }

  function chooseConsent(choice) {
    const consent = choice === 'accept' ? 'granted' : 'denied';
    return {
      ad_storage: consent,
      ad_user_data: consent,
      ad_personalization: consent,
      analytics_storage: consent,
      functionality_storage: consent,
      personalization_storage: consent,
      security_storage: consent,
    };
  }

  function updateConsent(consentOptions) {
    localStorage.setItem('consentMode', JSON.stringify(consentOptions));
    gtag('consent', 'update', consentOptions);
    setIsBannerVisible(false);
  }

  // Send consent updates when users interact with consent banner
  function allConsentGranted() {
    const consentOptions = chooseConsent('accept');
    updateConsent(consentOptions);
  }

  function allConsentDenied() {
    const consentOptions = chooseConsent('reject');
    updateConsent(consentOptions);
  }

  const consentOptions = localStorage.getItem('consentMode');

  if (consentOptions === null && !isBannerVisible) {
    setIsBannerVisible(true);
  }

  let content = <></>;
  if (isBannerVisible) {
    content = (
      <section className={styles.container}>
        <div className={styles.content}>
          <h2 className={styles.title}>
            The Shopify uses cookies for various purposes.
          </h2>
          <p className={styles.description}>
            We want to ensure optimum use of our website for you, and also to
            continually improve our services.
          </p>
          <div className={styles['action-container']}>
            <button
              className="btn btn-delete"
              type="button"
              onClick={allConsentDenied}
            >
              Reject
            </button>
            <button
              className="btn btn-edit"
              type="button"
              onClick={allConsentGranted}
            >
              Accept
            </button>
          </div>
        </div>
      </section>
    );
  } else {
    content = null;
  }

  return content;
}
