import HelpIcon from "@material-ui/icons/Help";
import { BackToLink } from "../back-to-link/back-to-link";
import { Button } from "../button/button";
import { Image } from "../image";
import styles from "./language-library-resource-page.module.css";
import { SvgIcon } from "@material-ui/core";
import { Tooltip } from "@chakra-ui/react";
import { DETAILS_CONFIG } from "../language-library-details/language-library-details";

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

export const LanguageLibraryResourcePage = ({ resource }) => {
  const backgroundClass =
    listOfBackgrounds[
      resource.databaseId == 0
        ? 0
        : resource.databaseId % listOfBackgrounds.length
    ];
  return (
    <div className={styles.container}>
      <BackToLink
        className={styles.backTo}
        href="/language-library/all"
        where="language library"
      />
      <div className={styles.topContainer}>
        <div className={`${styles.imageContainer} ${backgroundClass}`}>
          <Image
            src={resource.featuredImage.node.mediaItemUrl}
            height={200}
            width={400}
          />
        </div>
        <div>
          <h1>{resource.title}</h1>
          <p>{resource.description}</p>
          {resource.resourceFiles.nodes.length === 1 && (
            <div className={styles.downloadButton}>
              <Button href={resource.resourceFiles.nodes[0].mediaItemUrl}>
                Download Resource
              </Button>
            </div>
          )}
          {resource.resourceUrl && (
            <div className={styles.downloadButton}>
              <Button href={resource.resourceUrl}>Visit Resource</Button>
            </div>
          )}
        </div>
      </div>
      <div className={styles.details}>
        {DETAILS_CONFIG.sections.map((section) => {
          return (
            <>
              <div className={styles.sectionsHeader}>
                <h2>{section.name}</h2>
              </div>
              {section.sections.map((subSection) => {
                const currentValue = subSection.getDetail(resource);

                if (!currentValue || currentValue == "") return null;

                return (
                  <div className={styles.row} key={subSection.name}>
                    <div className={styles.category}>
                      <p>{subSection.name}</p>
                      <Tooltip
                        placement="right"
                        label={subSection.tooltip}
                        closeDelay={500}
                      >
                        <SvgIcon>
                          <HelpIcon />
                        </SvgIcon>
                      </Tooltip>
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
              })}
            </>
          );
        })}
      </div>
    </div>
  );
};
