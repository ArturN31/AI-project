import React from 'react';

const SentimentOutput = ({sentimentAnalysis, text}) => {
    return (
        <div className='m-4 text-center'>
            {
                sentimentAnalysis.length <= 0
                ?   <>
                        {text.text.length <= 0
                            ? ""
                            : "Loading analysis..."
                        }
                    </>
                :   <>
                        <h5>Sentiment analysis:</h5>
                        {sentimentAnalysis.emotion_prediction && sentimentAnalysis.emotion_scores.Anger
                            ?   <>
                                    <p>Emotion prediction: <span> {sentimentAnalysis.emotion_prediction}</span></p>
                                    <p>Anger: <span> {sentimentAnalysis.emotion_scores.Anger}</span></p>
                                    <p>Fear: <span> {sentimentAnalysis.emotion_scores.Fear}</span></p>
                                    <p>Joy: <span> {sentimentAnalysis.emotion_scores.Joy}</span></p>
                                    <p>Neutral: <span> {sentimentAnalysis.emotion_scores.Neutral}</span></p>
                                    <p>Sadness: <span> {sentimentAnalysis.emotion_scores.Sadness}</span></p>
                                    <p>Negative:  <span> {sentimentAnalysis.sentiment_scores.Negative}</span></p>
                                    <p>Positive: <span> {sentimentAnalysis.sentiment_scores.Positive}</span></p>
                                </>
                            :   <>
                                    <p>Emotion prediction: <span> {sentimentAnalysis.emotion_prediction}</span> - cannot be processed</p>
                                    <p>Negative:  <span> {sentimentAnalysis.sentiment_scores.Negative}</span></p>
                                    <p>Positive: <span> {sentimentAnalysis.sentiment_scores.Positive}</span></p>
                                </>
                        }
                    </>
            }
        </div>
    )
}

export default SentimentOutput;