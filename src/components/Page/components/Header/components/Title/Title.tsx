import * as React from 'react';
import {classNames} from '@shopify/css-utilities';
import {Props as AvatarProps} from '../../../../../Avatar';
import {Props as ThumbnailProps} from '../../../../../Thumbnail';
import DisplayText from '../../../../../DisplayText';

import styles from './Title.scss';

export interface Props {
  /** Page title, in large type */
  title: string;
  /** Page subtitle, in regular type*/
  subtitle?: string;
  /** Important and non-interactive status information shown immediately after the title. (stand-alone app use only) */
  titleMetadata?: React.ReactNode;
  /** thumbnail that precedes the title */
  thumbnail?:
    | React.ReactElement<AvatarProps | ThumbnailProps>
    | React.SFC<React.SVGProps<SVGSVGElement>>;
}

export default function Title({
  title,
  subtitle,
  titleMetadata,
  thumbnail,
}: Props) {
  const titleMarkup = (
    <div className={styles.Title}>
      <DisplayText size="large" element="h1">
        {title}
      </DisplayText>
    </div>
  );

  const titleMetadataMarkup = titleMetadata ? (
    <div className={styles.TitleMetadata}>{titleMetadata}</div>
  ) : null;

  const wrappedTitleMarkup = titleMetadata ? (
    <div className={styles.TitleWithMetadataWrapper}>
      {titleMarkup}
      {titleMetadataMarkup}
    </div>
  ) : (
    titleMarkup
  );

  const subtitleMarkup = subtitle ? (
    <div className={styles.SubTitle}>
      <p>{subtitle}</p>
    </div>
  ) : null;

  const thumbnailMarkup = thumbnail ? <div>{thumbnail}</div> : null;

  const pageTitleClassName = thumbnail
    ? classNames(styles.hasThumbnail)
    : undefined;

  return (
    <div className={pageTitleClassName}>
      {thumbnailMarkup}
      <div className={styles.TitleAndSubtitleWrapper}>
        {wrappedTitleMarkup}
        {subtitleMarkup}
      </div>
    </div>
  );
}
