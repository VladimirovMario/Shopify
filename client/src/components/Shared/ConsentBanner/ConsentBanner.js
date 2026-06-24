import { useState } from 'react';
import styles from './ConsentBanner.module.css';

export default function ConsentBanner() {
  let initialBannerState = false;
  const consentOptions = localStorage.getItem('consentMode');

  if (consentOptions === null) {
    initialBannerState = true;
  }

  const [isBannerVisible, setIsBannerVisible] = useState(initialBannerState);

  function gtag() {
    window.dataLayer.push(arguments);
  }

  function chooseConsent(choice) {
    return {
      ad_storage: choice,
      ad_user_data: choice,
      ad_personalization: choice,
      analytics_storage: choice,
      functionality_storage: choice,
      personalization_storage: choice,
      security_storage: choice,
    };
  }

  function updateConsent(consentOptions) {
    localStorage.setItem('consentMode', JSON.stringify(consentOptions));
    gtag('consent', 'update', consentOptions);
    setIsBannerVisible(false);
  }

  // Send consent updates when users interact with consent banner
  function allConsentGranted() {
    const consentOptions = chooseConsent('granted');
    updateConsent(consentOptions);
  }

  function allConsentDenied() {
    const consentOptions = chooseConsent('denied');
    updateConsent(consentOptions);
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
