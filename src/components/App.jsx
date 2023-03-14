import React, { useState } from 'react';
import FeedbackOptions from './FeedbackOptions/FeedbackOptions';
import { GlobalStyle } from './GlobalStyle';
import Notification from './Notification/Notification';
import Section from './Section/Section';
import Statistics from './Statistics/Statistics';

export function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function handleBtnClick(e) {
    const { name } = e.target;
    switch (name) {
      case 'good':
        setGood(prevState => prevState + 1);
        break;
      case 'neutral':
        setNeutral(prevState => prevState + 1);
        break;
      case 'bad':
        setBad(prevState => prevState + 1);
        break;
      default: throw Error("unknown name");
    }
  }

  function countTotalFeedback() {
    return good + bad + neutral;
  }

  function countPositiveFeedbackPercentage(total) {
    if (good === 0) {
      return 0;
    }
    return parseInt(good / total * 100);
  }

  const options = ['good', 'neutral', 'bad'];
  const total = countTotalFeedback();
  const hasFeedback = total !== 0;
  const positivePercentage = countPositiveFeedbackPercentage(total);
  const statistics = <Statistics good={good} neutral={neutral} bad={bad} total={total} positivePercentage={positivePercentage} />;
  
  return (
      <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleBtnClick} />
        </Section>
        <Section title="Statistics">
          {hasFeedback ? (statistics) : (<Notification message="There is no feedback" />)}
      </Section>
      <GlobalStyle />
      </>
    )
}