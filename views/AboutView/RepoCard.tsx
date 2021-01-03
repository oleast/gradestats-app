import { GithubRepo } from 'common/api/github/repo';
import React, { FC } from 'react';
import cx from 'classnames';

import styles from './repo-card.module.scss';
import { Heading } from 'components/Typography/Heading';
import { Text } from 'components/Typography/Text';
import { formatDateString } from 'common/utils/date';
import { OutlinedCard } from 'components/Card/OutlinedCard';

interface Props {
  className?: string;
  repo: GithubRepo;
}

export const RepoCard: FC<Props> = ({ className, repo }) => {
  return (
    <OutlinedCard
      as="a"
      className={cx(styles.card, className)}
      href={repo.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <Heading as="p" size="h5">
        {repo.name}
      </Heading>
      {repo.description ? <Text>{repo.description}</Text> : null}
      <Text>Språk: {repo.language}</Text>
      <Text>Oppdatert: {formatDateString(repo.updatedAt)}</Text>
    </OutlinedCard>
  );
};