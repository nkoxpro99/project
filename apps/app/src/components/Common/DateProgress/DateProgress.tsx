import { violet } from '@radix-ui/colors';
import moment from 'moment';
import { useEffect, useState } from 'react';
import format from 'string-template';
import styled from 'styled-components';

export type DateProgressProps = {
  startDate?: string;
  endDate?: string;
  daysLeftTemplate?: string;
};

export const DateProgress = ({ startDate, endDate, daysLeftTemplate = 'Còn {0}' }: DateProgressProps) => {
  const now = moment().startOf('days');
  const startMoment = moment(startDate);
  const endMoment = moment(endDate);

  const calculateProgress = () => {
    let daysMax = 0;
    let daysPassed = 0;
    if (startMoment.isValid() && endMoment.isValid()) {
      daysMax = endMoment.diff(startMoment, 'days');
      daysPassed = now.diff(startMoment, 'days');
    }

    return { daysMax, daysPassed };
  };

  const { daysMax, daysPassed } = calculateProgress();

  const [timeLeft, setTimeLeft] = useState<string>();

  useEffect(() => {
    const updateTimer = () => {
      const now = moment();
      const duration = moment.duration(endMoment.diff(now));

      if (duration.asDays() > 0) {
        setTimeLeft(`${Math.floor(duration.asDays())} ngày`);
      } else if (duration.asMilliseconds() >= 0) {
        setTimeLeft(`${Math.floor(duration.asHours())} giờ`);
      } else {
        setTimeLeft(undefined);
      }
    };

    updateTimer(); // Initial update
    const intervalId = setInterval(updateTimer, 3600000); // Update every hour

    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);

  const daysLeftDisplay = timeLeft ? format(daysLeftTemplate, [timeLeft]) : 'Hết hạn.';

  return (
    <DateProgressRoot>
      <Progress max={daysMax} value={daysPassed} />
      <CardDaysLeft>{daysLeftDisplay}</CardDaysLeft>
    </DateProgressRoot>
  );
};

const DateProgressRoot = styled.div``;

const CardDaysLeft = styled.span`
  color: #999;
  font-size: 12px;
`;

const Progress = styled.progress`
  width: 100%;
  accent-color: ${violet.violet9};
`;
