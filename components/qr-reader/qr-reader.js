import styles from "./qr-reader.module.css";
import { QRCodeSVG } from "qrcode.react";
import { Input as ChakraInput } from "@chakra-ui/input";
import { FormControl, FormLabel } from "@chakra-ui/form-control";
import { Button } from "../button/button";
import { useState } from "react";
import { Checkbox } from "@chakra-ui/react";

export const QrReader = () => {
  const [qrTarget, setQrTarget] = useState(null);
  const [showLogo, setShowLogo] = useState(true);

  const logoDetails = {
    height: 25,
    width: 48,
    src: imageUri,
    excavate: true,
  };

  return (
    <div className={styles.container}>
      <h2>Generate an QR Code</h2>
      <p>
        Generate a QR Code that includes the Ace Centre logo. Use the QR code
        for marketing material. Make sure to test the QR code fully before you
        include it in any marketing material.
      </p>
      <p>
        You must include the entire url, including the &apos;https&apos;. For
        example &apos;https://acecentre.org.uk/contact&apos; will link to our
        contact us page
      </p>
      <h2>Considerations</h2>
      <p>
        QR codes can be great but they come with lots of problems. The best use
        case is physically printed QR codes.
      </p>
      <p>
        We should stick to hyperlinks (or copy pasting links) in the digital
        space as much as possible as this gives the end user the best experience
        and will work best across most devices and platforms.
      </p>
      <ul>
        <li>
          Always write out the link in the content you are using a QR code. If
          you don&amp;t do this you are locking out people without a QR code
          reader.
        </li>
        <li>
          Consider where the user is viewing the QR code. If you are using it in
          a social media post, how are they going to scan the code if they are
          viewing on their QR scanner? Or if they are viewing on a computer you
          are forcing them onto their phone which they probably don&amp;t want.
        </li>
      </ul>

      <form
        onSubmit={(event) => {
          event.preventDefault();

          const url = event.target.url.value;
          setQrTarget(url);

          setTimeout(() => {
            const svg = document.getElementById("qr-svg");
            svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
            svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
            const source = svg.outerHTML;
            const uri = "data:image/svg+xml;base64," + btoa(source);

            // console.log(canvas);
            const link = document.createElement("a");
            link.href = uri;
            link.download = "Ace-QR.svg";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 300);
        }}
      >
        <Input
          placeholder="https://acecentre.org.uk/webpage-you-want"
          name="url"
          label="Webpage URL"
          ariaLabel="Webpage URL"
          id="url"
          type="url"
        />
        <div>
          <Checkbox
            isChecked={showLogo}
            onChange={(event) => {
              setShowLogo(event.target.checked);
            }}
          >
            Show Ace Centre logo
          </Checkbox>
        </div>

        <Button className={styles.button} type="submit">
          Download QR Code
        </Button>
      </form>

      {qrTarget && (
        <QRCodeSVG
          id="qr-svg"
          level="H"
          height={200}
          width={200}
          imageSettings={showLogo ? logoDetails : undefined}
          value={qrTarget}
        />
      )}
    </div>
  );
};

const Input = ({ placeholder, name, ariaLabel, id, type, label }) => {
  const visibleLabel = label || ariaLabel;

  return (
    <>
      <FormControl className={styles.formControl} id={id}>
        <FormLabel>{visibleLabel}</FormLabel>
        <ChakraInput
          className={styles.input}
          backgroundColor={"#F5F5F5"}
          placeholder={placeholder}
          name={name}
          aria-label={ariaLabel}
          type={type}
          maxWidth={500}
        />
      </FormControl>
    </>
  );
};

const imageUri =
  "data:image/png;base64,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";
