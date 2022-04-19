import styles from "./service-finder-mailing-list.module.css";

export const ServiceFinderMailingList = () => {
  return <MailingList signUpIdentifier="service-finder" />;
};

export const MailingList = ({
  title = "Sign up for our newsletter",
  description = "Sign up to our free newsletter to stay up to date with the latest news from Ace Centre",
  signUpIdentifier = "home",
}) => {
  return (
    <div className={styles.container}>
      <h2>{title}</h2>
      <p>{description}</p>
      <div
        dangerouslySetInnerHTML={{
          __html: `
        <!-- Begin Mailchimp Signup Form -->
        <link href="//cdn-images.mailchimp.com/embedcode/horizontal-slim-10_7.css" rel="stylesheet" type="text/css">
        <style type="text/css">
        #mc_embed_signup{background:#fff; clear:left; font:14px Helvetica,Arial,sans-serif; width:100%;}
        /* Add your own Mailchimp form style overrides in your site stylesheet or in this style block.
         We recommend moving this block and the preceding CSS link to the HEAD of your HTML file. */
        </style>
        <style type="text/css">
        #mc-embedded-subscribe-form input[type=checkbox]{display: inline; width: auto;margin-right: 10px;}
        #mergeRow-gdpr {margin-top: 20px;}
        #mergeRow-gdpr fieldset label {font-weight: normal;}
        #mc-embedded-subscribe#mc-embedded-subscribe {
        background-color: #00537F;
        }
        #mc-embedded-subscribe-form .mc_fieldset{border:none;min-height: 0px;padding-bottom:0px;}
        </style>
        <div id="mc_embed_signup">
        <form action="https://acecentre.us7.list-manage.com/subscribe/post?u=d05eb11e79c97878b9f10fd9c&amp;id=ec5a06da07&SIGNUP=${signUpIdentifier}" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" class="validate" target="_blank" novalidate>
        <div id="mc_embed_signup_scroll">
        <input aria-label="Email address for mailing list" type="email" value="" name="EMAIL" class="email" id="mce-EMAIL" placeholder="Email address" required>
        <!-- real people should not fill this in and expect good things - do not remove this or risk form bot signups-->
        <div style="position: absolute; left: -5000px;" aria-hidden="true"><input type="text" name="b_d05eb11e79c97878b9f10fd9c_ec5a06da07" tabindex="-1" value=""></div>
        <div class="clear"><input type="submit" onClick="if(gtag) gtag('event', 'conversion', {'send_to': 'AW-10885468875/afp9CKKuv7QDEMulzMYo'});" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" class="button"></div>
        </div>
        </form>
        </div>
        
        <!--End mc_embed_signup-->
        `,
        }}
      ></div>
    </div>
  );
};
