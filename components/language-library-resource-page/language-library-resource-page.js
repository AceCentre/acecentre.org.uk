import HelpIcon from "@mui/icons-material/Help";
import { BackToLink } from "../back-to-link/back-to-link";
import { Button } from "../button/button";
import { Image } from "../image";
import styles from "./language-library-resource-page.module.css";
import SvgIcon from "@mui/material/SvgIcon";
import { Tooltip } from "@chakra-ui/react";
import { DETAILS_CONFIG } from "../language-library-details/language-library-details";
import { Fragment } from "react";
import { LanguageLibraryRelevantResources } from "../language-library-relevant-resources/language-library-relevant-resources";
import {
  GenericFaqs,
  LANGUAGE_LIBRARY_FAQS,
} from "../getting-started-faqs/getting-started-faqs";

const listOfBackgrounds = [
  styles.blueGradient,
  styles.yellowGradient,
  styles.redGradient,
  styles.orangeGradient,
  styles.redGradient,
  styles.orangeGradient,
  styles.blueGradient,
  styles.yellowGradient,
];

const stripHTML = (desc) => {
  const strippedString = desc.replace(/(<([^>]+)>)/gi, "");
  return strippedString.trim();
};

export const LanguageLibraryResourcePage = ({
  resource,
  randomNumber,
  fields,
}) => {
  const backgroundClass = listOfBackgrounds[randomNumber];

  return (
    <>
      <div className={styles.container}>
        <BackToLink
          className={styles.backTo}
          href="/language-library/all"
          where="language library"
        />
        <div className={styles.topContainer}>
          <div className={`${styles.imageContainer} ${backgroundClass}`}>
            <Image
              src={resource.image}
              height={200}
              width={400}
              alt={`Screenshot of: ${resource.post.post_title}`}
              priority
            />
          </div>
          <div>
            <h1>{resource.post.post_title}</h1>
            <p>{stripHTML(resource.post.post_content)}</p>
            {resource.file && (
              <div className={styles.downloadButton}>
                <Button href={resource.file}>Download Resource</Button>
              </div>
            )}

            {resource.meta.resource_url[0] != "" && (
              <div className={styles.downloadButton}>
                <Button href={resource.meta.resource_url[0]}>
                  Visit Resource
                </Button>
              </div>
            )}
          </div>
        </div>
        <div className={styles.details}>
          {DETAILS_CONFIG.sections
            .map((section) => {
              let count = 0;

              for (const sub of section.sections) {
                let val = sub.getDetail(resource, fields);
                if (val && val !== "") {
                  count++;
                }
              }
              return { ...section, count };
            })
            .filter((x) => x.count > 0)
            .map((section) => {
              return (
                <Fragment key={`top-${section.slug}`}>
                  <div className={styles.sectionsHeader}>
                    <h2>{section.name}</h2>
                  </div>
                  {section.sections
                    .map((subSection) => {
                      return {
                        ...subSection,
                        detail: subSection.getDetail(resource, fields),
                      };
                    })
                    .filter((subSection) => {
                      return subSection.detail && subSection.detail !== "";
                    })
                    .map((subSection) => {
                      const currentValue = subSection.detail;

                      if (!currentValue || currentValue == "") return null;

                      return (
                        <div className={styles.row} key={subSection.name}>
                          <div className={styles.category}>
                            <p>{subSection.name}</p>
                            {subSection.tooltip && (
                              <Tooltip
                                placement="right"
                                label={subSection.tooltip}
                                closeDelay={500}
                              >
                                <SvgIcon>
                                  <HelpIcon />
                                </SvgIcon>
                              </Tooltip>
                            )}
                          </div>
                          <div className={styles.value}>
                            <p>{currentValue}</p>
                            {subSection.getDetailTooltip && (
                              <Tooltip
                                placement="right"
                                label={subSection.getDetailTooltip(resource)}
                                closeDelay={500}
                              >
                                <SvgIcon>
                                  <HelpIcon />
                                </SvgIcon>
                              </Tooltip>
                            )}
                          </div>
                        </div>
                      );
                    })
                    .reduce((prev, curr) => [
                      prev,
                      <hr className={styles.rule} key="silence" />,
                      curr,
                    ])}
                </Fragment>
              );
            })}
        </div>
        <LanguageLibraryRelevantResources resource={resource} />
      </div>
      <GenericFaqs faqs={LANGUAGE_LIBRARY_FAQS} />
    </>
  );
};
